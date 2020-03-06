package com.the.affiliate.product.service;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.the.affiliate.product.aws.EntryPointS3;
import com.the.affiliate.product.entity.AwsS3cred;
import com.the.affiliate.product.entity.FeatureList;
import com.the.affiliate.product.entity.Product;
import com.the.affiliate.product.helper.ProductHelper;
import com.the.affiliate.product.repository.AwsS3credRepo;
import com.the.affiliate.product.repository.ProductRepo;


@Service
public class AddProductService {
	
	@Autowired
	ProductRepo productRepo;
	 
	  
	@Autowired
	EntryPointS3 entryPointS3;
	
	@Autowired
	AwsS3credRepo awsS3credRepo;
	
	@Value("${app.uploadfolder}")
	 private  String uploadfolder;
	
	@Value("${app.catche}")
	 private  String catche ;
	
	 Pageable pageable = PageRequest.of(0, 8);
	

	public boolean addyourproduct(String weblink,String usedid,String imagename,String affiliatewebsite,String category,String subcategory,String size,String name,String origprice,String offerprice,String longdescription,List<String> featurelist)
	{
		try
		{
			
			Product product=new Product();
			product.setUrl(savetos3(imagename,500, 775));
			product.setAffiliatewebsite(affiliatewebsite);
			product.setWeblink(weblink);
			product.setCategory(category);
			product.setLongdescription(longdescription);
			product.setName(name);
			product.setOfferprice(offerprice);
			product.setOrigprice(origprice);
			product.setSize(size);
			product.setUserid(usedid);
			product.setSubcategory(subcategory);
			product.setId(ProductHelper.generateUniqueId());
			product.setImagename(imagename);
			product.setApproved(true);
			product.setIsactive(true);
			product.setEntrydate(new Date());
			List<FeatureList> list=new ArrayList<>();
			LinkedHashSet<String> userfeature=new LinkedHashSet<>();
			for(String feat:featurelist)
				userfeature.add(feat);
			for(String feat:userfeature)
			{
				String[] arr=feat.split("--");
				FeatureList features=new FeatureList();
				features.setFeaturename(arr[0]);
				features.setFeaturevalue(arr[1]);
				features.setId(ProductHelper.generateUniqueId());
				list.add(features);
			}
			product.setFeaturelist(list);
			productRepo.save(product);
			return true;
		}
		
		catch (Exception e) {
			return false;
		}
		
	}
   public String addproductimage(MultipartFile[] uploadfile)
   {
	   try {
   
		   String imagename=ProductHelper.generateUniqueId()+"";
			  
     	  byte[] bytes = uploadfile[0].getBytes();
           Path path = Paths.get(catche + uploadfile[0].getOriginalFilename());
           Files.write(path, bytes);

           Path filepath = Paths.get(catche, imagename+".jpg");
           OutputStream os = Files.newOutputStream(filepath);
               os.write(uploadfile[0].getBytes());
               os.close();
           return imagename;

     } catch (IOException e) {
    	 return "";
        
     }
	 }


   private static BufferedImage resize(BufferedImage originalImage, int type, int IMG_WIDTH, int IMG_HEIGHT) {
	   BufferedImage resizedImage = new BufferedImage(IMG_WIDTH, IMG_HEIGHT, type);
	    Graphics2D g = resizedImage.createGraphics();
	    g.drawImage(originalImage, 0, 0, IMG_WIDTH, IMG_HEIGHT, null);
	    g.dispose();

	    return resizedImage;
   }

   public List<Product> getyourproct(String id,int page)
   {
	   return productRepo.findByUserid(id,PageRequest.of(page, 8,Sort.by("entrydate").descending()));
   }
   public Product getsingleyourproct(int id)
   {
	   return productRepo.findById(id);
   }
   
   public boolean deactivateYourProduct(int id)
   {
	   try
	   {
		   Product product=productRepo.findById(id);
		   product.setIsactive(false);
		   productRepo.save(product);
	   }
	   catch (Exception e) {
		
	     }
	 
	   return true;
   }
   
   public boolean activateYourProduct(int id)
   {
	   try
	   {
		   Product product=productRepo.findById(id);
		   product.setIsactive(true);
		   productRepo.save(product);
	   }
	   catch (Exception e) {
		
	     }
	 
	   return true;
   }
   
	public String savetos3(String imagename,int width,int height) 
	{
		try
		{
			 BufferedImage originalImage = ImageIO.read(new File(catche+imagename+".jpg"));
			 int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();

		        BufferedImage resizeImageJpg = resize(originalImage, type, width, height);
		        ImageIO.write(resizeImageJpg, "jpg", new File(uploadfolder+ imagename+".jpg")); 

			   }
		catch(Exception e)
		{
		//System.out.println("");
		}
		try
		{
			AwsS3cred awsS3cred=awsS3credRepo.findByIsactive(true);
			 File file = new File(catche+imagename+".jpg");
			   if( file.exists())
			      return entryPointS3.savefileintos3(file,awsS3cred);
			   else
			   {
				   file = new File(uploadfolder+imagename+".jpg");
				   return entryPointS3.savefileintos3(file,awsS3cred);
			   }
		}
		catch (Exception e) {
			return "";
		}
		
		
	}
}
