package com.lowres.demo_auth.service.dto;

import java.io.Serializable;
import java.time.LocalDate;

public class PaymentDTO implements Serializable {
    private String id;
    private String total;
    private LocalDate createdAt;
    private String description;
    private SupplyDTO supply;

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

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SupplyDTO getSupply() {
        return this.supply;
    }

    public void setSupply(SupplyDTO supply) {
        this.supply = supply;
    }

    @Override
    public String toString() {
        return "PaymentDTO{" +
                "id=" + getId() +
                ", total='" + getTotal() + "'" +
                ", description='" + getDescription() + "'" +
                ", supply='" + getSupply() + "'" +
                "}";
    }
}
