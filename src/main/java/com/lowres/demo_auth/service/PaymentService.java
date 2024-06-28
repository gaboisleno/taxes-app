package com.lowres.demo_auth.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<PaymentDTO> findAll() {
        return paymentMapper.toDto(paymentRepository.findAllByOrderByCreatedAt());
    }

    /*
     * TODO
     * public Page<PaymentDTO> findAllByPage(Pageable pageable) {
     * return paymentMapper.toDto(paymentRepository.findAll(pageable));
     * }
     */

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
