package com.the.affiliate.product.repository;

import org.springframework.data.repository.CrudRepository;

import com.the.affiliate.product.entity.AwsS3cred;




public interface AwsS3credRepo extends CrudRepository<AwsS3cred, Integer>{

	AwsS3cred findByIsactive(boolean isactive);
}
