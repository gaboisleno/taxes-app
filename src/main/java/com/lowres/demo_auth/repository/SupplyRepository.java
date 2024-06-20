package com.lowres.demo_auth.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.lowres.demo_auth.model.Supply;

public interface SupplyRepository extends MongoRepository<Supply, String> {
    @Query("{id:'?0'}")
    Optional<Supply> findById(String id);
}