package com.service.controller;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public abstract class BaseController<T, R extends JpaRepository<T, UUID>> {
  @Autowired
  private R repository;

  @GetMapping
  public List<T> getAll() {
    return repository.findAll();
  }

  @PostMapping
  public T add(@RequestBody T item) {
    return repository.save(item);
  }
  @GetMapping("/{id}")
  public T getById(@PathVariable UUID id) {
    return repository.findById(id).orElse(null);
  }
}