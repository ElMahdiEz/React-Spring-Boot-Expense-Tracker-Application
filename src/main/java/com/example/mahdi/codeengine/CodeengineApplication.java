package com.example.mahdi.codeengine;

import com.example.mahdi.codeengine.service.AppRoleService;
import com.example.mahdi.codeengine.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeengineApplication {
	@Autowired
	private AppUserService appUserService;
	@Autowired
	private AppRoleService appRoleService;

	public static void main(String[] args) {
		SpringApplication.run(CodeengineApplication.class, args);
	}


}
