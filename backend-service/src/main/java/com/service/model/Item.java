package com.service.model;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class Item extends BaseModel {
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
  @OneToMany(mappedBy = "item_id")
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

  public Item(String name) {
    this.name = name;
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
  public void setName(String name) {
    this.name = name;
  }
  public void setDescription(String description) {
    this.description = description;
  }
  public void setCategories(List<Category> categories) {
    this.categories = categories;
  }
}