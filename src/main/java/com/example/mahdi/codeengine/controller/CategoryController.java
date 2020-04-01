package com.example.mahdi.codeengine.controller;

import com.example.mahdi.codeengine.model.Category;
import com.example.mahdi.codeengine.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getCategories(){
        return categoryService.findAllCategories();
    }

    @GetMapping("/category/{id}")
    public Optional<Category> getCategory(@PathVariable Long id){
        return categoryService.findCategoryById(id);
    }

    @GetMapping("/category/name/{name}")
    public Category getCategory(@PathVariable String name){
        return categoryService.findCategoryByName(name);
    }

    @PostMapping("createCategory")
    public ResponseEntity<Category> createCategory(@RequestBody @Valid Category category) throws URISyntaxException {
        Category result = categoryService.saveCategory(category);

        return ResponseEntity.created(new URI("/api/category/")).body(result);
    }

    @PutMapping("/editCategory/{id}")
    public ResponseEntity<Category> editCategory(@RequestBody @Valid Category category) throws URISyntaxException {
        Category result = categoryService.saveCategory(category);

        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);

        return ResponseEntity.ok().build();
    }
}
