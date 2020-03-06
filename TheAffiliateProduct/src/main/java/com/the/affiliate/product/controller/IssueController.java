package com.the.affiliate.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the.affiliate.product.entity.Issue;
import com.the.affiliate.product.helper.ProductHelper;
import com.the.affiliate.product.helper.Result;
import com.the.affiliate.product.repository.IssueRepo;





@RestController

public class IssueController { 
	
	@Autowired
	private IssueRepo issuerepo;
	
	@PostMapping(value="/issuemessage/{name}/{email}/{message}")
	public  ResponseEntity<?> issuemessage(@PathVariable String name,@PathVariable String email,@PathVariable String message)
	{
		Result result=new Result();
		try
		{
			Issue issue=new Issue();
			issue.setEmail(email);
			issue.setName(name);
			issue.setMmessage(message);
			issue.setId(ProductHelper.generateUniqueId());
			issuerepo.save(issue);
			result.setStatus(200);
			result.setMessage("You are successfully verified.");
		}
		catch (Exception e) {
		}
		
		
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}

}
