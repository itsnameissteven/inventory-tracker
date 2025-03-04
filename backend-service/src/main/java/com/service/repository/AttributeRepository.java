package com.service.repository;


import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.service.model.Attribute;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, UUID> {
} 
  

