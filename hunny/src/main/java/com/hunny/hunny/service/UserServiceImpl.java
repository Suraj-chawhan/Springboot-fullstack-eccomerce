package com.hunny.hunny.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hunny.hunny.Entity.User;
import com.hunny.hunny.dto.LoginDTO;
import com.hunny.hunny.dto.RegisterDTO;
import com.hunny.hunny.dto.UserDTO;
import com.hunny.hunny.repository.UserRepository;
import com.hunny.hunny.security.JwtUtil;


@Service
public class UserServiceImpl implements UserServices{
     @Autowired UserRepository repo;
    @Autowired JwtUtil jwt;
    @Autowired PasswordEncoder encoder;

    public void register(RegisterDTO dto){
            if(repo.findByEmail(dto.email).isPresent()){
        throw new RuntimeException("Email already exists");
    }

        User u = new User();
        u.setName(dto.name);
        u.setEmail(dto.email);
        u.setPassword(encoder.encode(dto.password));
        u.setRole(dto.role);
        repo.save(u);
    }




public HashMap<String, Object> login(LoginDTO dto) {
    User u = repo.findByEmail(dto.email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!encoder.matches(dto.password, u.getPassword()))
        throw new RuntimeException("Invalid login");

    String token = jwt.generateToken(u.getEmail(), u.getRole());

    HashMap<String, Object> res = new HashMap<>();
    res.put("token", token);
    res.put("role", u.getRole());
    res.put("email", u.getEmail());
    res.put("name", u.getName());
    res.put("id",u.getId());

    return res;
}


    public List<UserDTO> getAllUsers(){
       List<User>u=repo.findAll();
       List<UserDTO> userList=u.stream().map(v->new UserDTO(v.getId(),v.getName(),v.getEmail(),v.getPassword(),v.getRole())).toList();
       return userList;
    }
}
