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
import org.springframework.web.bind.annotation.RestController;

import com.lowres.demo_auth.model.Supply;
import com.lowres.demo_auth.service.SupplyService;

@RestController
@RequestMapping("/public/supply")
public class SupplyController {
    @Autowired
    private SupplyService supplyService;

    @GetMapping()
    public ResponseEntity<List<Supply>> findAll() {
        return ResponseEntity.ok().body(supplyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        Optional<Supply> result = supplyService.findById(id);

        if (result.isPresent()) {
            return ResponseEntity.ok().body(result.get());
        } else {
            return ResponseEntity.badRequest().body("Entity not exists");
        }
    }

    @PostMapping()
    public ResponseEntity<Supply> create(@RequestBody Supply entity) {
        return ResponseEntity.ok().body(supplyService.save(entity));
    }

}
