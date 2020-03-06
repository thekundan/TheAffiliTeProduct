$(document).ready(function(){

	if(localStorage.getItem("bestgotoken")!=null && localStorage.getItem("bestgotoken")!=undefined && localStorage.getItem("bestgotoken")!='')
	{
	   $.ajax({
		 type: "GET",
		 contentType : "application/json",
		 url : "/checkAuth/",
		 headers: {"Authorization": localStorage.getItem("bestgotoken")},
		 success: function (data)
			 {

			   document.getElementById("userinfoval").innerHTML ='<a style=" margin-left: 2%;FONT-SIZE: 124%;" id="usernameval" > welcome '+data+'</a><a class="flaticon-profile" style="color:red;margin-left: 4%;" href="#" onclick="logout()">LogOut</a>';
			 },
		 error: function (e)
			 {
				document.getElementById("productaddpanel").innerHTML="";
				document.getElementById("autherror").innerHTML =' <section class="product-filter-section"><div class="container"><div class="section-title" > <h2>Please Login to continue our services.</h2><a href="#" style="color: #301aa9; font-size: 109%;" onclick="Loginpage()">click here</a> <h2>To login</h2> </div></div></section>';
			}
		 });
	}
	else{
		document.getElementById("productaddpanel").innerHTML="";
		document.getElementById("autherror").innerHTML =' <section class="product-filter-section"><div class="container"><div class="section-title" > <h2>Please Login to continue our services.</h2><a href="#" style="color: #301aa9; font-size: 109%;" onclick="Loginpage()">click here</a> <h2>To login</h2> </div></div></section>';
         
	}
   });


function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

   return true;
}
	
$("#submitbutton").click(function (event) {
		
			  removemark();
			  $("#resultmsg").text("");
        	  var form = $('#fileUploadForm')[0];
			  var data = new FormData(form);
			  
			  
		            var companytype = document.getElementById("company");
                    var company = companytype.options[companytype.selectedIndex].value;
		            var categorytype = document.getElementById("category");
                    var category = categorytype.options[categorytype.selectedIndex].value;
					var subcategorytype = document.getElementById("subcategory");
                    var subcategory = subcategorytype.options[subcategorytype.selectedIndex].value;
					var sizechart = document.getElementById("sizechart");
					var productimage=form.elements.files.value;
					  var size = "";
					if(sizechart != undefined && sizechart != null)
                      size = sizechart.options[sizechart.selectedIndex].value;
				   var productname= document.getElementById("productname").value.trim();;
				   
					var linkdesc= document.getElementById("linkdesc").value.trim();;
			
					var OriginalPrice=document.getElementById("OriginalPrice").value.trim();;
					
					var OfferPrice=document.getElementById("OfferPrice").value.trim();
				
					var longdesc=document.getElementById("longdesc").value.trim();
					
					
					
					
				var alert="";
				var list = [];
				
						var error=false;

						if(parseInt(OriginalPrice)<parseInt(OfferPrice))
								{
									error=true;
									$("#OriginalPrice").css("border-color", "deeppink");
									$("#OfferPrice").css("border-color", "deeppink");
									alert+="Offer price shold be less or equal to Original Price.   ";
								}
						if(productimage=='')
								{
									error=true;
									$("#productimage").css("border-color", "deeppink");
									alert+="  Please select product image.";
								}
						if(company=='Affilate')
								{
								error=true;
							   $("#company").css("border-color", "deeppink");
								}
						if(category=='Category')
								{
								error=true;
							   $("#category").css("border-color", "deeppink");
								}
						if(subcategory=='subcatogory')
								{
								error=true;
							   $("#subcategory").css("border-color", "deeppink");
								}
					
						 if(productname=='')
								{
								error=true;
							   $("#productname").css("border-color", "deeppink");
								}
						if(linkdesc=='')
								{
								error=true;
							   $("#linkdesc").css("border-color", "deeppink");
								}
					   if(OriginalPrice=='')
								{
								error=true;
							   $("#OriginalPrice").css("border-color", "deeppink");
								}
						if(OfferPrice=='')
								{
								error=true;
							   $("#OfferPrice").css("border-color", "deeppink");
								}
					
						if(longdesc=='' || longdesc=='Please Provide Long Description.')
								{
								error=true;
							   $("#longdesc").css("border-color", "deeppink");
								}
		
		
			  
			  
			if (!error ) {
				
				   data.append("affiliatewebsite", company);
				   data.append("category", category);
				   data.append("subcategory",subcategory );
				   data.append("size", size);
				   data.append("name", productname);
				   data.append("origprice", OriginalPrice);
				   data.append("offerprice", OfferPrice);
				   data.append("weblink", linkdesc);
				   data.append("longdescription", longdesc);
				   data.append("featurelist", list);
				   document.getElementById("addsubmit").innerHTML =' <button class="site-btn submit-order-btn" id="submitbutton" style=" width: 92%;"> <i class="fa fa-refresh fa-spin"></i> Please wait while we are adding your product</button>';
				    addYourProduct(data);
			}
			
			else
			   $("#resultmsg").text(alert);
			
	});	

function addYourProduct(data)
{
	 	 $.ajax({
				
					 type: "POST",
                     enctype: 'multipart/form-data',
					 url : "/AddyourProduct",
					 headers: {"Authorization": localStorage.getItem("bestgotoken")},
					 data: data,
					 processData: false, 
                    contentType: false,
					cache: false,
					timeout: 600000,
		success: function () 
		              {
						$.notify("your product successfully added.", "success");
						setTimeout(pageRedirect("yourproduct.html"), 3000);
						
					  },
        error: function (e) {
             $("#result").text("Something went wrong");
		 }
	});

}
function removemark()
{
	   $("#productimage").css("border-color", "");
	   $("#category").css("border-color", "");
	   $("#longdesc").css("border-color", "");
	   $("#OfferPrice").css("border-color", "");
	   $("#OriginalPrice").css("border-color", "");
	   $("#linkdesc").css("border-color", "");
	   $("#subcategory").css("border-color", "");
	   $("#company").css("border-color", "");
	   $("#productname").css("border-color", "");
}

$(function() {
    $("#choosegender").change(function() {
		
		var category=$('option:selected', this).text() ;
		
		alert(category)
		
		    });
});

 
 $(function() {
    $("#subcategory").change(function() {
		
	         	$("#selectsize").html('');
				var subcategory=$('option:selected', this).text() ;
				
				
				var flag=false;
				
				var size='<select id="sizechart" name="field2" class="field-style field-split align-right" style="width: 62%; border-radius: 21%; "><option value="size">Select  Size</option>';
				
				if(subcategory=='Baby Clothing' || subcategory=='Baby Shoes')  
				{
							  size+=  '<option value="All">All size</option>'+
							           '<option value="Preemie">Preemie</option>'+
							           '<option value="Newborn">Newborn</option>'+
										'<option value="0 to 3 months">0 to 3 months</option>'+
										'<option value="3 to 6 months">3 to 6 months</option>'+
										'<option value="6 to 9 months">6 to 9 months</option>'+
										'<option value="0 to 9 months">0 to 9 months</option>'+
										'<option value="12 months	">12 months</option>'+
										'<option value="18 months	">18 months</option>'+
										'<option value="24 months">24 months</option>';
										flag=true;
				}
				if(subcategory=='Shirts'  || subcategory=='Fashion Hoodies & Sweatshirts' || subcategory=='Sweaters' || subcategory=='Jackets Suits &  Sport Coats'  || subcategory=='T-Shirts & Tanks'   || subcategory=='Tops, Tees & Blouses'   ||  subcategory=='Fashion Hoodies & Sweatshirts'   || subcategory=='Coats, Jackets & Vests'  ||   subcategory=='Suiting & Blazers'  ||  subcategory=='Sweaters')  
				{
							  size+=    '<option value="All">All size</option>'+   
							            '<option value="XS">XS</option>'+
										'<option value="S">S</option>'+
										'<option value="M">M</option>'+
										'<option value="L">L</option>'+
										'<option value="XL">XL</option>';
											flag=true;
				}
				
				if(subcategory=='Jeans'  || subcategory=='Pants' || subcategory=='Shorts'  || subcategory=='Capris'  )  
				{
							  size+=   '<option value="All">All size</option>'+
							            '<option value="24">24</option>'+
										'<option value="25">25</option>'+
										'<option value="26">26</option>'+
										'<option value="27">27</option>'+
										'<option value="28">28</option>'+
										'<option value="29">29</option>'+
										'<option value="30">30</option>'+
										'<option value="32">32</option>'+
										'<option value="33">33</option>'+
										'<option value="34">34</option>'+
										'<option value="36">36</option>'+
										'<option value="38">38</option>'+
										'<option value="40">40</option>'+
										'<option value="42">42</option>'+
										'<option value="38">38</option>'+
										'<option value="44">44</option>';
											flag=true;
					}
			 if(subcategory=='Athletic Shoes Accessorie' || subcategory=='Boys' || subcategory=='Girls'  || subcategory=='Men' ||  subcategory=='Women'  )  
				{
							   size+=   '<option value="All">All size</option>'+
							            '<option value="4">4</option>'+
										'<option value="4.5">4.5</option>'+
										'<option value="5">5</option>'+
										'<option value="5.5">5.5</option>'+
										'<option value="6">6</option>'+
										'<option value="6.5">6.5</option>'+
										'<option value="7">7</option>'+
										'<option value="7.5">7.5</option>'+
										'<option value="8">8</option>'+
										'<option value="8.5">8.5</option>'+
										'<option value="9">9</option>'+
										'<option value="9.5">9.5</option>'+
										'<option value="10">10</option>'+
										'<option value="11">11</option>'+
										'<option value="11.5">11.5</option>'+
										'<option value="12">12</option>'+
										'<option value="13">13</option>'+
										'<option value="14">14</option>'+
										'<option value="15">15</option>'+
										'<option value="16">16</option>';
											flag=true;
				}
					
				
               if(flag)
			   {
				   size+="</select>";
				   	$("#selectsize").html(size);
			   }

		
 
        });
    });    
 
 $(document).ready(function(){
        $(".add-row").click(function(){
			
			   $("#FeatureName").css("border-color", "");
			   $("#FeatureValue").css("border-color", "");
			
			var FeatureName = $("#FeatureName").val().trim();
            var FeatureValue = $("#FeatureValue").val().trim();
			
					if(FeatureName != undefined  && FeatureName.length != 0  && FeatureValue != undefined  && FeatureValue.length != 0)
					{
						 var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + FeatureName + "</td><td>" + FeatureValue + "</td></tr>";
					}
				   else
				   {
					   if(FeatureName == undefined  || FeatureName.length == 0 )
					   $("#FeatureName").css("border-color", "deeppink");
				       if(FeatureValue == undefined  || FeatureValue.length == 0)
					   $("#FeatureValue").css("border-color", "deeppink");
					 
				   }
            $("table tbody").append(markup);
        });
        
        $(".delete-row").click(function(){
            $("table tbody").find('input[name="record"]').each(function(){
            	if($(this).is(":checked")){
                    $(this).parents("tr").remove();
                }
            });	
        });
    });    
	
	
$(function() {
    $("#category").change(function() {
		
		$("#selectsize").html('');
		
		var subcatogory='<option value="subcatogory">Select  Sub-Category</option>';
		
		var category=$('option:selected', this).text() ;

	
		   if(category=="Jewellery")
		  {
				  subcatogory+=        '<option value="Earrings">Earrings</option>'+
										'<option value="ChainsNecklaces">Chains & Necklaces</option>'+
										'<option value="BanglesBracelets">Bangles & Bracelets</option>'+
										'<option value="Rings">Rings</option>'+
										'<option value="Pendants">Pendants</option>'+
										'<option value="MangalsutrasTanmaniyas">Mangalsutras & Tanmaniyas</option>'+
										'<option value="NoseRingsPins">Nose Rings & Pins</option>'+
										'<option value="HairAccessories">Hair Accessories</option>'+
										'<option value="ToeRings">Toe Rings</option>'+
										'<option value="Anklets">Anklets</option>'+
										'<option value="BodyJewellery">Body Jewellery</option>'+
										'<option value="BroochesPins">Brooches & Pins</option>'+
										'<option value="BeadsCharms">Beads & Charms</option>'+
										'<option value="CoinsBars">Coins & Bars</option>'+
										'<option value="LooseGemstonesDiamonds">Loose Gemstones & Diamonds</option>';
			  
		  }
		   if(category=="Luggage & Bags")
		  {
				subcatogory+=            
				                       '<option value="Bags & Backpacks">Bags & Backpacks</option>'+
										'<option value="Luggage">Luggage</option>'+
										'<option value="Wallets, Card Cases & Money Organizers">Wallets, Card Cases & Money Organizers</option>'+
										'<option value="Travel Accessories">Travel Accessories</option>'+
										'<option value="Handbags & Clutches">Handbags & Clutches</option>'+
										'<option value="Shopping Bags & Baskets">Shopping Bags & Baskets</option>';
		  }
		   if(category=="Shoes")
		  {
					subcatogory+=         '<option value="Athletic Shoes Accessories">Athletic Shoes Accessories</option>'+
											'<option value="Boys">Boys</option>'+
											'<option value="Girls">Girls</option>'+
											'<option value="Men">Men</option>'+
											'<option value="Women">Women</option>';
		  }
		     if(category=="Watches")
		  {
					subcatogory+=        
					           '<option value="Wrist Watches">Wrist Watches</option>'+
											'<option value="Watch Bands">Watch Bands</option>'+
											'<option value="Pocket Watches">Pocket Watches</option>'+
											'<option value="Smart Watches">Smart Watches</option>';
		  }
		  if(category=="Electronics")
		  {
			  
					subcatogory+=        
					                    '<option  value="Cameras & Photography">Cameras & Photography</option>'+
										'<option  value="Car & Vehicle Electronics">Car & Vehicle Electronics</option>'+
										'<option value="GPS & Accessories">GPS & Accessories</option>'+
										'<option value="Headphones">Headphones</option>'+
										'<option value="HomeAudio">Home Audio</option>'+
										'<option value="Home Theater, TV & Video">Home Theater, TV & Video</option>'+
										'<option value="PortableMediaPlayers">Portable Media Players</option>'+
										'<option value="Telephones & Accessories">Telephones & Accessories</option>'+
										'<option value="Wearable Technology" >Wearable Technology</option>';
		  }
		
		  if(category=="Computers & Accessories")
			{
				   subcatogory+='<option  value="Accessories & Peripherals">Accessories & Peripherals</option>'+
										'<option  value="Components">Components</option>'+
										'<option value="Desktops">Desktops</option>'+
										'<option value="External Devices & Data Storage">External Devices & Data Storage</option>'+
										'<option value="Laptops">Laptops</option>'+
										'<option value="Monitors">Monitors</option>'+
										'<option value="Networking Devices">Networking Devices</option>'+
										'<option value="Printers, Inks & Accessories">Printers, Inks & Accessories</option>'+
										'<option value="Scanners" >Scanners</option>'+
										'<option value="Tablets">Tablets</option>';
			}
		
		  if(category=="Men's Clothing & Accessories")
			{
					   subcatogory+=        '<option  value="Clothing Sets">Clothing Sets</option>'+
											'<option  value="Shirts">Shirts</option>'+
											'<option value="Fashion Hoodies & Sweatshirts">Fashion Hoodies & Sweatshirts</option>'+
											'<option value="Sweaters">Sweaters</option>'+
											'<option value="Jackets & Coats">Jackets & Coats</option>'+
											'<option value="Jeans">Jeans</option>'+
											'<option value="Pants" >Pants</option>'+
											'<option value="Shorts">Shorts</option>'+
											'<option value="Swim">Swim</option>'+
											'<option value="Suits & Sport Coats">Suits & Sport Coats</option>'+
											'<option value="Underwear">Underwear</option>'+
											'<option value="Socks">Socks</option>'+
											'<option value="Sleep & Lounge">Sleep & Lounge</option>'+
											'<option value="T-Shirts & Tanks">T-Shirts & Tanks</option>'+
											'<option value="Sports">Sports</option>';
									
			}
		
			if(category=="Women's Clothing & Accessories")
			{
						subcatogory+=       '<option value=""><b>WoMens</b></option>'+
											'<option value="Tops, Tees & Blouses">Tops, Tees & Blouses</option>'+
											'<option value="Fashion Hoodies & Sweatshirts">Fashion Hoodies & Sweatshirts</option>'+
											'<option value="Jeans">Jeans</option>'+
											'<option value="Pants & Capris">Pants & Capris</option>'+
											'<option value="Shorts">Shorts</option>'+
											'<option value="Swimsuits & Cover Ups">Swimsuits & Cover Ups</option>'+
											'<option value="Lingerie, Sleep & Lounge">Lingerie, Sleep & Lounge</option>'+
											'<option value="Jumpsuits, Rompers & Overalls">Jumpsuits, Rompers & Overalls</option>'+
											'<option value="Coats, Jackets & Vests">Coats, Jackets & Vests</option>'+
											'<option value="Suiting & Blazers">Suiting & Blazers</option>'+
											'<option value="Socks & Hosiery">Socks & Hosiery</option>'+
											'<option value="Clothing Sets">Clothing Sets</option>'+
											'<option value="Dresses">Dresses</option>'+
											'<option value="Skirts & Skorts">Skirts & Skorts</option>'+
											'<option value="Sweaters">Sweaters</option>'+
											'<option value="Leggings">Leggings</option>'+
											'<option value="Underwear">Underwear</option>';
				
			}
		
		
		if(category=="Baby")
		{
			subcatogory+='<option value="Baby Care">Baby Care</option>'+
								   ' <option value="=Baby Clothing">Baby Clothing</option>'+
									'<option value="Baby Safety">Baby Safety</option>'+
									'<option value="Baby Shoes">Baby Shoes</option>'+
									'<option value="Car Seats  Accessories">Car Seats  Accessories</option>'+
									'<option value="Diapering & Nappy Changing">Diapering & Nappy Changing</option>'+
									'<option value="Feeding">Feeding</option>'+
									'<option value="Gift Packs">Gift Packs</option>'+
									'<option value="Maternity">Maternity</option>'+
									'<option value="Pacifiers & Teethers">Pacifiers & Teethers</option>'+
									'<option value="PottyTraining  & StepStools">PottyTraining  & StepStools</option>'+
								   '<option value="Strollers, Buggies & Prams">Strollers, Buggies & Prams</option>';
		}
		
		if(category=="Beauty")
		{
			   subcatogory+=' <option value="=Luxury Beauty">Luxury Beauty</option>'+
									'<option value="Make-up & Nails">Make-up & Nails</option>'+
									'<option value="Skin Care">Skin Care</option>'+
									'<option value="Hair Care">Hair Care</option>'+
									'<option value="Bath Body">Bath Body</option>'+
									'<option value="Fragrance">Fragrance</option>'+
									'<option value="Tools Accessories">Tools Accessories</option>'+
									'<option value="Mens Grooming">Mens Grooming</option>';
		}
		if(category=="Books")
		{
			      subcatogory+='<option value="ArtsFilmPhotography">Arts, Film &amp; Photography</option>'+
										'<option value="BiographiesDiariesTrueAccounts">Biographies, Diaries &amp; True Accounts</option>'+
										'<option value="Economics">Business &amp; Economics</option>'+
										'<option value="Young Adult">Childrens &amp; Young Adult</option>'+
										'<option value="DigitalMedia">Computing, Internet &amp; Digital Media</option>'+
										'<option value="Lifestyle">Crafts, Home &amp; Lifestyle</option>'+
										'<option value="Personal Development">Health, Family &amp; Personal Development</option>'+
										'<option value="Humour">Humour</option>'+
										'<option value="LinguisticsWriting">Language, Linguistics &amp; Writing</option>'+
										'<option value="LiteratureFiction">Literature &amp; Fiction</option>'+
										'<option value="Politics">Politics</option>'+
										'<option value="Reference">Reference</option>'+
										'<option value="Religion">Religion</option>'+
										'<option value="SciencesTechnologyMedicine">Sciences, Technology &amp; Medicine</option>'+
										'<option value="SocietySocialSciences">Society &amp; Social Sciences</option>'+
										'<option value="Sports">Sports</option>'+
										'<option value="Travel">Travel</option>'+
										'<option value="ActionAdventure">Action &amp; Adventure</option>'+
										'<option value="ComicsMangas">Comics &amp; Mangas</option>'+
										'<option value="CrimeThrillerMystery">Crime, Thriller &amp; Mystery</option>'+
										'<option value="FantasyHorrorScienceFiction">Fantasy, Horror &amp; Science Fiction</option>'+
										'<option value="HistoricalFiction">Historical Fiction</option>'+
										'<option value="Romance">Romance</option>'+
										'<option value="MapsAtlases">Maps &amp; Atlases</option>'+
										'<option value="ExamPreparation">Exam Preparation</option>'+
										'<option value="History">History</option>'+
										'<option value="Law">Law</option>'+
										'<option value="TextbookStudyGuides">Textbooks &amp; Study Guides</option>';
		}
		
		
		$("#subcategory").html(subcatogory);
	
		
    });
});

function pageRedirect(page) {
	window.location.replace(page);
	
	} 

	function Loginpage()
  {
    window.location.replace("user.html");
  }