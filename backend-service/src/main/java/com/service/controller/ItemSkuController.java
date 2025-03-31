package com.service.controller;

// Removed conflicting import

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Attribute;
import com.service.model.ItemSku;
import com.service.model.ItemSkuRelation;
import com.service.model.Variation;
import com.service.repository.AttributeRepository;
import com.service.repository.ItemSkuRepository;
import com.service.repository.VariationRepository;

@RestController
@RequestMapping("/item-skus")
public class ItemSkuController extends BaseController<ItemSku, ItemSkuRepository> {

    private final ItemSkuRepository itemSkuRepository;
    private final AttributeRepository attributeRepository;
    private final VariationRepository variationRepository;

    public ItemSkuController(ItemSkuRepository itemSkuRepository, AttributeRepository attributeRepository, VariationRepository variationRepository) {
        this.itemSkuRepository = itemSkuRepository;
        this.attributeRepository = attributeRepository;
        this.variationRepository = variationRepository;
    }
    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody ItemSkuRelation itemSkuRelation) {
        ItemSku itemSku = new ItemSku();
        itemSku.setPrice(itemSkuRelation.getPrice());
        itemSku.setStock(itemSkuRelation.getStock());
        itemSku.setItemId(itemSkuRelation.getItemId());
        try {
            System.out.println("ItemSkuRelation: " + itemSkuRelation.getAttributeId());
            System.out.println("ItemSkuRelation: " + itemSkuRelation.getVariationId());
            if (itemSkuRelation.getAttributeId() != null) {
                Attribute attribute = attributeRepository.findById(itemSkuRelation.getAttributeId()).orElse(null);
                itemSku.setAttribute(attribute);
            }

            if (itemSkuRelation.getVariationId() != null) {
                Variation variation = variationRepository.findById(itemSkuRelation.getVariationId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid variation ID"));
                itemSku.setVariation(variation);
            }

            // Save the ItemSku to the database
            ItemSku savedItemSku = itemSkuRepository.save(itemSku);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedItemSku);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"An unexpected error occurred.\"}");
        }
    }
}