package com.service.controller;

import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.model.Attribute;
import com.service.model.Item;
import com.service.model.ItemDto;
import com.service.model.ItemSku;
import com.service.model.ItemSkuRelation;
import com.service.model.Variation;
import com.service.repository.AttributeRepository;
import com.service.repository.ItemRepository;
import com.service.repository.ItemSkuRepository;
import com.service.repository.VariationRepository;


@RestController
@RequestMapping("/item-skus")
public class ItemSkuController extends BaseController<ItemSku, ItemSkuRepository> {

    private final ItemSkuRepository itemSkuRepository;
    private final ItemRepository itemRepository;
    private final AttributeRepository attributeRepository;
    private final VariationRepository variationRepository;

    public ItemSkuController(ItemSkuRepository itemSkuRepository, ItemRepository itemRepository, AttributeRepository attributeRepository, VariationRepository variationRepository) {
        this.itemRepository = itemRepository;
        this.itemSkuRepository = itemSkuRepository;
        this.attributeRepository = attributeRepository;
        this.variationRepository = variationRepository;
    }
  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody ItemSkuRelation itemSkuRelation) {
    try {
      ItemSku existingSku = itemSkuRepository
        .findById(id).orElseThrow(() -> new RuntimeException("SKU not found"));
      existingSku
        .setPrice(itemSkuRelation.getPrice())
        .setStock(itemSkuRelation.getStock());

      if (itemSkuRelation.getAttributeId() != null) {
        Attribute attribute = attributeRepository
          .findById(itemSkuRelation.getAttributeId()).orElse(null);
        existingSku.setAttribute(attribute);
      }

      if (itemSkuRelation.getVariationId() != null) {
        Variation variation = variationRepository.findById(itemSkuRelation.getVariationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid variation ID"));
        existingSku.setVariation(variation);
    }
      itemSkuRepository.save(existingSku);
      return ResponseEntity.status(HttpStatus.OK).body(existingSku);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body("{\"error\": e.getRootCause().getMessage()}");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("{\"error\": e.getRootCause().getMessage()}");
    }
  }
    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody ItemSkuRelation itemSkuRelation) {
        ItemSku itemSku = new ItemSku();
        Item item = itemRepository.findById(itemSkuRelation.getItemId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid item ID"));
        ItemDto itemDto = new ItemDto();
        itemDto
          .setId(itemSkuRelation.getItemId())
          .setName(item.getName())
          .setDescription(item.getDescription());

        itemSku
          .setPrice(itemSkuRelation.getPrice())
          .setStock(itemSkuRelation.getStock())
          .setItem(itemDto);
        try {
            if (itemSkuRelation.getAttributeId() != null) {
                Attribute attribute = attributeRepository.findById(itemSkuRelation.getAttributeId()).orElse(null);
                itemSku.setAttribute(attribute);
            }
            if (itemSkuRelation.getVariationId() != null) {
                Variation variation = variationRepository.findById(itemSkuRelation.getVariationId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid variation ID"));
                itemSku.setVariation(variation);
            }

            ItemSku savedItemSku = itemSkuRepository.save(itemSku);
            return ResponseEntity.status(HttpStatus.OK).body(savedItemSku);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": e.getRootCause().getMessage()}");
        }
    }
}