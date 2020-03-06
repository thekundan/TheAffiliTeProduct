package com.the.affiliate.product.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "issue")
public class Issue {
	
	@Id
	 int id;
	@Column
	String name;
	@Column
	String email;
	@Column
	String mmessage;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMmessage() {
		return mmessage;
	}
	public void setMmessage(String mmessage) {
		this.mmessage = mmessage;
	}
	
	

}
