package com.example.mahdi.codeengine.service;

import com.example.mahdi.codeengine.dao.AppRoleRepository;
import com.example.mahdi.codeengine.model.AppRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppRoleService {
    @Autowired
    private AppRoleRepository appRoleRepository;

    public AppRole saveRole(AppRole appRole) {
        return appRoleRepository.save(appRole);
    }
}
