package com.service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Variation;
import com.service.repository.VariationRepository;

@RestController
@RequestMapping("/variations")
public class VariationController extends BaseController<Variation, VariationRepository> {  
}