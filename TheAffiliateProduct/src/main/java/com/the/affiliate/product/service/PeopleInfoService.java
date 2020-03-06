package com.the.affiliate.product.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.the.affiliate.product.aws.AmazonSendEmailViaSES;
import com.the.affiliate.product.entity.PeopleInfo;
import com.the.affiliate.product.entity.SenderEmail;
import com.the.affiliate.product.entity.SentEmail;
import com.the.affiliate.product.helper.Helper;
import com.the.affiliate.product.repository.PeopleInfoRepo;
import com.the.affiliate.product.repository.SenderEmailRepo;
import com.the.affiliate.product.repository.SentEmailRepo;







@Service
public class PeopleInfoService {
	
	
	@Autowired
	PeopleInfoRepo peopleRepo;
	@Autowired
	SenderEmailRepo senderEmailRepo;
	@Autowired
	SentEmailRepo sentEmailRepo;
	@Autowired
	AmazonSendEmailViaSES sendEmailViaSES;
	
	
	
	public boolean sendotp(String emailid,String otp)
	{
		String htmlcontent=Helper.otpdata;
		htmlcontent=htmlcontent.replace("otpvalueedit", otp);
		sendsinglemail(emailid, htmlcontent,"OTP Verification", "");
		return true;
	}
	
	public boolean forgotpassword(String emailid,String otp)
	{
		String htmlcontent=Helper.otpdata;
		htmlcontent=htmlcontent.replace("otpvalueedit", otp);
		sendsinglemail(emailid, htmlcontent,"Forgot Password Request", "");
		return true;
	}
	
	
	public void sendsinglemail(String emailid,String htmlcontent,String subject,String textbody)
	{
		 try
		 {
			 String from="";
			 String configset="";
			 List<SenderEmail> senderlist=senderEmailRepo.findByIsactive(true);
			
			 SenderEmail sender=null;
			 for(SenderEmail sen:senderlist)
				 sender=sen;
			 
		   	 sendEmailViaSES.sendEmail(sender, emailid, subject, htmlcontent);
		 }
		catch (Exception e) { 
				System.out.println("Failed to send Mail");
		}
	}
	
	
	public void sendofferoftheday(int limit,String htmlcontent,String subject)
	{
		try
		{
			List<SenderEmail> senderlist=senderEmailRepo.findByIsactive(true);
			 SenderEmail sender=null;
			 for(SenderEmail sen:senderlist)
				 sender=sen;
		
			 
			 
			List<PeopleInfo> peoplelist=peopleRepo.findByEmailIsNotNull();
		
			int count=0;
			for(PeopleInfo pi:peoplelist)
			{
				if(count<limit)
				{
					if(sentEmailRepo.findByEmailId(pi.getEmail())==null)
					{
						if(sendEmailViaSES.sendEmail(sender, pi.getEmail(), subject, htmlcontent))
						{
							SentEmail sentEmail=new SentEmail();
							sentEmail.setEmailId(pi.getEmail());
							sentEmailRepo.save(sentEmail);
							count++;
						}
					}
				}
				else
					{
						return;	
					}
			}
 	   }
	  catch (Exception e) {
		
			System.out.println("Failed to send offer of the day");
		}
	}
		
		
}
