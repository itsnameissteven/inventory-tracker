package com.service.model;

import java.util.UUID;

public class ItemSkuRelation {
    private Double price;
    private Integer stock;
    private UUID item_id;
    private UUID variation_id;
    private UUID attribute_id;

    public ItemSkuRelation() {
    }

    public ItemSkuRelation(Double price, Integer stock, UUID item_id, UUID variation_id, UUID attribute_id) {
        this.price = price;
        this.stock = stock;
        this.item_id = item_id;
        this.variation_id = variation_id;
        this.attribute_id = attribute_id;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    public UUID getItemId() {
        return item_id;
    }

    public UUID getVariationId() {
        return variation_id;
    }

    public UUID getAttributeId() {
        return attribute_id;
    }

    public ItemSkuRelation setPrice(Double price) {
        this.price = price;
        return this;
    }

    public ItemSkuRelation setStock(Integer stock) {
        this.stock = stock;
        return this;
    }

    public ItemSkuRelation setItemId(UUID item_id) {
        this.item_id = item_id;
        return this;
    }

    public ItemSkuRelation setVariationId(UUID variation_id) {
        this.variation_id = variation_id;
        return this;
    }

    public ItemSkuRelation setAttributeId(UUID attribute_id) {
        this.attribute_id = attribute_id;
        return this;
    }
  
}
