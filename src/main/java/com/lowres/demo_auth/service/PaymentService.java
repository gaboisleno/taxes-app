package com.lowres.demo_auth.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.lowres.demo_auth.model.Payment;
import com.lowres.demo_auth.repository.PaymentRepository;
import com.lowres.demo_auth.service.dto.PaymentDTO;
import com.lowres.demo_auth.service.mapper.PaymentMapper;

@Service
public class PaymentService {
    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<PaymentDTO> findAll() {
        return paymentMapper.toDto(paymentRepository.findAllByOrderByCreatedAt());
    }

    public List<PaymentDTO> findTest(LocalDate from, LocalDate to) {
        Query query = new Query();

        if (from != null && !from.toString().equals("null") && to != null) {
            query.addCriteria(Criteria.where("createdAt").gte(from).lte(to));
        } else if (from != null) {
            query.addCriteria(Criteria.where("createdAt").gte(from));
        } else if (to != null) {
            query.addCriteria(Criteria.where("createdAt").gte(to));
        }

        query.with(Sort.by(Sort.Direction.ASC, "createdAt"));
        return paymentMapper.toDto(mongoTemplate.find(query, Payment.class));
    }

    public Payment save(Payment entity) {
        return paymentRepository.save(entity);
    }

    public Optional<Payment> findById(String id) {
        return paymentRepository.findById(id);
    }

    public List<PaymentDTO> findByCreatedAtBetween(LocalDate from, LocalDate to) {
        return paymentMapper.toDto(paymentRepository.findByCreatedAtBetween(from, to));
    }
}
