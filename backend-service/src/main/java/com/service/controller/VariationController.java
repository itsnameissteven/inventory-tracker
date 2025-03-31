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

import com.service.model.Variation;
import com.service.repository.VariationRepository;

@RestController
@RequestMapping("/variations")
public class VariationController extends BaseController<Variation, VariationRepository> {  
  private final VariationRepository variationRepository;

  public VariationController(VariationRepository variationRepository) {
      this.variationRepository = variationRepository;
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody Variation variation) {
    try {
      Variation existingVariation = variationRepository.findById(id).orElseThrow(() -> new RuntimeException("Variation not found"));
      existingVariation.setName(variation.getName());
      existingVariation.setDisplayName(variation.getDisplayName());
      variationRepository.save(existingVariation);
      return ResponseEntity.status(HttpStatus.OK).body(existingVariation);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("{\"error\": e.getRootCause().getMessage()}");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("{\"error\": \"An unexpected error occurred.\"}");
    }
  }
}