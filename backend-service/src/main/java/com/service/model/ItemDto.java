package com.service.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class ItemDto extends BaseModel<ItemDto>{
  private String name;
  @Column(name = "description", nullable = true)
  private String description;

  public ItemDto() {
  }
  public ItemDto(String name, String description) {
    this.name = name;
    this.description = description;
  }
  public String getName() {
    return name;
  }
  public String getDescription() {
    return description;
  }
  public ItemDto setName(String name) {
    this.name = name;
    return this;
  }
  public ItemDto setDescription(String description) {
    this.description= description;
    return this;
  }
  
}
