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
    public String getDescription() {
        return description;
    }
    public List<UUID> getCategoryIds() {
        return categoryIds;
    }
    public ItemRelation setName(String name) {
        this.name = name;
        return this;
    }
    public ItemRelation setDescription(String description) {
        this.description = description;
        return this;
    }
    public ItemRelation setCategoryIds(List<UUID> categoryIds) {
        this.categoryIds = categoryIds;
        return this;
    }
}