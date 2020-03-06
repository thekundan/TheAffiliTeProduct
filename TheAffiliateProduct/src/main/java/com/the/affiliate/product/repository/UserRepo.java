package com.the.affiliate.product.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.the.affiliate.product.entity.DAOUser;



@Repository
public interface UserRepo extends CrudRepository<DAOUser, Integer>{
	
	DAOUser findByUsername(String email); 
	

}
