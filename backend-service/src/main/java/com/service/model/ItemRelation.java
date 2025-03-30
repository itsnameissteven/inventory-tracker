package com.service.model;

import java.util.List;
import java.util.UUID;

public class ItemRelation {
    private String name;
    private String description;
    private List<UUID> categoryIds;

    public ItemRelation() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<UUID> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<UUID> categoryIds) {
        this.categoryIds = categoryIds;
    }
}