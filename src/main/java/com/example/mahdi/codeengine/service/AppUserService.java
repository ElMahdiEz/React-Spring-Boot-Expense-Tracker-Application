package com.example.mahdi.codeengine.service;

import com.example.mahdi.codeengine.dao.AppRoleRepository;
import com.example.mahdi.codeengine.dao.AppUserRepository;
import com.example.mahdi.codeengine.model.AppRole;
import com.example.mahdi.codeengine.model.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AppUserService implements UserDetailsService {
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private AppRoleRepository appRoleRepository;

    public List<AppUser> findAllAppUsers() {
        return appUserRepository.findAll();
    }

    public AppUser saveUser(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    public void addRoleToUser(String userName, String roleName) {
        AppUser appUser = appUserRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));;
        AppRole appRole = appRoleRepository.findByRole(roleName)
                .orElseThrow(() -> new UsernameNotFoundException(userName));;

        appUser.getRoles().add(appRole);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        Collection<GrantedAuthority> authorities = new ArrayList<>();

        for(AppRole role : appUser.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getRole()));
        }

        return new User(appUser.getUsername(), appUser.getPassword(), authorities);
    }
}
