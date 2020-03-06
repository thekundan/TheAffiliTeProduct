package com.the.affiliate.product.aws;
import java.io.File;

import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.the.affiliate.product.entity.AwsS3cred;



@Service
public class EntryPointS3 {

	
	
	public String savefileintos3(File file,AwsS3cred awsS3cred) {
		try {
			
			AWSCredentials credentials = new BasicAWSCredentials(awsS3cred.getAccessKeyId(),awsS3cred.getAccessSecKey());

			
			
			AmazonS3 s3client = AmazonS3ClientBuilder
					  .standard()
					  .withCredentials(new AWSStaticCredentialsProvider(credentials))
							  .withRegion(Regions.AP_SOUTH_1)
					 .build();

			String bucketName = awsS3cred.getBucketName();
			
			
			s3client.putObject(
					new PutObjectRequest(bucketName, file.getName(),file)
							.withCannedAcl(CannedAccessControlList.PublicRead));

			return String.valueOf(s3client.getUrl(bucketName,file.getName()));
			
		}
		catch(Exception e)
		{
			System.out.println(e.getMessage());
			return "";
		}
		
		
	

     	
	}



}