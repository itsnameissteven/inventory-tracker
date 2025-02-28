package com.service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.service.model.Category;

@Repository
public interface CategoriesRepository extends JpaRepository<Category, UUID> {
}