package com.the.affiliate.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the.affiliate.product.entity.Product;
import com.the.affiliate.product.service.BestGoProductservice;



@RestController
public class BestGoProduct {
	
	@Autowired
	private BestGoProductservice bestGoProductservice;
	
	@GetMapping(value="/productofthemonth")
	public ResponseEntity<?>checkAuth()
	{
		
	    List<Product> list=bestGoProductservice.productofthemonth();
		return new ResponseEntity<>(list,HttpStatus.ACCEPTED);
		
	}

}
