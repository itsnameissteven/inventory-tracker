package com.service.model;
import java.sql.Date;
import java .util.UUID;


import jakarta.persistence.*;

@Entity
@Table(name = "images")
public class Image {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private UUID id;
  private UUID item_id;
  private String url;
  private Date created_at;
  private Date updated_at;

  public Image() {
  }

  public Image(UUID item_id, String url) {
    this.item_id = item_id;
    this.url = url;
  }
  
  public UUID getId() {
    return id;
  }
  public UUID getItemId() {
    return item_id;
  }
  public String getUrl() {
    return url;
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
  public void setItemId(UUID item_id) {
    this.item_id = item_id;
  }
  public void setUrl(String url) {
    this.url = url;
  }

}
