package com.hunny.hunny.dto;

import java.util.Date;
import java.util.List;

import com.hunny.hunny.Entity.User;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

    private Long id;
    private Date orderDate;
    private double totalAmount;
    private Long userId;
    private List<OrderItemDTO> items;
    private String paymentStatus;
    private String razorpayOrderId;
}
