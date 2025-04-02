package com.service.model;
import java .util.UUID;


import jakarta.persistence.*;

@Entity
@Table(name = "images")
public class Image extends BaseModel<Image> {
  private UUID item_id;
  private String url;

  public Image() {
  }
  public Image(UUID item_id, String url) {
    this.item_id = item_id;
    this.url = url;
  }
  public UUID getItemId() {
    return item_id;
  }
  public String getUrl() {
    return url;
  }
  public Image setItemId(UUID item_id) {
    this.item_id = item_id;
    return this;
  }
  public Image setUrl(String url) {
    this.url = url;
    return this;
  }
}
