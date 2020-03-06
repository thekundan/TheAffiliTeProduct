package com.the.affiliate.product.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.the.affiliate.product.entity.SenderEmail;



public interface SenderEmailRepo  extends CrudRepository<SenderEmail,Integer>{
	
	List<SenderEmail> findByIsactive(boolean isactive);
	
	
	
}
