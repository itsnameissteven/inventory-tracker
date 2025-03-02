package com.service.model;
import java.sql.Date;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private UUID id;
  private Date created_at;
  private Date updated_at;

  public UUID getId() {
    return id;
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

  public void setUpdatedAt() {
    this.updated_at = new Date(System.currentTimeMillis());
  }
}
