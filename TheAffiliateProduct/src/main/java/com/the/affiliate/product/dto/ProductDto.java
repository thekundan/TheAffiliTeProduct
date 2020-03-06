package com.the.affiliate.product.dto;

import java.io.File;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;


public class ProductDto {

	 String affiliatewebsite;
	 String category;
	 String subcategory;
	 String size;
	 String name;
	 String origprice;
	 String offerprice;
	 String longdescription;
	 File image;
	
	 List<FeatureList> featurelist;
	
	 
	
	
	public File getImage() {
		return image;
	}
	public void setImage(File image) {
		this.image = image;
	}
	public String getAffiliatewebsite() {
		return affiliatewebsite;
	}
	public void setAffiliatewebsite(String affiliatewebsite) {
		this.affiliatewebsite = affiliatewebsite;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getSubcategory() {
		return subcategory;
	}
	public void setSubcategory(String subcategory) {
		this.subcategory = subcategory;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOrigprice() {
		return origprice;
	}
	public void setOrigprice(String origprice) {
		this.origprice = origprice;
	}
	public String getOfferprice() {
		return offerprice;
	}
	public void setOfferprice(String offerprice) {
		this.offerprice = offerprice;
	}
	public String getLongdescription() {
		return longdescription;
	}
	public void setLongdescription(String longdescription) {
		this.longdescription = longdescription;
	}
	
	public List<FeatureList> getFeaturelist() {
		return featurelist;
	}
	public void setFeaturelist(List<FeatureList> featurelist) {
		this.featurelist = featurelist;
	}
	
	
	
	
	
	
	
}
