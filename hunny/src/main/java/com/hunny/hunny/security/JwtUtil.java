package com.hunny.hunny.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

public String generateToken(String email, String role) {
    return Jwts.builder()
            .setSubject(email)
            .claim("role", role) 
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(getSignKey(), SignatureAlgorithm.HS256)
            .compact();
}

   
public String extractRole(String token) {
    return getAllClaims(token).get("role", String.class);
}


    public String extractEmail(String token) {
        return getAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, String email) {
        return extractEmail(token).equals(email) && !isExpired(token);
    }

    private boolean isExpired(String token) {
        return getAllClaims(token).getExpiration().before(new Date());
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
