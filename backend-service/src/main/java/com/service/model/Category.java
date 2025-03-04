package com.service.model;
import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category  extends BaseModel {
  private String name;

  public Category() {
  }
  public Category(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
}
