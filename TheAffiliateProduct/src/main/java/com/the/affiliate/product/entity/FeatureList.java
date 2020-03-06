package com.the.affiliate.product.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "featureListbestgo")
public class FeatureList {
	@Id
    int id;
	@Column
	String featurename;
	@Column
	String featurevalue;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFeaturename() {
		return featurename;
	}
	public void setFeaturename(String featurename) {
		this.featurename = featurename;
	}
	public String getFeaturevalue() {
		return featurevalue;
	}
	public void setFeaturevalue(String featurevalue) {
		this.featurevalue = featurevalue;
	}
	
	
	
}
