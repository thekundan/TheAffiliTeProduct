package com.the.affiliate.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.the.affiliate.product.entity.Product;
import com.the.affiliate.product.repository.ProductRepo;



@Service
public class ProductService {
	
	
	@Autowired
	ProductRepo productRepo;
	
	
	   public List<Product> getyourproct(int page)
		   {
			return productRepo.findByIsactive(true,PageRequest.of(page, 8,Sort.by("entrydate").descending()));
		   }
	  
	   public Product getsingleyourproct(int id)
		   {
			   return productRepo.findById(id);
		   }
	   
	   public List<Product> getproductbyname(String text,int pageno)
	   {
		   return productRepo.findByNameIgnoreCaseContainingAndIsactive(text, true, PageRequest.of(pageno, 8,Sort.by("entrydate").descending()));
	   }
	
	   public List<Product> getProductByCategoryAndSubcategory(String category,String subcategory,int pageno)
	   {
		   return productRepo.findByCategoryAndSubcategoryAndIsactive(category, subcategory, true,PageRequest.of(pageno, 8,Sort.by("entrydate").descending()));
	   }
	   
	   public List<Product> getProductByCategory(String category,int pageno)
	   {
		   return productRepo.findByCategoryAndIsactive(category, true, PageRequest.of(pageno, 8,Sort.by("entrydate").descending()));
	   }
	   

}
