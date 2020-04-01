package com.example.mahdi.codeengine.dao;

import com.example.mahdi.codeengine.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    public List<Expense> findAll();
    public Optional<Expense> findById(Long id);
    public void deleteById(Long id);
}
