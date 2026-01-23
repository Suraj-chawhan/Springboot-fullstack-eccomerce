package com.hunny.hunny.service;


import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;


import com.hunny.hunny.dto.LoginDTO;
import com.hunny.hunny.dto.RegisterDTO;
import com.hunny.hunny.dto.UserDTO;


@Service

public interface UserServices {

    void register(RegisterDTO dto);
    HashMap<String,Object> login(LoginDTO dto);
    List<UserDTO> getAllUsers();


}
