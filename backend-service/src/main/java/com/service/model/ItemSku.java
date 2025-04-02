package com.service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "item_skus")
public class ItemSku extends BaseModel<ItemSku> {
  private Double price;
  private Integer stock;
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "item_id", nullable = false)
  private ItemDto item;

  @ManyToOne(fetch = FetchType.EAGER) 
  @JoinColumn(name = "variation_id", nullable = true)
  private Variation variation;
 
  @ManyToOne(fetch = FetchType.EAGER) 
  @JoinColumn(name = "attribute_id", nullable = true)
  private Attribute attribute;

  public ItemSku() {
  }
  public ItemSku(Double price, Integer stock, ItemDto item, Variation variation, Attribute attribute) {
    this.price = price;
    this.stock = stock;
    this.item = item;
    this.variation = variation;
    this.attribute = attribute;
  }
  public Double getPrice() {
    return price;
  }
  public Integer getStock() {
    return stock;
  }
  public ItemDto getItem() {
    return item;
  }
  public Variation getVariation() {
    return variation;
  }
  public Attribute getAttribute() {
    return attribute;
  }
  
  public ItemSku setPrice(Double price) {
    this.price = price;
    return this;
  }
  public ItemSku setStock(Integer stock) {
    this.stock = stock;
    return this;
  }
  public ItemSku setItem(ItemDto item) {
    this.item = item;
    return this;
  }
  public ItemSku setVariation(Variation variation) {
    this.variation = variation;
    return this;
  }
  public ItemSku setAttribute(Attribute attribute) {
    this.attribute = attribute;
    return this;
  }
}
