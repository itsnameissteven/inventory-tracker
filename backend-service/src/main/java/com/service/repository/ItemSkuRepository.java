package com.service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.service.model.ItemSku;

@Repository
public interface ItemSkuRepository extends JpaRepository<ItemSku, UUID> {
}