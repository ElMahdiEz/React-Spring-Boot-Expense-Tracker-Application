package com.example.mahdi.codeengine.dao;

import com.example.mahdi.codeengine.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    public Optional<AppUser> findByUsername(String username);
}
