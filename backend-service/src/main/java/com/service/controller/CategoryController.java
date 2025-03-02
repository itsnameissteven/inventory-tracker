package com.service.controller;
import com.service.model.Category;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.repository.CategoryRepository;


@RestController
@RequestMapping("/categories")
public class CategoryController  extends BaseController<Category, CategoryRepository> {
}
