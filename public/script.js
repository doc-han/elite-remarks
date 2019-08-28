$(document).ready(function(){
	$("#add").click(function(){
		$(".modal_bg").show()
	})
	$("#cancel-btn").click(function(){
		$(".modal_bg").hide()
	})

	$("#submit-btn").click(function(){
		let data = {
			code: $("#code").val(),
			fullname: $("#fullname").val(),
			remarks: $("#remarks").val()
		}
		$("#allcont").hide()
		$(".modal_container").text("loading...");
		$.ajax({
			url: '/',
			type: "POST",
			data: data,
			success: function(res){
				if(res.done){
					$(".modal_container").text("Thank you for your remarks");
					setTimeout(function(){
						window.location = '/'
					},3000)
				}else{
					$(".modal_container").text("Invalid Code");
				}
			},
			error: function(err){
				$(".modal_container").text("Refresh and retry!");
			}
		})

	})
});