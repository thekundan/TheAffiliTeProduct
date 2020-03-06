package com.the.affiliate.product.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.the.affiliate.product.entity.OtpRequest;



public interface OtpRequestRepo extends CrudRepository<OtpRequest, Integer>{
	

	 void deleteByEmail(String email);
	
	List<OtpRequest> findByEmail(String email);
	
	
}
