package com.lowres.demo_auth.model;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document(collection = "payment")
public class Payment {

    private String id;
    private String total;
    private byte[] file;
    private String fileType;
    private LocalDate createdAt;
    private LocalDate deletedAt;
    private String description;

    @DocumentReference(lazy = true)
    private Supply supply;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTotal() {
        return this.total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public byte[] getFile() {
        return this.file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileType() {
        return this.fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getDeletedAt() {
        return this.deletedAt;
    }

    public void setDeletedAt(LocalDate deletedAt) {
        this.deletedAt = deletedAt;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Supply getSupply() {
        return this.supply;
    }

    public void setSupply(Supply supply) {
        this.supply = supply;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id='" + getId() + "\'" +
                ", total='" + getTotal() + "\'" +
                ", file='" + getFile() + "\'" +
                ", fileType='" + getFileType() + "\'" +
                ", createdAt='" + getCreatedAt() + "\'" +
                ", deletedAt='" + getDeletedAt() + "\'" +
                ", description='" + getDescription() + "\'" +
                ", supply='" + getSupply() + "\'" +
                "}";
    }
}
