package com.service.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Image;
import com.service.repository.ImageRepository;


@RestController
@RequestMapping("/images")
public class ImageController extends BaseController<Image, ImageRepository> {

}
