package com.hunny.hunny.dto;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {

    private Long productId;
    private String productName;
    private int quantity;
    private double price;
}
