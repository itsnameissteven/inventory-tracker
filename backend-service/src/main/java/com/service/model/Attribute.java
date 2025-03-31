package com.service.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "attributes")
public class Attribute extends BaseModel {
  private String name;

  public Attribute() {
  }
  public Attribute(String name) {
    this.name = name;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
}
