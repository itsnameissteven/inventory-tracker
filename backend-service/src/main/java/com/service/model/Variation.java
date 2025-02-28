package com.service.model;
import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "variations")
public class Variation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private UUID id;
  private String name;
  @Column(name = "display_name", nullable = true)
  private String display_name;
  private Date created_at;
  private Date updated_at;  

  public Variation() {
  }
  public Variation(String name, String display_name) {
    this.name = name;
    this.display_name = display_name;
  }
  public UUID getId() {
    return id;
  }
  public String getName() {
    return name;
  }
  public String getDisplayName() {
    return display_name;
  }
  public Date getCreatedAt() {
    return created_at;
  }
  public Date getUpdatedAt() {
    return updated_at;
  }
  public void setId(UUID id) {
    this.id = id;
  }
  public void setName(String name) {
    this.name = name;
  }
  public void setDisplayName(String display_name) {
    this.display_name = display_name;
  }
}
