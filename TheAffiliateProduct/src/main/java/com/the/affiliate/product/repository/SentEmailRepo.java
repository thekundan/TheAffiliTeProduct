package com.the.affiliate.product.repository;

import org.springframework.data.repository.CrudRepository;

import com.the.affiliate.product.entity.SentEmail;






public interface SentEmailRepo extends CrudRepository<SentEmail,Integer>{
	 
	SentEmail findByEmailId(String emailId);
	

}
