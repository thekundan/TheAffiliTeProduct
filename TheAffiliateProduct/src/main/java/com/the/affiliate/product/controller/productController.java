package com.the.affiliate.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.the.affiliate.product.entity.Product;
import com.the.affiliate.product.service.ProductService;



@RestController
public class productController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping(value="/getproductpage/{pageid}")
	public ResponseEntity<?>getsingleproductcont(@PathVariable String pageid)
	{
	       List<Product> list=productService.getyourproct(Integer.parseInt(pageid));
		   return new ResponseEntity<>(list,HttpStatus.ACCEPTED);
	}
	@GetMapping(value="/getsingleproductcont/{productid}")
	public ResponseEntity<?>getsingleproductpage(@PathVariable String productid)
	{
		Product product=productService.getsingleyourproct(Integer.parseInt(productid));
		return new ResponseEntity<>(product,HttpStatus.ACCEPTED);
	}
	@GetMapping(value="/getproductbycategory/{category}/{pageid}")
	public ResponseEntity<?>getproductbycategory(@PathVariable String category,@PathVariable String pageid)
	{
		List<Product> list=productService.getProductByCategory(category,Integer.parseInt(pageid) );
		return new ResponseEntity<>(list,HttpStatus.ACCEPTED);
	}	
	@GetMapping(value="/getproductbycatsubcat/{category}/{subcategory}/{pageid}")
	public ResponseEntity<?>getproductbycategorysubcategory(@PathVariable String category,@PathVariable String subcategory,@PathVariable String pageid)
	{
		List<Product> list=productService.getProductByCategoryAndSubcategory(category, subcategory,Integer.parseInt(pageid));
		return new ResponseEntity<>(list,HttpStatus.ACCEPTED);
	}
	@GetMapping(value="/searchtext/{text}/{pageid}")
	public ResponseEntity<?>searchtext(@PathVariable String text,@PathVariable String pageid)
	{
		  List<Product> list=productService.getproductbyname(text, Integer.parseInt(pageid));
		  return new ResponseEntity<>(list,HttpStatus.ACCEPTED);
	}

}
