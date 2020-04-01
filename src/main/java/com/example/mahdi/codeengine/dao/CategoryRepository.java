package com.example.mahdi.codeengine.dao;

import com.example.mahdi.codeengine.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    public List<Category> findAll();
    public Category findByName(String name);
    public Optional<Category> findById(Long id);
    public void deleteById(Long id);
}
