package com.the.affiliate.product.aws;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class AmazonSESSample {

    static final String FROM = "kundanthakur94@gmail.com";
    static final String FROMNAME = "kundan";
	
    static final String TO = "kundan@zwayam.com";
    
    static final String SMTP_USERNAME = "AKIA2EFKV7O5Y6YY4NJF";
    
    static final String SMTP_PASSWORD = "BKG04dd7CoIl9vDgjWcVJPxR5M8/Vl0SCspqs652VKPv";
    
    static final String CONFIGSET = "configset1";
    
    static final String HOST = "email-smtp.ap-south-1.amazonaws.com";
    
    static final int PORT = 587;
    
    static final String SUBJECT = "Amazon SES test (SMTP interface accessed using Java)";
    
    static final String BODY = String.join(
    	    System.getProperty("line.separator"),
    	    "<h1>Amazon SES SMTP Email Test</h1>",
    	    "<p>This email was sent with Amazon SES using the ", 
    	    "<a href='https://github.com/javaee/javamail'>Javamail Package</a>",
    	    " for <a href='https://www.java.com'>Java</a>."
    	);

    public static void main(String[] args) throws Exception {

    	Properties props = System.getProperties();
    	props.put("mail.transport.protocol", "smtp");
    	props.put("mail.smtp.port", PORT); 
    	props.put("mail.smtp.starttls.enable", "true");
    	props.put("mail.smtp.auth", "true");

    	Session session = Session.getDefaultInstance(props);

        MimeMessage msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(FROM,FROMNAME));
        msg.setRecipient(Message.RecipientType.TO, new InternetAddress(TO));
        msg.setSubject(SUBJECT);
        msg.setContent(BODY,"text/html");
        
        msg.setHeader("X-SES-CONFIGURATION-SET", CONFIGSET);
            
        Transport transport = session.getTransport();
                    
        try
        {
            System.out.println("Sending...");
            
            transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);
        	
            transport.sendMessage(msg, msg.getAllRecipients());
            System.out.println("Email sent!");
        }
        catch (Exception ex) {
            System.out.println("The email was not sent.");
            System.out.println("Error message: " + ex.getMessage());
        }
        finally
        {
            transport.close();
        }
    }
}