package com.lowres.demo_auth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lowres.demo_auth.model.Supply;
import com.lowres.demo_auth.repository.SupplyRepository;

@Service
public class SupplyService {
    @Autowired
    private SupplyRepository supplyRepository;

    public List<Supply> findAll() {
        return supplyRepository.findAll();
    }

    public Supply save(Supply entity) {
        return supplyRepository.save(entity);
    }

    public Optional<Supply> findById(String id) {
        return supplyRepository.findById(id);
    }
}
