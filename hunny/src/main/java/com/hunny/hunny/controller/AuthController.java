package com.hunny.hunny.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hunny.hunny.dto.LoginDTO;
import com.hunny.hunny.dto.RegisterDTO;
import com.hunny.hunny.dto.UserDTO;
import com.hunny.hunny.service.UserServices;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired 
    private UserServices service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterDTO dto){
        service.register(dto);
        return "Registered";
    }

  @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
    try {
        HashMap<String, Object> map = service.login(dto);
        return ResponseEntity.ok(map);
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}



@GetMapping("/getAllUsers")
public List<UserDTO> getMethodName() {
    return service.getAllUsers();
}


}
