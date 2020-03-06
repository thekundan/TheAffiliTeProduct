package com.the.affiliate.product.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "awss3cred")
public class AwsS3cred {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column
	private  String accessKeyId;
	@Column
	private  String accessSecKey;
	@Column
	private  String bucketName;
	@Column
	private  String folderName;
	@Column
	private  String suffix;
	@Column
	private  boolean isactive;

	
	
	
		public boolean isIsactive() {
			return isactive;
		}
	
		public void setIsactive(boolean isactive) {
			this.isactive = isactive;
		}
		public int getId() {
			return id;
		}
	
		public void setId(int id) {
			this.id = id;
		}

		public String getAccessKeyId() {
			return accessKeyId;
		}

		public void setAccessKeyId(String accessKeyId) {
			this.accessKeyId = accessKeyId;
		}

		public String getAccessSecKey() {
			return accessSecKey;
		}

		public void setAccessSecKey(String accessSecKey) {
			this.accessSecKey = accessSecKey;
		}

		public String getBucketName() {
			return bucketName;
		}

		public void setBucketName(String bucketName) {
			this.bucketName = bucketName;
		}

		public String getFolderName() {
			return folderName;
		}

		public void setFolderName(String folderName) {
			this.folderName = folderName;
		}

		public String getSuffix() {
			return suffix;
		}

		public void setSuffix(String suffix) {
			this.suffix = suffix;
		}
}
