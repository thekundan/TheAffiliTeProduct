package com.the.affiliate.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.the.affiliate.product.entity.Product;
import com.the.affiliate.product.repository.ProductRepo;




@Service
public class BestGoProductservice {
	
	@Autowired
	ProductRepo productRepo;
	
	public List<Product> productofthemonth()
	{
		return productRepo.findByTag("day",PageRequest.of(0, 30,Sort.by("entrydate").descending()));
	}

}
