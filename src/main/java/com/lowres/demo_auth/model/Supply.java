package com.lowres.demo_auth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "supply")
public class Supply {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    // @Column(name = "name")
    private String name;

    // @Column(name = "description")
    private String description;

    private String url;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Supply{" +
                "id='" + getId() + "\'" +
                ", name='" + getName() + "\'" +
                ", description='" + getDescription() + "\'" +
                ", url='" + getUrl() + "\'" +
                "}";
    }
}
