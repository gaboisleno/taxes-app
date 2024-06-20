package com.lowres.demo_auth.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.lowres.demo_auth.model.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    @Query("{id:'?0'}")
    Optional<Payment> findById(String id);
}
