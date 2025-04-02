package com.service.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "attributes")
public class Attribute extends BaseModel<Attribute> {
  private String name;

  public Attribute() {
  }
  public String getName() {
    return name;
  }
  public Attribute(String name) {
    this.name = name;
  }
  public Attribute setName(String name) {
    this.name = name;
    return this;
  }
}
