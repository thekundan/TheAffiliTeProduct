package com.the.affiliate.product.aws;


import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.the.affiliate.product.entity.SenderEmail;

@Service
public class AmazonSendEmailViaSES {

	
 public boolean sendEmail(SenderEmail sender,String to,String subject,String htmlbody) throws UnsupportedEncodingException, MessagingException
 {

	 boolean result=false;
 	Properties props = System.getProperties();
 	props.put("mail.transport.protocol", "smtp");
 	props.put("mail.smtp.port", sender.getPort()); 
 	props.put("mail.smtp.starttls.enable", "true");
 	props.put("mail.smtp.auth", "true");

 	Session session = Session.getDefaultInstance(props);

     MimeMessage msg = new MimeMessage(session);
     msg.setFrom(new InternetAddress(sender.getEmailID(),sender.getName()));
     msg.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
     msg.setSubject(subject);
     msg.setContent(htmlbody,"text/html");
     
     msg.setHeader("X-SES-CONFIGURATION-SET", sender.getConfigset());
         
     Transport transport = session.getTransport();
                 
     try
     {
         System.out.println("Sending...");
         
         transport.connect(sender.getSmtp(), sender.getUsername(), sender.getPassword());
     	
         transport.sendMessage(msg, msg.getAllRecipients());
         System.out.println("Email sent!");
         result=true;
     }
     catch (Exception ex) {
         System.out.println("The email was not sent.");
         System.out.println("Error message: " + ex.getMessage());
     }
     finally
     {
         transport.close();
     }
     return result;
 }
 
 public Session getssesession(SenderEmail sender)
 {
	 Properties props = System.getProperties();
	 	props.put("mail.transport.protocol", "smtp");
	 	props.put("mail.smtp.port", sender.getPort()); 
	 	props.put("mail.smtp.starttls.enable", "true");
	 	props.put("mail.smtp.auth", "true");

	 	Session session = Session.getDefaultInstance(props);

        return session;
 }
 public Transport getsseTransport(Session session,SenderEmail sender)
 {
	 try
	 {
		 Transport transport = session.getTransport();
		 transport.connect(sender.getSmtp(), sender.getUsername(), sender.getPassword());
		 return transport;
	 }
	 catch (Exception e) {return null;
	}
 }
 
 public boolean sendofferoftheday(Session session,Transport transport, MimeMessage msg)
 {

    boolean result=false;
 	try
     {
         System.out.println("Sending...");
         transport.sendMessage(msg, msg.getAllRecipients());
         System.out.println("Email sent!");
         result=true;
     }
     catch (Exception ex) {
         System.out.println("The email was not sent.");
         System.out.println("Error message: " + ex.getMessage());
     }
     
     return result;
 
	 
 }
}

