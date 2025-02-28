package com.service.model;
import java.sql.Date;
import java.util.UUID;
import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private UUID id;
  private String name;
  private Date created_at;
  private Date updated_at;

  public Category() {
  }
  public Category(String name) {
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
  public void setId(UUID id) {
    this.id = id;
  }
  public void setName(String name) {
    this.name = name;
  }
}
