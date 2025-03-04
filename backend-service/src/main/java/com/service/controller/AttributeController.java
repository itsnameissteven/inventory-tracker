package com.service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Attribute;
import com.service.repository.AttributeRepository;

@RestController
@RequestMapping("/attributes")
public class AttributeController extends BaseController<Attribute, AttributeRepository> {

}