package com.the.affiliate.product.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.the.affiliate.product.entity.DAOUser;
import com.the.affiliate.product.entity.OtpRequest;
import com.the.affiliate.product.helper.PasswordHelper;
import com.the.affiliate.product.helper.ProductHelper;
import com.the.affiliate.product.helper.Result;
import com.the.affiliate.product.repository.OtpRequestRepo;
import com.the.affiliate.product.repository.UserRepo;
import com.the.affiliate.product.securityconf.JwtTokenUtil;



@Service
public class DAOUserService {
	
	@Autowired
	private UserRepo DAOUserRepo;
	
	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	
	@Autowired
	private OtpRequestRepo otpRequestRepo;
	
	@Autowired
	private PeopleInfoService peopleInfoService;
	
	
	
	public Result checklogin(String email,String password)
	{

		Result result=new Result();
		try
		{
			DAOUser user=DAOUserRepo.findByUsername(email);
			if(user.getUsername().equals(email) && password.equals(PasswordHelper.passwordDecode(user.getPassword())))
			{
				if(user.isVerified()==true)
				{
					final UserDetails userDetails =new org.springframework.security.core.userdetails.User(email, password,new ArrayList<>());
                    String token=jwtTokenUtil.generateToken(userDetails);
					result.setStatus(200);
					result.setUsername(user.getName());
					result.setMessage("you logged-in successfully.");
					result.setJwstoken(token);
             	}
				else
				{
					result.setStatus(300);
					result.setMessage("Please verify your account.");
				}
			}
			else
			{
				result.setStatus(400);
				result.setMessage("check your password.");

			}
		}
		catch (Exception e) {
			result.setStatus(400);
			result.setMessage("Please verify your account.");
		}

		return result;
		
	
	}
	public DAOUser checkDAOUser(String email)
	{
		
		try
		{
			DAOUser dAOUser=DAOUserRepo.findByUsername(email);
			return dAOUser;
		}
		catch (Exception e) {
		
			return null;
		}
		
	}
	public Result savepassword(DAOUser dAOUser,String otp,String password)
	{
		Result result=new Result();
      
		
	
		try
		{
			String otpv="";
			List<OtpRequest> otprequest=otpRequestRepo.findByEmail(dAOUser.getUsername());
			for(OtpRequest otpr:otprequest)
				otpv=otpr.getOtp();
			
			if(otpv.equals(otp))
			{
				dAOUser.setPassword(PasswordHelper.passwordEncode(password));
				DAOUserRepo.save(dAOUser);
				final UserDetails userDetails =new org.springframework.security.core.userdetails.User(dAOUser.getUsername(), password,new ArrayList<>());
				    result.setStatus(200);
					result.setUsername(dAOUser.getName());
					result.setMessage("you logged-in successfully.");
					result.setJwstoken(jwtTokenUtil.generateToken(userDetails));
				
			}
			
		
		
		}catch (Exception e) {
			result.setStatus(400);
			result.setMessage("Please verify your account.");
		}
		return result;
	}
	
	

	public boolean sendrequest(DAOUser dAOUser,String request)
	{
		
		try
		{
			deleteallotp(dAOUser.getUsername());
			String otp=ProductHelper.generateOTP(6);
			OtpRequest otprequest=new OtpRequest();
			otprequest.setOtp(otp);
			otprequest.setEmail(dAOUser.getUsername());
			
			otpRequestRepo.save(otprequest);
			
			if(request.equals("forgot"))
				peopleInfoService.sendotp(dAOUser.getUsername(), otp);
			else
				peopleInfoService.forgotpassword(dAOUser.getUsername(), otp);
			return true;
			
			
		}
		catch (Exception e) {
		
			return false;
		}
		
	}
	

	public void deleteallotp(String emailId)
	{
		try
		{
			List<OtpRequest> otprequest=otpRequestRepo.findByEmail(emailId);
			for(OtpRequest otpr:otprequest)
				otpRequestRepo.delete(otpr);
		
		}catch (Exception e) {
			System.err.println("failed to delete otp "+emailId);
		}
	}
	
	public Result validiateotp(String email,String otp)
	{
		Result result=new Result();
		try
		{
			DAOUser dAOUser=DAOUserRepo.findByUsername(email);
		
			String otpv="";
			List<OtpRequest> otprequest=otpRequestRepo.findByEmail(dAOUser.getUsername());
			for(OtpRequest otpr:otprequest)
				otpv=otpr.getOtp();
			
			if(otpv.equals(otp))
			{
				final UserDetails userDetails =new org.springframework.security.core.userdetails.User(email, PasswordHelper.passwordDecode(dAOUser.getPassword()),new ArrayList<>());
                String token=jwtTokenUtil.generateToken(userDetails);
				
				dAOUser.setVerified(true);
				DAOUserRepo.save(dAOUser);
				result.setStatus(200);
				result.setUsername(dAOUser.getName());
				result.setMessage("You are successfully verified.");
				result.setJwstoken(token);
			}
			else
			{
				result.setStatus(300);
				result.setMessage("Please enter valid otp.");
			}
		}
		catch (Exception e) {
			result.setStatus(500);
			result.setMessage("Something Went Wrong.");
		}
		return result;
	}
	
	

	public DAOUser addDAOUser(String email,String password,String mobile,String name)
	{
		Random rand = new Random();
		try
		{
			DAOUser dAOUser=new DAOUser();
			dAOUser.setUsername(email);
			dAOUser.setId(ProductHelper.generateUniqueId());
			dAOUser.setMobile(mobile);
			dAOUser.setPassword(PasswordHelper.passwordEncode(password));
			dAOUser.setName(name);
			dAOUser.setVerified(false);
			dAOUser.setEntrydate(new Date());
			DAOUserRepo.save(dAOUser);
			return dAOUser;
		}
		catch (Exception e) {
			return null;	
		}
		
	}

}
