package com.the.affiliate.product.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.the.affiliate.product.entity.Issue;





@Repository
public interface IssueRepo extends CrudRepository<Issue, Integer>{

}
