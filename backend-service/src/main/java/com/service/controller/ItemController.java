package com.service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody ItemRelation itemRelation) {
    try {
      Item existingItem = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
      existingItem.setName(itemRelation.getName());
      existingItem.setDescription(itemRelation.getDescription());
      List<Category> categories = categoryRepository.findAllById(itemRelation.getCategoryIds());
      existingItem.setCategories(categories);
      itemRepository.save(existingItem);
      return ResponseEntity.status(HttpStatus.OK).body(existingItem);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("{\"error\": e.getRootCause().getMessage()}");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("{\"error\": \"An unexpected error occurred.\"}");
    }
  }
  @PostMapping("/with-categories")
  public ResponseEntity<?> add(@RequestBody ItemRelation itemRelation) {
    System.out.println("ItemRelation: " + itemRelation.getCategoryIds());
      try {
          Item item = new Item();
          List<Category> categories = categoryRepository.findAllById(itemRelation.getCategoryIds());
          item
            .setName(itemRelation.getName())
            .setDescription(itemRelation.getDescription())
            .setCategories(categories);

          Item savedItem = itemRepository.save(item);
          return ResponseEntity.status(HttpStatus.OK).body(savedItem);
      } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .body("{\"error\": e.getRootCause().getMessage()}");
      }
  }
}
