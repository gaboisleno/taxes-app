package com.lowres.demo_auth.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.lowres.demo_auth.model.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    @Query("{id:'?0'}")
    Optional<Payment> findById(String id);

    @Query(value = "{'createdAt': { $gte: ?0, $lte: ?1 }}", sort = "{'createdAt': 1}")
    List<Payment> findByCreatedAtBetween(LocalDate from, LocalDate to);

    List<Payment> findAllByOrderByCreatedAt();

}
