package com.the.affiliate.product.dto;

import java.io.Serializable;

public class FeatureList implements Serializable{

	String featurename;
	String featurevalue;
	
	
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
