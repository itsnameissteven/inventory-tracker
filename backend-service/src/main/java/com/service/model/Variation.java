package com.service.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "variations")
public class Variation extends BaseModel<Variation> {
  private String name;
  @Column(name = "display_name", nullable = true)
  private String display_name;

  public Variation() {
  }
  public Variation(String name, String display_name) {
    this.name = name;
    this.display_name = display_name;
  }
  public String getName() {
    return name;
  }
  public String getDisplayName() {
    return display_name;
  }
  public Variation setName(String name) {
    this.name = name;
    return this;
  }
  public Variation setDisplayName(String display_name) {
    this.display_name = display_name;
    return this;
  }
}
