package com.service.controller;
import java.util.List;
import com.service.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.service.repository.CategoryRepository;


@RestController
@RequestMapping("/categories")
public class CategoryController {
  @Autowired
  private CategoryRepository categoriesRepository;

  @GetMapping
  public List<Category> getCategories(@RequestParam String param) {
      return categoriesRepository.findAll();
  }

  @PostMapping("path")
  public Category addItem(@RequestBody Category entity) {
    return categoriesRepository.save(entity);
  }
  
}
