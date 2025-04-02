package com.service.model;
import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category  extends BaseModel<Category> {
  private String name;

  public Category() {
  }
  public String getName() {
    return name;
  }
  public Category(String name) {
    this.name = name;
  }
  public Category setName(String name) {
    this.name = name;
    return this;
  }
}
