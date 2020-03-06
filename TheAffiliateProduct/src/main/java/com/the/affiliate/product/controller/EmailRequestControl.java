package com.the.affiliate.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the.affiliate.product.service.PeopleInfoService;


@RestController
public class EmailRequestControl {
	
	
	@Autowired
	PeopleInfoService peopleInfoService;
	
	
	
	
	  
	  @PostMapping(value="/sendemailbyEmailid/{emailid}/{htmlcontent}/{subject}/{textbody}")
		 public ResponseEntity<?> sendemailbyEmailid(@PathVariable String emailid,@PathVariable String htmlcontent,@PathVariable String subject,@PathVariable String textbody){
	
		  try
		  {
			  peopleInfoService.sendsinglemail(emailid, htmlcontent, subject, textbody);
			  return new ResponseEntity<>(" successfully processed", HttpStatus.OK);
		  }
		  catch (Exception e) {
			  return new ResponseEntity<>(" Failed to processed", HttpStatus.OK);
		}
	  }

	  
}
