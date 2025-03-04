package com.service.controller;

import com.service.model.Item;
import com.service.repository.ItemRepository;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/items")
public class ItemController extends BaseController<Item, ItemRepository> {

}
