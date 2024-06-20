package com.lowres.demo_auth.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lowres.demo_auth.model.Payment;
import com.lowres.demo_auth.service.PaymentService;
import com.lowres.demo_auth.service.dto.PaymentDTO;

@RestController
@RequestMapping("/public/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping()
    public ResponseEntity<List<PaymentDTO>> findAll() {
        List<PaymentDTO> list = paymentService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Optional<Payment> item = paymentService.findById(id);
        if (item.isPresent()) {
            return ResponseEntity.ok().body(item.get());
        } else {
            return ResponseEntity.badRequest().body("Item not exist");
        }
    }

    @GetMapping("/query")
    public ResponseEntity<?> getMethodName(@RequestParam String date) {
        List<PaymentDTO> payments = paymentService.findAll();
        long total = 0;
        // Sum total
        for (PaymentDTO payment : payments) {
            total += Long.parseLong(payment.getTotal());
        }
        return ResponseEntity.ok().body(total);
    }

    @PostMapping()
    public ResponseEntity<Payment> create(@RequestBody Payment entity) {
        return ResponseEntity.ok().body(paymentService.save(entity));
    }
}
