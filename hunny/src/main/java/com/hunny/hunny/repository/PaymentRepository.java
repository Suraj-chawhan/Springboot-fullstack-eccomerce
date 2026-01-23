package com.hunny.hunny.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hunny.hunny.Entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
