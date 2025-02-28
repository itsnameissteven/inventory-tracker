package com.service.model;
import java.sql.Date;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class Item {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private UUID id;
  private String name;
  private Date created_at;
  private Date updated_at;
  @OneToMany(mappedBy = "item_id")
  private List<Image> images;
  @ManyToMany
    @JoinTable(
        name = "item_categories",
        joinColumns = @JoinColumn(name = "item_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
  private List<Category> categories;  
  @ManyToMany
    @JoinTable(
        name = "item_variations",
        joinColumns = @JoinColumn(name = "item_id"),
        inverseJoinColumns = @JoinColumn(name = "variation_id")
    )
  private List<Variation> variations;

  public Item() {
  }

  public Item(String name) {
    this.name = name;
  }

  public UUID getId() {
    return id;
  }
  public String getName() {
    return name;
  }
  public Date getCreatedAt() {
    return created_at;
  }
  public Date getUpdatedAt() {
    return updated_at;
  }
  public List<Image> getImages() {
    return images;
  }
  public List<Category> getCategories() {
    return categories;
  }
  public List<Variation> getVariations() {
    return variations;
  }
  public void setId(UUID id) {
    this.id = id;
  }
  public void setName(String name) {
    this.name = name;
  }
}
