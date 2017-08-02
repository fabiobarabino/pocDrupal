$(document).ready(function(){
	$('#login_button').click(function() {
		var user = $('#user_id').val();
		var password = $('#password_id').val(); 
		
		$.ajax({
				url : "/user/login?_format=json", 
					type: "POST",
					async:false,
					dataType : "application/hal+json",
					data : 'form_id=user_login_form&name=' + encodeURIComponent("mrmercy87@gmail.com") + '&pass=' + encodeURIComponent("123456") ,
					//data: JSON.stringify({"name":[{"value":user}],"pass":[{"value":password}]}),
					contentType: "application/json",
					complete: function(data)
					{
						alert("User login completed!");
						console.log(data);
						 //window.location.href = 'page_2.html';
					}
		});
		
		/*if( user == 'user' && password == 'user')  {
			  window.location.href = 'page_2.html';
			  return false;
		} else {
		  
		}*/
	  });

	$('#user_reg_button').click(function() {
		var user = $('#user_id').val();
		var password = $('#password_id').val(); 
		
		
		var token = $.ajax({
				url : "/session/token", 
				type: "GET",
				async:false,
				dataType : 'application/json',
				success: function(data)
				{
				
				},
				error: function(error){
					console.log(error);
				}
		}).responseText;
		
		if (token){
		$.ajax({
				url : "/user/register?_format=json", 
					type: "POST",
					async:false,
					headers: {
						"X-CSRF-Token":token
					},
					dataType : "application/json",
					data: JSON.stringify({"name":[{"value":user}],"mail":[{"value":user}],"pass":[{"value":password}]}),
					contentType: "application/json",
					complete: function(data)
					{
						alert("User registration completed!");
						console.log(data);
						 //window.location.href = 'page_2.html';
					}
		});
		}
		
	  });	  
	
	$('#get_btn').click(function(){
		
		var msg = $.ajax({
				url : "/api/articles", 
				type: "GET",
				async:false,
				dataType : 'application/json',
				complete: function(data)
				{
				$('#iframe_video').attr('src',jQuery.parseJSON(data.responseText)[0].field_custom_video[0].url);
				},
				/*error: function(error){
					console.log(error);
				}*/
		}).responseText;
						
		$('#get_text_area').val('ARTICLES:\n '+msg);
		
					
			
});

$('#create_btn').click(function(){
		var title = $('#title_create_text_area').val();
		var text = $('#create_text_area').val();
		
		var token = $.ajax({
				url : "/session/token", 
				type: "GET",
				async:false,
				dataType : 'application/json',
				success: function(data)
				{
				
				},
				error: function(error){
					console.log(error);
				}
		}).responseText;
		
		if (token){
		$.ajax({
				url : "/entity/node?_format=json", 
					type: "POST",
					async:false,
					headers: {
						"X-CSRF-Token":token
					},
					dataType : "application/json",
					//data: {"_links":[{"type":[{"href": "/rest/type/node/article"}]}],"type":[{"target_id":"article"}],"title":[{"value":title}],"body":[{"value":text}]},
					data: JSON.stringify({"type":[{"target_id":"article"}],"title":[{"value":title}],"body":[{"value":text}]}),
					
					contentType: "application/json",
					complete: function(data)
					{
						$('#create_text_area').val("Article with NID " + jQuery.parseJSON(data.responseText).nid[0].value + " successfully created");
						
					}
		});
		}
				
});

$('#edit_btn').click(function(){
		var title = $('#title_edit_text_area').val();
		var text = $('#edit_text_area').val();
		var articleId = $('#delete_id').val();
		
		var token = $.ajax({
				url : "/session/token", 
				type: "GET",
				async:false,
				dataType : 'application/json',
				success: function(data)
				{
				
				},
				error: function(error){
					console.log(error);
				}
		}).responseText;
		
		if (token){
		$.ajax({
				url : "/node/"+articleId+"?_format=json", 
					type: "PATCH",
					async:false,
					headers: {
						"X-CSRF-Token":token
					},
					dataType : "application/json",
					//data: {"_links":[{"type":[{"href": "/rest/type/node/article"}]}],"type":[{"target_id":"article"}],"title":[{"value":title}],"body":[{"value":text}]},
					data: JSON.stringify({"nid": [{"value": articleId }],"type":[{"target_id":"article"}],"title":[{"value":title}],"body":[{"value":text}]}),
					
					contentType: "application/json",
					complete: function(data)
					{
						
						$('#edit_text_area').val("Article with NID " + jQuery.parseJSON(data.responseText).nid[0].value + " successfully updated");
						
					}
		});
		}
				
});

$('#delete_btn').click(function(){
	
	var articleId = $('#delete_id').val();
	
	var token = $.ajax({
				url : "/session/token", 
				type: "GET",
				async:false,
				dataType : 'application/json',
				success: function(data)
				{
				
				},
				error: function(error){
					console.log(error);
				}
		}).responseText;
		
		$.ajax({
				url : "/node/"+articleId+"?_format=json", 
					type: "DELETE",
					dataType : "application/json",
					headers: {
						"X-CSRF-Token":token
					},
					async:false,
					success: function(data)
					{
						alert("Article deleted!");
					},
					error: function(error){
						alert("Error in article deletion!");
						console.log(error);
					}
		});
				
});



});