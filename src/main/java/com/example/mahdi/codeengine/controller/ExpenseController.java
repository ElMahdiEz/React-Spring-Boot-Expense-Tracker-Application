package com.example.mahdi.codeengine.controller;

import com.example.mahdi.codeengine.model.Expense;
import com.example.mahdi.codeengine.service.ExpenseService;
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
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/expenses")
    public List<Expense> getExpenses(){
        return expenseService.findAllExpenses();
    }

    @GetMapping("/expense/{id}")
    public Optional<Expense> getExpense(@PathVariable Long id){
        return expenseService.findExpenseById(id);
    }

    @PostMapping("/createExpense")
    public ResponseEntity<Expense> createExpense(@RequestBody @Valid Expense expense) throws URISyntaxException {
        Expense result = expenseService.saveExpense(expense);

        return ResponseEntity.created(new URI("/api/expenses")).body(result);
    }

    @PutMapping("/editExpense")
    public ResponseEntity<Expense> editExpense(@RequestBody @Valid Expense expense) throws URISyntaxException {
        Expense result = expenseService.saveExpense(expense);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteExpense/{id}")
    public ResponseEntity deleteExpense(@PathVariable Long id){
        expenseService.deleteExpenseById(id);

        return ResponseEntity.ok().build();
    }
}
