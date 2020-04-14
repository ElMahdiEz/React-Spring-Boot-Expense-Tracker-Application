package com.example.mahdi.codeengine.dao;

import com.example.mahdi.codeengine.model.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
    public Optional<AppRole> findByRole(String role);
}
