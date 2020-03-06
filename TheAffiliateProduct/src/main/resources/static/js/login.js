$(document).ready(function(){

	if(localStorage.getItem("bestgotoken")!=null && localStorage.getItem("bestgotoken")!=undefined && localStorage.getItem("bestgotoken")!='')
	{
	   $.ajax({
		 type: "GET",
		 contentType : "application/json",
		 url : "/checkAuth/",
		 headers: {"Authorization": localStorage.getItem("bestgotoken")},
		 success: function ()
			 {
			   document.getElementById("upitemslogin").innerHTML ='<i class="flaticon-profile"></i> <a href="#" onclick="logout()" id="logout">LogOut</a>';
			 },
		 error: function (e)
			 {
                document.getElementById('signupformuser').click();
			 }
		 });
    }
    else{
        document.getElementById('signupformuser').click();
    }
	
   });



function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;

   return true;
}

function signup()
{
    var name= document.getElementById("name").value.trim();;
	var email= document.getElementById("email").value.trim();;
    var mobile=document.getElementById("mobileno").value.trim();;
    var password=document.getElementById("password").value.trim();
    var valid=true;
    var alert="";
     if(name=='')
     {
        valid=false;
        $("#name").css("border-color", "deeppink");
     }
    else
    $("#name").css("border-color", "");

    if(email=='')
    {
        valid=false;
        $("#email").css("border-color", "deeppink");
    }
    else
    $("#email").css("border-color", "");
    
  
    if(mobile!='' && mobile.length!=10)
    {
        valid=false;
        alert+="Please Provide valid Mobile No.";
    }

    if(mobile=='')
    {
        valid=false;
        $("#mobileno").css("border-color", "deeppink");
    }
   else
    $("#mobileno").css("border-color", "");

    if(password=='')
    {
        valid=false;
        $("#password").css("border-color", "deeppink");
    }
    else
    $("#password").css("border-color", "");

    if (email!='' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
        valid=false;
        $("#email").css("border-color", "deeppink");
      
    }
    else
    if(valid)
    {
        //document.getElementById("inputsignupbutton").innerHTML ='<button class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding" style="background: #2f889a;color: aliceblue;" onclick="signup()"> <i class="fa fa-refresh fa-spin"></i> <b>Please wait while we are creating your account</b></button>';
        localStorage['bestgoemail'] = email;
        $.ajax({
            url : "/AddUser/"+email+"/"+password+"/"+mobile+"/"+name,
            type : "POST",
            contentType : "application/json",
            dataType : "json",
            async : false,
            success : function(data) {
                      if(data.status==200)
                          document.getElementById('verfttti').click();
                      if(data.status==400)
                          document.getElementById("resultsignup").innerHTML ='<p id="resultsignup" style="color: #c53c49;">this email id is already registered with <a href="#0" onclick="sendemailcode()" style="color: cornflowerblue;">click here </a> to verify your email.</p>';
                      if(data.status==300)
                      {
                        $("#resultsignup").text('This Emailid is Already registered With us.');  
                      //  document.getElementById("inputsignupbutton").innerHTML =  '<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding" onclick="signup()" type="submit" value="Create account">';
                      }
                      
                 },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $("#resultsignup").text('Something went wrong.');
                    //document.getElementById("inputsignupbutton").innerHTML =  '<input class="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding" onclick="signup()" type="submit" value="Create account">';
                     
                  }	
        });	

    }
    else
    $("#resultsignup").text(alert);
}

function verifyaccount()
{
    var email=localStorage.getItem("bestgoemail");
     var otp=document.getElementById("Verificationcode").value.trim();
    
    if(otp=='')
    {
        valid=false;
        $("#otp").css("border-color", "deeppink");
    }
   else
    $("#otp").css("border-color", "");
    $.ajax({
        url : "/verifyuser/"+email+"/"+otp,
        type : "POST",
        contentType : "application/json",
        dataType : "json",
        async : false,
        success : function(data) {
                  if(data.status==200)
                  {
                    localStorage['bestgotoken'] = data.jwstoken;
                    pageRedirect("yourproduct.html");
                  }
                  else
                   $("#verifyotp").text('Plese enter a valid code.');  
             },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $("#verifyotp").text('Something went wrong.');
              }	
    });	
}
function sendemailcode()
{
    var email=localStorage.getItem("bestgoemail");
    $.ajax({
        url : "/sendEmailCode/"+email,
        type : "POST",
        contentType : "application/json",
        dataType : "json",
        async : false,
        success : function(data) {
                  if(data.status==200)
                  {
                    document.getElementById('verfttti').click();
                  }
                
             },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
               
              }	
    });	

}
function login()
{
    var signinemail=document.getElementById("signinemail").value.trim();
    var signinpassword=document.getElementById("signinpassword").value.trim();
    var valid=true;
if(signinemail=='')
    {
        valid=false;
        $("#signinemail").css("border-color", "deeppink");
    }
   else
    $("#signinemail").css("border-color", "");

    if(signinpassword=='')
    {
        valid=false;
        $("#signinpassword").css("border-color", "deeppink");
    }
   else
    $("#signinpassword").css("border-color", "");
   
    if(valid)
    {
        localStorage['bestgoemail'] = signinemail;
   
        $.ajax({
            url : "/loginuser/"+signinemail+"/"+signinpassword,
            type : "POST",
            contentType : "application/json",
            dataType : "json",
            async : false,
            success : function(data) 
            {
                      if(data.status==200)
                      {
                        localStorage['bestgotoken'] = data.jwstoken;
                        pageRedirect("yourproduct.html");
                      }
                      if(data.status==300)
                      {
                        document.getElementById("resultlogin").innerHTML ='<p id="resultsignup" style="color: #c53c49;">Please verify your email <a href="#0" onclick="sendemailcode()" style="color: cornflowerblue;">click here </a> to verify your email.</p>';
                      }
                      if(data.status==400)
                      {
                        $("#resultlogin").text('Please check your password.');
                      }
                    
                 },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $("#resultlogin").text('Something went wrong.');
            }	
        });	
    }
   
       
}




function forgotpaasword()
{
    var resetemail=document.getElementById("resetemail").value.trim();
    var valid=true;
   if(resetemail=='')
    {
        valid=false;
        $("#resetemail").css("border-color", "deeppink");
    }
   else
    $("#resetemail").css("border-color", "");

    if(valid)
    {
        $.ajax({
            url : "/forgotpaasword/"+resetemail,
            type : "POST",
            contentType : "application/json",
            dataType : "json",
            async : false,
            success : function(data) 
            {
                
                      if(data.status==200)
                      {
                        localStorage['bestgoemail'] = resetemail;
                        document.getElementById('resetpass').click();
                      }
                      else
                       $("#resultforgot").text('You are not registered,Please register yourself.');  
                 },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $("#resultforgot").text('Something went wrong.');
            }	
        });	
    }



}


function savepassword()
{
   
    var otp=document.getElementById("resetotp").value.trim();
    var password=document.getElementById("resetpassword").value.trim();
    var email=localStorage.getItem("bestgoemail");
    var valid=true;
    if( password=='' ||  password.length<6)
    {
        valid=false;
        $("#resultsavepaassword").text('Please Enter atleast 6 letter password.');
    }
    if(valid)
    {
        $("#resultsavepaassword").text('');
        $.ajax({
            url : "/paaswordsave/"+email+"/"+password+"/"+otp,
            type : "POST",
            contentType : "application/json",
            dataType : "json",
            async : false,
            success : function(data) 
            {
                
                      if(data.status==200)
                      {
                        localStorage['bestgotoken'] = data.jwstoken;
                        pageRedirect("yourproduct.html");
                      }
                      else
                       $("#resultsavepaassword").text('Please Enter valid otp.');  
                 },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $("#resultsavepaassword").text('Something went wrong.');
            }	
        });	
    }
    
}



function pageRedirect(page) {
	window.location.replace(page);
	
	} 

