package com.service.controller;

import com.service.model.Item;
import com.service.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {
  @Autowired
  private ItemRepository itemRepository;

  @GetMapping
  public List<Item> getItems() {
    return itemRepository.findAll();
  }

  @PostMapping
  public Item addItem(@RequestBody Item item) {
    return itemRepository.save(item);
  }
}
