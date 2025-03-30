package com.service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Category;
import com.service.model.Item;
import com.service.model.ItemRelation;
import com.service.repository.CategoryRepository;
import com.service.repository.ItemRepository;

@RestController
@RequestMapping("/items")
public class ItemController extends BaseController<Item, ItemRepository> {
  private final CategoryRepository categoryRepository;
  private final ItemRepository itemRepository;

  public ItemController(CategoryRepository categoryRepository, ItemRepository itemRepository) {
      this.categoryRepository = categoryRepository;
      this.itemRepository = itemRepository;
  }
  @PostMapping("/with-categories")
  public ResponseEntity<?> add(@RequestBody ItemRelation itemRelation) {
    System.out.println("ItemRelation: " + itemRelation.getCategoryIds());
      try {
          Item item = new Item();
          item.setName(itemRelation.getName());
          item.setDescription(itemRelation.getDescription());

          List<Category> categories = categoryRepository.findAllById(itemRelation.getCategoryIds());
          
          item.setCategories(categories);
          System.out.println("Item to be saved: " + item);
          Item savedItem = itemRepository.save(item);
          return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
      } catch (Exception e) {
          System.out.println("Error: " + e);
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .body("{\"error\": \"An unexpected error occurred.\"}");
      }
  }
}
