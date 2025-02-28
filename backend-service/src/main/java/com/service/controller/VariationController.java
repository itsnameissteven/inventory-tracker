package com.service.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Variation;
import com.service.repository.VariationRepository;

@RestController
@RequestMapping("/variations")
public class VariationController {
  @Autowired
  private VariationRepository variationRepository;

  @GetMapping
  public List<Variation> getVariations(@RequestParam String param) {
      return variationRepository.findAll();
  }

  @PostMapping("path")
  public Variation addItem(@RequestBody Variation entity) {
    return variationRepository.save(entity);
  }
  
}