package com.hunny.hunny.service;

import java.util.List;


import com.hunny.hunny.dto.OrderDTO;
import com.hunny.hunny.dto.PaymentVerificationDTO;



public interface OrderService {

    List<OrderDTO> getAllOrders();

    List<OrderDTO> getOrdersByUser(Long userId);

    void verifyPayment(PaymentVerificationDTO dto);
    
    OrderDTO placeOrder(OrderDTO dto);
}
