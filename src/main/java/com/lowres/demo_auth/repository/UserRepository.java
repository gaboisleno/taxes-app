package com.lowres.demo_auth.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.lowres.demo_auth.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{username:'?0'}")
    Optional<User> findByUsername(String username);
}
