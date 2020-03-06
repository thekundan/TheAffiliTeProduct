package com.the.affiliate.product.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.the.affiliate.product.entity.PeopleInfo;




public interface PeopleInfoRepo extends CrudRepository<PeopleInfo,Integer>{
	
	
	List<PeopleInfo> findByEmailIsNotNull();

}
