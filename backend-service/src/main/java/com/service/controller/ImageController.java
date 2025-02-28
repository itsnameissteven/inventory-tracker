package com.service.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Image;
import com.service.repository.ImageRepository;


@RestController
@RequestMapping("/images")
public class ImageController {
  @Autowired
  private ImageRepository imageRepository;

  @GetMapping
  public List<Image> getImages() {
    return imageRepository.findAll();
  }
  @PostMapping("path")
  public String postImage(@RequestBody String entity) {
      //TODO: process POST request
      return entity;
  }
  
}
