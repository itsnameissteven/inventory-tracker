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

import com.service.model.Attribute;
import com.service.repository.AttributeRepository;

@RestController
@RequestMapping("/attributes")
public class AttributeController extends BaseController<Attribute, AttributeRepository> {
  private final AttributeRepository attributeRepository;

  public AttributeController(AttributeRepository attributeRepository) {
      this.attributeRepository = attributeRepository;
  }
  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody Attribute attribute) {
    try {
      Attribute existingAttribute = attributeRepository
        .findById(id).orElseThrow(() -> new RuntimeException("Attribute not found"));
      existingAttribute.setName(attribute.getName());
      attributeRepository.save(existingAttribute);
      return ResponseEntity.status(HttpStatus.OK).body(existingAttribute);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("{\"error\": e.getRootCause().getMessage()}");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("{\"error\": \"An unexpected error occurred.\"}");
    }
  }
}