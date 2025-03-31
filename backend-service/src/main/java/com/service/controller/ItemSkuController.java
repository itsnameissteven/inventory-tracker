package com.service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.ItemSku;
import com.service.repository.ItemSkuRepository;

@RestController
@RequestMapping("/item-skus")
public class ItemSkuController extends BaseController<ItemSku, ItemSkuRepository> {

    private final ItemSkuRepository itemSkuRepository;

    public ItemSkuController(ItemSkuRepository itemSkuRepository) {
        this.itemSkuRepository = itemSkuRepository;
    }
    @Override
    @PostMapping
    public ResponseEntity<?> add(@RequestBody ItemSku itemSku) {
          System.out.println("Type of stock: " + itemSku.getStock().getClass().getName());
        try {
            // Ensure stock is properly formatted as an integer
            if (itemSku.getStock() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("{\"error\": \"Stock value is required.\"}");
            }

            // Save the ItemSku to the database
            ItemSku savedItemSku = itemSkuRepository.save(itemSku);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedItemSku);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"An unexpected error occurred.\"}");
        }
    }
}