package com.hunny.hunny.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

// @Entity
// @Data
// @Table(name="product")
// public class Product {
//     @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long product_id;
//     private String name;
//     private String description;
//     private double price;
//     private double quantity;
//     private String imageUrl;
//     private boolean available;
// }
@Entity
@Table(name = "products")
@Getter @Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Integer quantity;
    private String imageUrl;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id") 
    private Category category;
}
