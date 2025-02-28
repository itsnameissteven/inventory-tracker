package com.service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.service.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, UUID> {
}