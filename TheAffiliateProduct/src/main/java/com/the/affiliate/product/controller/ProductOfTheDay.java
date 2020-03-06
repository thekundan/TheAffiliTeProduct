package com.the.affiliate.product.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.the.affiliate.product.entity.Product;
import com.the.affiliate.product.entity.ProductOTD;
import com.the.affiliate.product.repository.ProductOtdRepo;
import com.the.affiliate.product.repository.ProductRepo;
import com.the.affiliate.product.service.AddProductService;





@RestController
public class ProductOfTheDay {
	
	
	@Autowired
	private AddProductService addProductService;
	
	@Autowired
	private ProductOtdRepo productOtdrepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	 @GetMapping(value = "/offeroftheday")
	  public  ResponseEntity<?> yourproducts(HttpServletRequest request)
	  {
		 try
		 {
				List<ProductOTD> list=productOtdrepo.findByIsActive(true);
				List<Product> listpro=new ArrayList<Product>();
				for(ProductOTD pro:list)
				{
					Product product=productRepo.findById(pro.getProductid());
					listpro.add(product);
				}
				return new ResponseEntity<>(listpro, HttpStatus.OK);	
			 
		 }
		 
		 catch (Exception e) {
			   return new ResponseEntity<>("something went wrong", HttpStatus.OK);	
			
		}
	
		
		 
	 }
	
	
	
	
	
	
	@PostMapping(value="/Addofferoftheday")
	 public ResponseEntity<?> addyourProduct(@RequestParam("productid") String productid,@RequestParam("file") MultipartFile[] uploadfile){
		
		
		try
		{
			String img=addProductService.addproductimage(uploadfile);
			String src=addProductService.savetos3(img, 1920, 720);
			ProductOTD productoth=new ProductOTD();
			productoth.setProductid(Integer.parseInt(productid));
			productoth.setActive(true);
			productoth.setEntrydate(new Date());
			productoth.setImagesrc(src);
			productOtdrepo.save(productoth);
			        
			return new ResponseEntity<>("Successfully stored", HttpStatus.OK);
			
		}
		catch (Exception e) {
			return new ResponseEntity<>("Failed to save."+e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
		
	}

}
