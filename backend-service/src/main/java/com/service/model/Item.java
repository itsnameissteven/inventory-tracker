package com.service.model;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class Item extends BaseModel<Item> {
  private String name;
  private String description;
  @OneToMany(mappedBy = "item_id")
  private List<Image> images;
  @ManyToMany
    @JoinTable(
        name = "item_categories",
        joinColumns = @JoinColumn(name = "item_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
  private List<Category> categories;  
  @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private List<ItemSku> skus; 
  @ManyToMany
    @JoinTable(
        name = "item_skus",
        joinColumns = @JoinColumn(name = "item_id"),
        inverseJoinColumns = @JoinColumn(name = "variation_id")
    )
  private List<Variation> variations;
  @ManyToMany
    @JoinTable(
        name = "item_skus",
        joinColumns = @JoinColumn(name = "item_id"),
        inverseJoinColumns = @JoinColumn(name = "attribute_id")
    )
  private List<Attribute> attributes;

  public Item() {
  }

  public Item(String name, String description) {
    this.name = name;
    this.description = description;
  }
  public String getName() {
    return name;
  }
  public String getDescription() {
    return description;
  }
  public List<Image> getImages() {
    return images;
  }
  public List<Category> getCategories() {
    return categories;
  }
  public List<ItemSku> getSkus() {
    return skus;
  }
  public List<Variation> getVariations() {
    return variations;
  }
  public List<Attribute> getAttributes() {
    return attributes;
  }
  public Item setName(String name) {
    this.name = name;
    return this;
  }
  public Item setDescription(String description) {
    this.description = description;
    return this;
  }
  public Item setCategories(List<Category> categories) {
    this.categories = categories;
    return this;
  }
}