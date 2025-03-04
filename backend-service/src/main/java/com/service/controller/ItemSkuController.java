package com.service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.ItemSku;
import com.service.repository.ItemSkuRepository;

@RestController
@RequestMapping("/item-skus")
public class ItemSkuController extends BaseController<ItemSku, ItemSkuRepository> {

}