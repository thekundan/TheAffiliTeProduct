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
              yourproducts();
            },
        error: function (e)
            {
              document.getElementById("autherror").innerHTML =' <h2>Please Login to continue our services.</h2><a href="#" style="color: #301aa9; font-size: 109%;" onclick="Loginpage()">click here</a> <h2>To login</h2>';
            }
        });
   }
   else{
    document.getElementById("autherror").innerHTML =' <h2>Please Login to continue our services.</h2><a href="#" style="color: #301aa9; font-size: 109%;" onclick="Loginpage()">click here</a> <h2>To login</h2>';
    
   }
  });

function yourproducts()
    {
        $.ajax({
                type: "GET",
                contentType : "application/json",
                url : "/yourProduct/0",
                headers: {"Authorization": localStorage.getItem("bestgotoken")},
                dataType : "json",
                timeout: 600000,
        success: function (data)
                    {
                        if (data.length>0) {   
                          localStorage.pageno= 1;
                            showproduct(data);
                        }
                        else {
                          var msg=  "<p style='font-size: 24px;color: #585858;'>You don't have any product ,Please add your product.</p>";
                          document.getElementById("productmsg").innerHTML =msg;
                        }
                    },
        error: function (e)
                    {
                  alert("Something Went Wrong");
                    }
            });
    }
    function showmoreproduct()
    {
     

            $.ajax({
              type: "GET",
              contentType : "application/json",
              url : "/yourProduct/"+localStorage['pageno'],
              headers: {"Authorization": localStorage.getItem("bestgotoken")},
              dataType : "json",
              timeout: 600000,
      success: function (data)
                  {
                      if (data.length>0) { 
                       
                        loadproduct(data);
                      }
                      else {
                        var msg=  "<p style='font-size: 24px;color: #585858;'>You don't have any more product </p>";
                        document.getElementById("productmsg").innerHTML =msg;
                      }
                  },
      error: function (e)
                  {
                alert("Something Went Wrong");
                  }
          });
          

    }
function loadproduct(data)
{
  var product='';
  localStorage.pageno= parseInt(localStorage['pageno'])+1;  
       for(var i = 0; i < data.length; i++) 
       {
        var name=data[i].name;
        if(name.length>45)
        {
           name = name.substring(0, 41);
           name=name+" ...."
           
        }
        product+=   '<div class="col-lg-3 col-sm-6"><div class="product-item" id="productitem"> <div class="pi-pic">';

                    if(data[i].isactive==true)
                         product+= '<div class="tag-active">Active</div>';
                    else
                         product+= '<div class="tag-deactive">Deactive</div>';

                   if(data[i].tag!=null)
                         product+= '<div class="tag-offerofthedaya">'+data[i].tag+'</div>';
                   


                   product+=   '<img src="'+data[i].url+'" alt="" width="500" height="333"> <div class="pi-links">'+
                    '<button style="border-radius: 26%;  border-color: black; background-color: #079090; color: cornsilk;" onclick=singleproduct('+data[i].id+') class="fa fa-eye">Change Product Info</button>'+
                    '</div> </div> <div class="pi-text"> <h6>&#x20b9; '+data[i].offerprice+'</h6> <p>'+name+' </p> </div> </div> </div></div>';
        }
      
       var previouspro=document.getElementById("productsyour").innerHTML
       previouspro=previouspro+product;
       document.getElementById("productsyour").innerHTML =previouspro;
}

    function showproduct(data)
    {
       var product='';

       for(var i = 0; i < data.length; i++) 
       {
        var name=data[i].name;
        if(name.length>45)
        {
           name = name.substring(0, 41);
           name=name+" ...."
           
        }
        
        product+=   '<div class="col-lg-3 col-sm-6"><div class="product-item" id="productitem"> <div class="pi-pic">';
                    if(data[i].isactive==true)
                        product+= '<div class="tag-active">Active</div>';
                    else
                          product+= '<div class="tag-deactive">Deactive</div>';

                    if(data[i].tag!=null)
                          product+= '<div class="tag-offerofthedaya">'+data[i].tag+'</div>';

                    product+= '<img src="'+data[i].url+'" alt="" width="500" height="333"> <div class="pi-links">'+
                    '<button style="border-radius: 26%;  border-color: black; background-color: #079090; color: cornsilk;" onclick=singleproduct('+data[i].id+') class="fa fa-eye">Change Product Info</button>'+
                    '</div> </div> <div class="pi-text"> <h6>&#x20b9; '+data[i].offerprice+'</h6> <p>'+name+' </p> </div> </div> </div></div>';
       }
     
       
       document.getElementById("showmoreproduct").innerHTML='<button class="site-btn sb-line sb-dark" style="background-color: #3774e4;margin-left: 46%;color: #ffffff;" onclick="showmoreproduct()" >LOAD MORE</button>';
       document.getElementById("productsyour").innerHTML =product;
	
    }
    function singleproduct(id)
    {
      $.ajax({
        type: "GET",
        contentType : "application/json",
        url : "/getsingleProduct/"+id,
        headers: {"Authorization": localStorage.getItem("bestgotoken")},
        dataType : "json",
        timeout: 600000,
        success: function (data)
                    {
                      var product='<div class="container"><div class="row"><div class="col-lg-6"><img class="product-big-img" src="'+data.url+'" alt="" width="600" height="850"></div>'+
                      '<div class="col-lg-6 product-details"><h2 class="p-title">'+data.name+'</h2>'+
                      '<h3 class="p-price">Offer Price  : &#x20b9;  '+data.offerprice+'</h3><h3 class="p-price">Orignal Price : &#x20b9; '+data.origprice+'</h3> <h3 class="p-price">Affiliate Website : '+data.affiliatewebsite+'</h3>'+
                      '<h4 class="p-stock">Available: <span>In Stock</span></h4>	';
                      if(data.isactive==true)
                         product+= '<a  onclick="deactivate('+data.id+')" class="site-btn">DEACTIVATE</a>';
                      else
                        product+= '<a style="background-color: aqua;" onclick="activateproduct('+data.id+')" class="site-btn">ACTIVATE</a>';

                        if(data.tag!=null)
                        product+= '<div class="tag-new">'+data.tag+'</div>';

                        product+= '<div id="accordion" class="accordion-area"><div class="panel">	<div class="panel-header" id="headingOne">'+
                      '<button class="panel-link active" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">information</button>'+
                      '</div>	<div id="collapse1" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion"><div class="panel-body"><p>'+data.longdescription+'</p></div></div></div></div>	';
                  
                      document.getElementById("productsection").innerHTML =product;
                      window.scrollBy(0, -10000);
                      
                    },
        error: function (e)
                    {
                  alert("Something Went Wrong");
                    }
            });
                     
           
              
        }
function activateproduct(data)
{
  $.ajax({
    url : "/activateproduct/"+data,
    type : "POST",
    contentType : "application/json",
    headers: {"Authorization": localStorage.getItem("bestgotoken")},
    dataType : "json",
    async : false,
    success : function() 
    {
        
    },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#resultforgot").text('Something went wrong.');
    }	
});	
pageRedirect("yourproduct.html");  
}
function deactivate(data)
{
  $.ajax({
    url : "/deactiveyourproduct/"+data,
    type : "POST",
    contentType : "application/json",
    headers: {"Authorization": localStorage.getItem("bestgotoken")},
    dataType : "json",
    async : false,
    success : function() 
    {
      
    },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#resultforgot").text('Something went wrong.');
    }	
});	
pageRedirect("yourproduct.html");  


}

function pageRedirect(page) {
	window.location.replace(page);
	
  } 
  
  function Loginpage()
  {
    window.location.replace("user.html");
  }