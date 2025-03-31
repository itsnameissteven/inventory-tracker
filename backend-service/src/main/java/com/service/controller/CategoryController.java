package com.service.controller;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Category;
import com.service.repository.CategoryRepository;


@RestController
@RequestMapping("/categories")
public class CategoryController  extends BaseController<Category, CategoryRepository> {
  private final CategoryRepository categoryRepository;

  public CategoryController(CategoryRepository categoryRepository) {
      this.categoryRepository = categoryRepository;
  }
  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody Category category) {
    try {
      Category existingCategory = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
      existingCategory.setName(category.getName());
      categoryRepository.save(existingCategory);
      return ResponseEntity.status(HttpStatus.OK).body(existingCategory);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("{\"error\": e.getRootCause().getMessage()}");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("{\"error\": \"An unexpected error occurred.\"}");
    }
  }
}
