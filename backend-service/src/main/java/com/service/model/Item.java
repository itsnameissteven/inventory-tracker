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
  @OneToMany(mappedBy = "item_id")
  private List<Image> images;
  @ManyToMany
    @JoinTable(
        name = "item_categories",
        joinColumns = @JoinColumn(name = "item_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
  private List<Category> categories;  
  // @ManyToMany
  //   @JoinTable(
  //       name = "item_variations",
  //       joinColumns = @JoinColumn(name = "item_id"),
  //       inverseJoinColumns = @JoinColumn(name = "variation_id")
  //   )
  // private List<Variation> variations;

  public Item() {
  }

  public Item(String name) {
    this.name = name;
  }
  public String getName() {
    return name;
  }
  public List<Image> getImages() {
    return images;
  }
  public List<Category> getCategories() {
    return categories;
  }
  // public List<Variation> getVariations() {
  //   return variations;
  // }
  public void setName(String name) {
    this.name = name;
  }
}
