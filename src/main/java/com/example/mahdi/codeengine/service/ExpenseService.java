package com.example.mahdi.codeengine.service;

import com.example.mahdi.codeengine.dao.ExpenseRepository;
import com.example.mahdi.codeengine.model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> findAllExpenses(){
        return expenseRepository.findAll();
    }

    public Optional<Expense> findExpenseById(Long id){
        return expenseRepository.findById(id);
    }

    public Expense saveExpense(Expense expense){
        return expenseRepository.save(expense);
    }

    public void deleteExpenseById(Long id){
        expenseRepository.deleteById(id);
    }
}
