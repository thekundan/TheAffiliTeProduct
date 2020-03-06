package com.the.affiliate.product.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.the.affiliate.product.entity.DAOUser;
import com.the.affiliate.product.helper.Result;
import com.the.affiliate.product.securityconf.JwtTokenUtil;
import com.the.affiliate.product.service.DAOUserService;
import com.the.affiliate.product.service.JwtUserDetailsService;





@RestController
public class ProductUser {
	
	@Autowired
	private DAOUserService userService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;
	
	
	
	
	@GetMapping(value="/checkAuth")
	public ResponseEntity<?>checkAuth(HttpServletRequest request)
	{
		 final String requestTokenHeader = request.getHeader("Authorization");
		 DAOUser daouser=jwtUserDetailsService.getdaouserfromtoken(requestTokenHeader);
		 
		 if(daouser!=null)
				return new ResponseEntity<>(daouser.getName(),HttpStatus.ACCEPTED);
		 else
			    return new ResponseEntity<>("Please Login Again",HttpStatus.UNAUTHORIZED);
	}
	
	
	@PostMapping(value="/verifyuser/{email}/{otp}")
	public  ResponseEntity<?> verifyuser(@PathVariable String email,@PathVariable String otp)
	{
		Result result=userService.validiateotp(email, otp);
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
	
	
	
	@PostMapping(value="/loginuser/{email}/{password}")
	public  ResponseEntity<?> loginuser(@PathVariable String email,@PathVariable String password)
	{
	
		Result result=userService.checklogin(email, password);
		
	
		
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}

	@PostMapping(value="/forgotpaasword/{email}")
	public  ResponseEntity<?> forgotpaasword(@PathVariable String email)
	{
		Result result=new Result();
		
		DAOUser user=userService.checkDAOUser(email);
		if(user!=null)
		{
			userService.sendrequest(user,"forgot");
			result.setStatus(200);
			result.setMessage("Otp sent on your email.");
		}
		else
		{
			result.setStatus(300);
			result.setMessage("This Email is not registered with us.");
		}
		
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping(value="/paaswordsave/{email}/{password}/{otp}")
	public  ResponseEntity<?> paaswordsave(@PathVariable String email,@PathVariable String password,@PathVariable String otp)
	{
		Result result=new Result();
		
		DAOUser user=userService.checkDAOUser(email);
		if(user!=null)
		{
			result=userService.savepassword(user, otp, password);
		}
		else
		{
			result.setStatus(300);
			result.setMessage("This Email is not registered with us.");
		}
		
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
	
	
	
	@PostMapping(value="/sendEmailCode/{email}")
	public ResponseEntity<?> sendEmailCode(@PathVariable String email)
	{
        Result result=new Result();
		
        DAOUser user=userService.checkDAOUser(email);
		if(user!=null)
		{
			
			userService.sendrequest(user,"sendotp");
			result.setStatus(200);
			result.setMessage("Otp sent on your email.");
		}
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
	}
	
	@PostMapping(value="/AddUser/{email}/{password}/{mobile}/{name}")
	 public ResponseEntity<?> addUser(@PathVariable String email,@PathVariable String password,@PathVariable String mobile,@PathVariable String name)
	{
		
		Result result=new Result();
		
		DAOUser user=userService.checkDAOUser(email);
		if(user!=null)
		{
			if(!user.isVerified())
			{
				result.setStatus(400);
				result.setMessage("This Emailid is Already registered With us.");
			}
			else
			{
				result.setStatus(300);
				result.setMessage("This Emailid is Already registered With us,Please verify your Email.");
			}
		}
		else
		{
			DAOUser daouser=userService.addDAOUser(email, password, mobile, name);
			userService.sendrequest(daouser,"sendotp");
			result.setStatus(200);
			result.setMessage("You have successfully created your account with us.");
		}
			
		return new ResponseEntity<>(result,HttpStatus.ACCEPTED);
		
	  }
		
}
