package com.hunny.hunny.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVerificationDTO {

    private Long orderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}
