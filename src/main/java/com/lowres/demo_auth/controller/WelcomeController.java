package com.lowres.demo_auth.controller;

import org.bson.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@RestController
@RequestMapping()
public class WelcomeController {

    @GetMapping("/public")
    public ResponseEntity<?> helloMongodb() {
        try (MongoClient mongoClient = MongoClients.create(
                "mongodb+srv://impuestosapp:impuestosapp@clustertest.x7eywq3.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest")) {
            MongoDatabase database = mongoClient.getDatabase("testdb");
            MongoCollection<Document> collection = database.getCollection("test_collection");
            return ResponseEntity.ok().body(collection.find().first());
        }
    }

    @GetMapping("/private")
    public String welcome() {
        return "Welcome from secure endpoint";
    }
}
