package com.service.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "item_skus")
public class ItemSku extends BaseModel{
  private Double price;
  private Integer stock;
  private UUID item_id;

  @ManyToOne(fetch = FetchType.EAGER) 
  @JoinColumn(name = "variation_id", nullable = false)
  private Variation variation;
 
  @ManyToOne(fetch = FetchType.EAGER) 
  @JoinColumn(name = "attribute_id", nullable = false)
  private Attribute attribute;

  public ItemSku() {
  }
  public ItemSku(Double price, Integer stock, UUID item_id, Variation variation, Attribute attribute) {
    this.price = price;
    this.stock = stock;
    this.item_id = item_id;
    this.variation = variation;
    this.attribute = attribute;
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
  public Variation getVariation() {
    return variation;
  }
  public Attribute getAttribute() {
    return attribute;
  }
  
  public void setPrice(Double price) {
    this.price = price;
  }
  public void setStock(Integer stock) {
    this.stock = stock;
  }
  public void setItemId(UUID item_id) {
    this.item_id = item_id;
  }
  public void setVariation(Variation variation) {
    this.variation = variation;
  }
  public void setAttribute(Attribute attribute) {
    this.attribute = attribute;
  }
}
