package com.hunny.hunny.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter

public class UserDTO {
      public long id;
    public String name;
   public  String email;
    public String passowrd;
      private String role;
}
