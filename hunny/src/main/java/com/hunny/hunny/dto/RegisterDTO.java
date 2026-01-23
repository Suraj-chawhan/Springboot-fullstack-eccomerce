package com.hunny.hunny.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
      public String name;
    public String email;
    public String password;
    public String role;
}
