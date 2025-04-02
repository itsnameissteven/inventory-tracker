package com.service.model;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseModel<T extends BaseModel<T>> {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private UUID id;
  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime created_at;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updated_at;

  public UUID getId() {
    return id;
  }
  public LocalDateTime getCreatedAt() {
    return created_at;
  }
  public LocalDateTime getUpdatedAt() {
    return updated_at;
  }

  @SuppressWarnings("unchecked")
  public T setId(UUID id) {
      this.id = id;
      return (T) this;
  }

  @SuppressWarnings("unchecked")
  public T setUpdatedAt() {
      this.updated_at = LocalDateTime.now();
      return (T) this;
  }
}
