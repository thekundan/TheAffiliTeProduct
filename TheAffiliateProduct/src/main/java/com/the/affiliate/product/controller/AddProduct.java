package com.the.affiliate.product.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.the.affiliate.product.entity.DAOUser;
import com.the.affiliate.product.entity.Product;
import com.the.affiliate.product.service.AddProductService;
import com.the.affiliate.product.service.DAOUserService;
import com.the.affiliate.product.service.JwtUserDetailsService;


@RestController
public class AddProduct {
	
	@Autowired
	AddProductService addProductService;
	
	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;
	
	@Autowired
	private DAOUserService dAOUserService;
	
	
	  @GetMapping(value = "/yourProduct/{pageid}")
	  public  ResponseEntity<?> yourproducts(HttpServletRequest request,@PathVariable String pageid)
	  {
		  final String requestTokenHeader = request.getHeader("Authorization");
		 
		  DAOUser daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  if(daouser!=null)
		  {
			     List<Product> list=addProductService.getyourproct(String.valueOf(daouser.getId()),Integer.parseInt(pageid));
				  return new ResponseEntity<>(list, HttpStatus.OK);	
		  }
		  else
		  {
			  return new ResponseEntity<>("Please Logout and Login again to continue our Services.", HttpStatus.UNAUTHORIZED);	
		  }
	 }
	  
	  @GetMapping(value = "/getsingleProduct/{id}")
	  public  ResponseEntity<?> getsingleProduct(HttpServletRequest request,@PathVariable String id)
	  {
		  final String requestTokenHeader = request.getHeader("Authorization");
		  DAOUser daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  if(daouser!=null)
		  {
			   Product product=addProductService.getsingleyourproct(Integer.parseInt(id));
			  return new ResponseEntity<>(product, HttpStatus.OK);	
		  }
		  else
			  
			  return new ResponseEntity<>("Please Logout and Login again to continue our Services.", HttpStatus.UNAUTHORIZED);	
	  }
	  
	  @PostMapping(value="/deactiveyourproduct/{id}")
		 public ResponseEntity<?> deactiveyourproduct(HttpServletRequest request,@PathVariable String id){
		  
		  final String requestTokenHeader = request.getHeader("Authorization");
		  DAOUser daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  if(daouser!=null)
		  {
			  addProductService.deactivateYourProduct(Integer.parseInt(id));
				 return new ResponseEntity<>(HttpStatus.OK);
		  }
		  else
			  return new ResponseEntity<>("Please Logout and Login again to continue our Services.", HttpStatus.UNAUTHORIZED);	
	} 
	  @PostMapping(value="/activateproduct/{id}")
		 public ResponseEntity<?> activateproduct(HttpServletRequest request,@PathVariable String id){
		  
		  final String requestTokenHeader = request.getHeader("Authorization");
		  DAOUser daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  if(daouser!=null)
		  {
			  addProductService.activateYourProduct(Integer.parseInt(id));
			  return new ResponseEntity<>(HttpStatus.OK);
		  }
		  else
			  return new ResponseEntity<>("Please Logout and Login again to continue our Services.", HttpStatus.UNAUTHORIZED);
		} 
	  
	  
	@PostMapping(value="/AddyourProduct")
	 public ResponseEntity<?> addyourProduct(HttpServletRequest request, @RequestParam("affiliatewebsite") String affiliatewebsite, @RequestParam("category") String category,
			 @RequestParam("subcategory") String subcategory, @RequestParam("size") String size, @RequestParam("name") String name, @RequestParam("weblink") String weblink,
			 @RequestParam("origprice") String origprice, @RequestParam("offerprice") String offerprice, @RequestParam("longdescription") String longdescription,
			 @RequestParam("featurelist") List<String> featurelist,@RequestParam("files") MultipartFile[] uploadfile){
		
		  final String requestTokenHeader = request.getHeader("Authorization");
		  DAOUser daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		  if(daouser!=null)
		  {
				String imagename=addProductService.addproductimage(uploadfile);
				if(!imagename.isEmpty())
				{
					addProductService.addyourproduct(weblink,String.valueOf(daouser.getId()),imagename, affiliatewebsite, category, subcategory, size, name, origprice, offerprice, longdescription, featurelist);
					return new ResponseEntity<>("ok", HttpStatus.OK);	 	
				}
				else
				    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		  }
		  else
			  return new ResponseEntity<>("Please Logout and Login again to continue our Services.", HttpStatus.UNAUTHORIZED);
		
	
        
    	} 
}
