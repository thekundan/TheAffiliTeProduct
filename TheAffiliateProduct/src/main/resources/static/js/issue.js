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
                document.getElementById("userinfoval").innerHTML ='<a style=" margin-left: 2%;FONT-SIZE: 124%;"  id="usernameval" > welcome '+data+'</a><a class="flaticon-profile" style="color:red;margin-left: 4%;" href="#" onclick="logout()">LogOut</a>';
            },
		 error: function (e)
			 {
                document.getElementById("upitemissue").innerHTML =' <i class="flaticon-profile"></i><a href="#" onclick="Loginpage()">Login / SignUp</a></div>';
             }
		 });
    }
    else
      document.getElementById("upitemissue").innerHTML =' <i class="flaticon-profile"></i><a href="#" onclick="Loginpage()">Login / SignUp</a></div>';
   });

$("#submitraiseissue").click(function (event) {

    var name= document.getElementById("fname").value.trim();
	var email= document.getElementById("Email").value.trim();
    var message=document.getElementById("issue").value.trim();
   
    $.ajax({
        url : "/issuemessage/"+name+"/"+email+"/"+message,
        type : "POST",
        contentType : "application/json",
        dataType : "json",
        async : false,
        success : function(data) 
        {
            pageRedirect("issue.html");  
        },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $("#resultforgot").text('Something went wrong.');
        }	
    });	


 });



function pageRedirect(page) {
	window.location.replace(page);
	
	} 
    function Loginpage()
    {
      window.location.replace("user.html");
    }