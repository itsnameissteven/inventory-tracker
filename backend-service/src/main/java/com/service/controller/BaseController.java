package com.service.controller;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<?> add(@RequestBody T item) {  
    try {
            T savedItem = repository.save(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": e.getRootCause().getMessage()}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"An unexpected error occurred.\"}");
        }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?>  getById(@PathVariable UUID id) {
    try {
      T item = repository.findById(id).orElse(null);
        return ResponseEntity.status(HttpStatus.OK).body(item);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("{\"error\": \"An unexpected error occurred.\"}");
    }
  }
}