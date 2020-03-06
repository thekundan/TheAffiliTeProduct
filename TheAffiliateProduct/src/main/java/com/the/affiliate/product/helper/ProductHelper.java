package com.the.affiliate.product.helper;

import java.util.Random;
import java.util.UUID;

public class ProductHelper {
          
	
	
	 public static int generateUniqueId() {      
	        UUID idOne = UUID.randomUUID();
	        String str=""+idOne;        
	        int uid=str.hashCode();
	        String filterStr=""+uid;
	        str=filterStr.replaceAll("-", "");
	        return Integer.parseInt(str);
	    }
	 

	 public static String generateOTP(int length) {
	      String numbers = "1234567890";
	      String otp="";
	      Random random = new Random();
	        for(int i = 0; i< length ; i++) {
	    	  otp = otp+String.valueOf(numbers.charAt(random.nextInt(numbers.length())));
	      }
	      return otp;
	   }
	
}
