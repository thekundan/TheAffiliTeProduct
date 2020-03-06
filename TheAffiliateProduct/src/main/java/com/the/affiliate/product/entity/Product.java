package com.the.affiliate.product.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "productbestgo")
public class Product {
	@Id
	 int id;
	@Column
	 String affiliatewebsite;
	@Column
	 String category;
	@Column
	 String subcategory;
	@Column
	 String size;
	@Column
	 String name;
	@Column
	 String origprice;
	@Column
	 String offerprice;
	@Column(columnDefinition="TEXT")
    String longdescription;
	@Column
	 String imagename;
	@Column
	 String userid;
	@Column
	String url;
	@Column
	String tag;
	@Column
	Date entrydate;
	@Column
	Date modifieddate;
	@Column
	String weblink;
	@Column
	boolean isactive;
	@Column
	boolean isApproved;
	
	@OneToMany(targetEntity=FeatureList.class,cascade = {CascadeType.ALL})
	List<FeatureList> featurelist;
	 
	public boolean isIsactive() {
		return isactive;
	}
	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public Date getEntrydate() {
		return entrydate;
	}
	public void setEntrydate(Date entrydate) {
		this.entrydate = entrydate;
	}
	public Date getModifieddate() {
		return modifieddate;
	}
	public void setModifieddate(Date modifieddate) {
		this.modifieddate = modifieddate;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public String getImagename() {
		return imagename;
	}
	public void setImagename(String imagename) {
		this.imagename = imagename;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public List<FeatureList> getFeaturelist() {
		return featurelist;
	}
	public void setFeaturelist(List<FeatureList> featurelist) {
		this.featurelist = featurelist;
	}
	public String getWeblink() {
		return weblink;
	}
	public void setWeblink(String weblink) {
		this.weblink = weblink;
	}
	public boolean isApproved() {
		return isApproved;
	}
	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	 
	

}
