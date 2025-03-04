package com.service.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "item_skus")
public class ItemSku extends BaseModel{
  private Double price;
  private Number stock;
  private UUID item_id;
  private UUID variation_id;
  private UUID attribute_id;

  public ItemSku() {
  }
  public ItemSku(Double price, Number stock, UUID item_id, UUID variation_id, UUID attribute_id) {
    this.price = price;
    this.stock = stock;
    this.item_id = item_id;
    this.variation_id = variation_id;
    this.attribute_id = attribute_id;
  }
  public Double getPrice() {
    return price;
  }
  public Number getStock() {
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
  public void setPrice(Double price) {
    this.price = price;
  }
  public void setStock(Number stock) {
    this.stock = stock;
  }
  public void setItemId(UUID item_id) {
    this.item_id = item_id;
  }
  public void setVariationId(UUID variation_id) {
    this.variation_id = variation_id;
  }
  public void setAttributeId(UUID attribute_id) {
    this.attribute_id = attribute_id;
  }
}
