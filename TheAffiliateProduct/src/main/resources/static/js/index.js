$(document).ready(function(){


   var queryString = window.location.search;
   if(queryString!=null && queryString!=undefined && queryString!='')
   singleproduct(queryString.replace("?", ""));
  else
   yourproducts();
   
  });



  function Forwardedproducts(data)
  {
    document.getElementById("productmsg").innerHTML ='';
      $.ajax({
              type: "GET",
              contentType : "application/json",
              url : "/getForwardedproduct/",
              dataType : "json",
              timeout: 600000,
      success: function (data)
                  {
                      if (data.length>0) {   
                          showForwardedproduct(data);
                      }
                      else {
                        var msg=  "<p style='font-size: 33px;color: #a57373;line-height: 2.6;smargin-left: 31%;'>Something went wrong.</p>";
                        document.getElementById("productmsg").innerHTML =msg;
                      }
                  },
      error: function (e)
                  {
            
                  }
          });
  }


function showForwardedproduct(data)
{

}

 
 function yourproducts()
     {
       document.getElementById("productmsg").innerHTML ='';
         $.ajax({
                 type: "GET",
                 contentType : "application/json",
                 url : "/getproductpage/0",
                 dataType : "json",
                 timeout: 600000,
         success: function (data)
                     {
                         if (data.length>0) {   
                           localStorage.propageno= 1;
                             showproduct(data);
                         }
                         else {
                           var msg=  "<p style='font-size: 33px;color: #a57373;line-height: 2.6;smargin-left: 31%;'>We don't have any product in this section.Please try out another section.</p>";
                           document.getElementById("productmsg").innerHTML =msg;
                         }
                     },
         error: function (e)
                     {
                 
                     }
             });
     }
     function showmoreproduct()
     {
       document.getElementById("productmsg").innerHTML ='';
      $.ajax({
               type: "GET",
               contentType : "application/json",
               url : "/getproductpage/"+localStorage['propageno'],
               dataType : "json",
               timeout: 600000,
       success: function (data)
                   {
                       if (data.length>0) { 
                        
                         loadproduct(data);
                       }
                       else {
                         document.getElementById("productmsg").innerHTML ="We don't have more product";
                       }
                   },
       error: function (e)
                   {
                 
                   }
           });
           
 
     }
 function loadproduct(data)
 {
    document.getElementById("productsection").innerHTML ='';
   var product='';
   localStorage.propageno= parseInt(localStorage['propageno'])+1;  
        for(var i = 0; i < data.length; i++) 
        {
          var name=data[i].name;
          if(name.length>45)
          {
             name = name.substring(0, 41);
             name=name+" ...."
             
          }
         product+=   '<div class="col-lg-3 col-sm-6"><div class="product-item" onclick=singleproduct('+data[i].id+') id="productitem"> <div class="pi-pic">';
 
                     if(data[i].isactive==true)
                          product+= '<div class="tag-active">Available</div>';
                     else
                          product+= '<div class="tag-deactive">Deactive</div>';
 
                    if(data[i].tag!=null)
                          product+= '<div class="tag-offerofthedaya">'+data[i].tag+'</div>';
                    
 
 
                    product+= '<img src="'+data[i].url+'" alt="" width="500" height="333"> <div class="pi-links">'+
                     '<a style="border-radius: 39%;border-color: black;background-color: black; color: cornflowerblue;width: 38%;" href ='+data[i].weblink+'   target="_" >Buy Now</a>'+
                     '</div> </div> <div class="pi-text"> <h6>&#x20b9; '+data[i].offerprice+'</h6> <p  style="color: #022846;">'+name+' </p> </div> </div> </div></div>';
         }
       
        var previouspro=document.getElementById("productsyour").innerHTML
        previouspro=previouspro+product;
        document.getElementById("productsyour").innerHTML =previouspro;
 }
 
     function showproduct(data)
     {
       document.getElementById("productsection").innerHTML ='';
        var product='';
 
        for(var i = 0; i < data.length; i++) 
        {
          var name=data[i].name;
          if(name.length>45)
          {
             name = name.substring(0, 41);
             name=name+" ...."
             
          }
         product+=   '<div class="col-lg-3 col-sm-6"><div class="product-item" onclick=singleproduct('+data[i].id+') id="productitem"> <div class="pi-pic">';
                     if(data[i].isactive==true)
                         product+= '<div class="tag-active">Available</div>';
                     else
                           product+= '<div class="tag-deactive">Deactive</div>';
 
                     if(data[i].tag!=null)
                           product+= '<div class="tag-offerofthedaya">'+data[i].tag+'</div>';
 
                     product+= '<img src="'+data[i].url+'" alt="" width="500" height="333"> <div class="pi-links">'+
                     '<a style="border-radius: 39%;width: 38%;border-color: black;background-color: black; color: cornflowerblue;" href ='+data[i].weblink+'    target="_" >Buy Now</a>'+
                     '</div> </div> <div class="pi-text"> <h6>&#x20b9; '+data[i].offerprice+'</h6> <p  style="color: #022846;" >'+name+' </p> </div> </div> </div></div>';
        }
      
        
        document.getElementById("showmoreproduct").innerHTML='<button class="site-btn sb-line sb-dark" style="background-color: #3774e4;color: #ffffff;" onclick="showmoreproduct()" >LOAD MORE</button>';
        document.getElementById("productsyour").innerHTML =product;
    
     }
 
     function singleproduct(id)
     {
       document.getElementById("productmsg").innerHTML ='';
       $.ajax({
         type: "GET",
         contentType : "application/json",
         url : "/getsingleproductcont/"+id,
         dataType : "json",
         timeout: 600000,
         success: function (data)
                     {
                       var product='<div class="container"><div class="row"><div class="col-lg-6"><img class="product-big-img" src="'+data.url+'" alt="" width="600" height="850"></div>'+
                       '<div class="col-lg-6 product-details"><h2 class="p-title">'+data.name+'</h2>'+
                       '<h3 class="p-price">Offer Price  : &#x20b9;  '+data.offerprice+'</h3><h3 class="p-price">Orignal Price : &#x20b9; '+data.origprice+'</h3> <h3 class="p-price">Affiliate Website : '+data.affiliatewebsite+'</h3>'+
                       '<h4 class="p-stock">Available: <span>In Stock</span></h4>	';
                       if(data.isactive==true)
                          product+= '<a style="background: #6ad807;" href="'+data.weblink+'"  target="_blank" class="site-btn">BUY NOW</a>';
                       else
                         product+= '<a style="background-color: aqua;" onclick="activateproduct('+data.id+')" class="site-btn">ACTIVATE</a>';
 
                         product+= '<div id="accordion" class="accordion-area"><div class="panel">	<div class="panel-header" id="headingOne">'+
                       '<button class="panel-link active" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">information</button>'+
                       '</div>	<div id="collapse1" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion"><div class="panel-body"><p>'+data.longdescription+'</p></div></div></div></div>	';
                   
                       document.getElementById("productsection").innerHTML =product;
                       window.scrollBy(0, -10000);
                       
                     },
         error: function (e)
                     {
                
                     }
             });
                      
            
               
         }
 
 function productshowcasebookc(data)
{
   var url="";
   if(data!='')
      url ="/getproductbycatsubcat/Books/"+data;
   else
      url ="/getproductbycategory/Books";
         localStorage.itemlink= '';
       
      itempaginationmapping(url);
}

function productshowcaseJewellery(data)
{
   var url="";
   if(data!='')
      url ="/getproductbycatsubcat/Jewellery/"+data;
   else
      url ="/getproductbycategory/Jewellery";
         localStorage.itemlink= '';
       
      itempaginationmapping(url);
}



 function productshowcasebabyc(data)
 {
   var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Baby/"+data;
    else
       url ="/getproductbycategory/Baby";
          localStorage.itemlink= '';
        
       itempaginationmapping(url);
     
 }
 function productshowcasemakeup(data)
 {
   var url="";
   if(data!='')
      url ="/getproductbycatsubcat/Beauty/"+data;
   else
      url ="/getproductbycategory/Beauty";
      localStorage.itemlink= '';
    
      itempaginationmapping(url);
 
 }
 function productshowcasewatch(data)
 {
    var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Watches/"+data;
    else
       url ="/getproductbycategory/Watches";
       localStorage.itemlink= '';
   
       itempaginationmapping(url);
 
 
 }
 function productshowcasebags(data)
 {
    var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Luggage & Bags/"+data;
    else
       url ="/getproductbycategory/Luggage & Bags";
       localStorage.itemlink= '';
   
       itempaginationmapping(url);
 
 }
 function productshowcaseshoes(data)
 {
    var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Shoes/"+data;
    else
       url ="/getproductbycategory/Shoes";
       localStorage.itemlink= '';
   
       itempaginationmapping(url);
 
 }
 function productshowcasecompter(data)
 {
    var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Computers & Accessories/"+data;
    else
       url ="/getproductbycategory/Computers & Accessories";
       localStorage.itemlink= '';
   
       itempaginationmapping(url);
 
 }
 function productshowcaseelectonics(data)
 {
    var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Electronics/"+data;
    else
       url ="/getproductbycategory/Electronics";
       localStorage.itemlink= '';
   
       itempaginationmapping(url);
 
 }
 function productshowcasemen(data)
 {
    var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Men's Clothing & Accessories/"+data;
    else
       url ="/getproductbycategory/Men's Clothing & Accessories";
       localStorage.itemlink= '';
   
       itempaginationmapping(url);
 
 }
 function productshowcasewomen(data)
 {
    var url="";
    if(data!='')
       url ="/getproductbycatsubcat/Women's Clothing & Accessories/"+data;
    else
       url ="/getproductbycategory/Women's Clothing & Accessories";
       localStorage.itemlink= '';
   
       itempaginationmapping(url);
 }
 
 
 
 
 
 function itempaginationmapping(link)
 {
    if(link!=null && link!=undefined)
    {
       if(localStorage.getItem("itemlink")!=null && localStorage.getItem("itemlink")!=undefined && localStorage.getItem("itemlink")!='')
       {
                              localStorage.itemlink= link;
                              localStorage.itempage= 0;
       }
       else
       {
          if(localStorage.getItem("itemlink")==link)
          {
             localStorage.itempage= parseInt(localStorage['itempage'])+1;  
          }
          else
          {
             localStorage.itemlink= link;
             localStorage.itempage= 0;
          }
    
       }
    }
    else{
       localStorage.itempage= parseInt(localStorage['itempage'])+1; 
    }
    
    showitems();
 }
 
 
 function showitems()
 {
    document.getElementById("productmsg").innerHTML ='';
  $.ajax({
           type: "GET",
           contentType : "application/json",
           url : localStorage['itemlink']+"/"+localStorage['itempage'],
           dataType : "json",
           timeout: 600000,
   success: function (data)
               {
                   if (data.length>0) { 
                    
                      loadpitems(data);
                   }
                   else {
                   
                     if(parseInt(localStorage['itempage'])==0)
                           document.getElementById("productsyour").innerHTML ="<p style='font-size: 22px; color: #ea4545;line-height: 1.6;'>Now We don't have any product in this section.Please try out another section.";
                     else      
                           document.getElementById("productmsg").innerHTML ="We don't have more product.";

                       

                 //var msg=  "<p style='font-size: 18px;color: #f30000;'>We don't have more product in this section.Please try out another section. </p>";
                   //document.getElementById("productmsg").innerHTML =msg;
                    
                   }
               },
   error: function (e)
               {
             
               }
       });
    
 }
 function loadpitems(data)
 {
    document.getElementById("productsection").innerHTML ='';
   var product='';
        for(var i = 0; i < data.length; i++) 
        {
          var name=data[i].name;
          if(name.length>45)
          {
             name = name.substring(0, 41);
             name=name+" ...."
             
          }
         product+=   '<div class="col-lg-3 col-sm-6"><div class="product-item"  onclick=singleproduct('+data[i].id+') id="productitem"> <div class="pi-pic">';
 
                     if(data[i].isactive==true)
                     product+= '<div class="tag-active">Available</div>';
                          
                     else
                          product+= '<div class="tag-deactive">Deactive</div>';
 
                    if(data[i].tag!=null)
                          product+= '<div class="tag-offerofthedaya">'+data[i].tag+'</div>';
                    
 
 
                    product+= '<img src="'+data[i].url+'" alt="" width="500" height="333"> <div class="pi-links">'+
                     '<a style="border-radius: 39%;width: 38%;border-color: black;background-color: black; color: cornflowerblue;" href ='+data[i].weblink+'    target="_" >Buy Now</button>'+
                     '</div> </div> <div class="pi-text"> <h6>&#x20b9; '+data[i].offerprice+'</h6> <p style="color: #022846;">'+name+' </p> </div> </div> </div></div>';
         }
       
         if(parseInt(localStorage['itempage'])!=0)
         {
          var previouspro=document.getElementById("productsyour").innerHTML;
          previouspro=previouspro+product;
          document.getElementById("productsyour").innerHTML =previouspro;
   
         }
         else
         {
          document.getElementById("productsyour").innerHTML =product;
         }
        var link=localStorage['itemlink'];
        document.getElementById("showmoreproduct").innerHTML='<button class="site-btn sb-line sb-dark" style="background-color: #3774e4;color: #ffffff;" onclick="itempaginationmapping()" >LOAD MORE</button>';
 }
 
 function searchproduct()
 {
    var searchitem=document.getElementById("searchid").value;
  var error=false;
    if(searchitem=='')
    {
    error=true;
    $("#searchid").css("border-color", "deeppink");
    }
    else
    {
       $("#searchid").css("border-color", "");
    }
    
    if(!error)
    {
       localStorage.searchpage= 0;
       showsearchitems()
    }
 }
 
 
 
 
 function showsearchitems()
 {
    document.getElementById("productmsg").innerHTML ='';
    var searchitem=document.getElementById("searchid").value;
    var msg="";
  $.ajax({
           type: "GET",
           contentType : "application/json",
           url : "/searchtext/"+searchitem+"/"+localStorage['searchpage'],
           dataType : "json",
           timeout: 600000,
   success: function (data)
               {
                   if (data.length>0) { 
                    
                      loadsearchitems(data);
                   }
                   else {
                     
                      if(parseInt(localStorage['searchpage'])==0)
                      {
                        document.getElementById("productsyour").innerHTML ='';
                        document.getElementById("productmsg").innerHTML ="We don't have product with this keyword,Please try another keyword.";
                      }
                      else
                      {
                        document.getElementById("productmsg").innerHTML = "We don't have more collection ,Please try another product.";
                      }
                     
                   }
               },
   error: function (e)
               {
           
               }
       });
      
       document.getElementById("productmsg").innerHTML =msg;
 }
 function loadsearchitems(data)
 {
   
    document.getElementById("productsection").innerHTML ='';
   var product='';
        for(var i = 0; i < data.length; i++) 
        {
          var name=data[i].name;
          if(name.length>45)
          {onclick=singleproduct('+data[i].id+')
             name = name.substring(0, 41);
             name=name+" ...."
             
          }
         product+=   '<div class="col-lg-3 col-sm-6"><div class="product-item" onclick=singleproduct('+data[i].id+')  id="productitem"> <div class="pi-pic">';
 
                     if(data[i].isactive==true)
                          product+= '<div class="tag-active">Available</div>';
                     else
                          product+= '<div class="tag-deactive">Deactive</div>';
 
                    if(data[i].tag!=null)
                          product+= '<div class="tag-offerofthedaya">'+data[i].tag+'</div>';
                    
 
 
                    product+= '<img src="'+data[i].url+'" alt="" width="500" height="333"> <div class="pi-links">'+
                     '<a style="border-radius: 39%;width: 38%;border-color: black;background-color: black; color: cornflowerblue;" target="_" href ='+data[i].weblink+'   target="_">Buy Now</a>'+
                     '</div> </div> <div class="pi-text"> <h6>&#x20b9; '+data[i].offerprice+'</h6> <p  style="color: #022846;">'+name+' </p> </div> </div> </div></div>';
         }
       
         if(parseInt(localStorage['searchpage'])!=0)
         {
          var previouspro=document.getElementById("productsyour").innerHTML;
          previouspro=previouspro+product;
          document.getElementById("productsyour").innerHTML =previouspro;
   
         }
         else
         {
          document.getElementById("productsyour").innerHTML =product;
         }
        var link=localStorage['itemlink'];
        document.getElementById("showmoreproduct").innerHTML='<button class="site-btn sb-line sb-dark" style="background-color: #3774e4;color: #ffffff;" onclick="showsearchitems()" >LOAD MORE</button>';
        localStorage.searchpage= parseInt(localStorage['searchpage'])+1;
     }
 