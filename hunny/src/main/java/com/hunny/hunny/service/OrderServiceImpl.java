package com.hunny.hunny.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hunny.hunny.Entity.Order;
import com.hunny.hunny.Entity.OrderItem;
import com.hunny.hunny.Entity.Product;
import com.hunny.hunny.Entity.User;
import com.hunny.hunny.dto.OrderDTO;
import com.hunny.hunny.dto.OrderItemDTO;
import com.hunny.hunny.dto.PaymentVerificationDTO;
import com.hunny.hunny.repository.OrderRepository;
import com.hunny.hunny.repository.ProductRepository;
import com.hunny.hunny.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {



    @Autowired
   private UserRepository userRepository;


     @Autowired
   private ProductRepository productRepository;


    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private RazorpayService razorpayService;


    @Override
    public List<OrderDTO> getAllOrders() {
        return mapOrders(orderRepo.findAll());
    }

@Override
public List<OrderDTO> getOrdersByUser(Long userId) {

    if (!userRepository.existsById(userId)) {
        throw new RuntimeException("User not found with id: " + userId);
    }

    return mapOrders(orderRepo.findByUser_Id(userId));
}


    private List<OrderDTO> mapOrders(List<com.hunny.hunny.Entity.Order> orders) {
        return orders.stream().map(order -> {

            List<OrderItemDTO> items = order.getItems().stream()
                    .map(i -> new OrderItemDTO(
                            i.getProduct().getId(),
                            i.getProduct().getName(),
                            i.getQuantity(),
                            i.getPrice()))
                    .toList();

            return new OrderDTO(
                    order.getId(),
                    order.getOrderDate(),
                    order.getTotalAmount(),
                    order.getUser().getId(),
                    
                    items,
                    order.getPaymentStatus(),
                    order.getRazorpayOrderId()

                );
        }).toList();
    }

    public OrderDTO placeOrder(OrderDTO dto) {

    User user = userRepository.findById(dto.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    Order order = new Order();
    order.setUser(user);
    order.setOrderDate(new Date(System.currentTimeMillis()));
    order.setOrderStatus("PLACED");
    order.setPaymentStatus("CREATED");

    double total = 0;

List<OrderItem> items = new ArrayList<>();

for (OrderItemDTO i : dto.getItems()) {

    Product product = productRepository.findById(i.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

    OrderItem item = new OrderItem();
    item.setOrder(order);
    item.setProduct(product);
    item.setQuantity(i.getQuantity());
    item.setPrice(product.getPrice());

    total += product.getPrice() * i.getQuantity();
    items.add(item);
}

order.setItems(items);
order.setTotalAmount(total);


    try {
        com.razorpay.Order rzOrder =
                razorpayService.createOrder(total);
        order.setRazorpayOrderId(rzOrder.get("id"));
    } catch (Exception e) {
        throw new RuntimeException("Razorpay order creation failed");
    }

    Order saved = orderRepo.save(order);

    return new OrderDTO(
            saved.getId(),
            saved.getOrderDate(),
            saved.getTotalAmount(),
            saved.getUser().getId(),
            dto.getItems(),
            saved.getPaymentStatus(),
            saved.getRazorpayOrderId()
    );
}


@Override
public void verifyPayment(PaymentVerificationDTO dto) {

    Order order = orderRepo.findById(dto.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found"));

    boolean isValid = razorpayService.verifySignature(
            order.getRazorpayOrderId(),
            dto.getRazorpayPaymentId(),
            dto.getRazorpaySignature()
    );

    if (isValid) {
        order.setPaymentStatus("PAID");
        order.setOrderStatus("CONFIRMED");
        order.setRazorpayPaymentId(dto.getRazorpayPaymentId());
        order.setRazorpaySignature(dto.getRazorpaySignature());
    } else {
        order.setPaymentStatus("FAILED");
    }

    orderRepo.save(order);
}




}
