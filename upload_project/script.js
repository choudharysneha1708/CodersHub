$(document).ready(function(){
	
	$("#input").on("keyup", function(){
		
		
		var txtSearch = $("#input").val().toLowerCase();
		
		$(".family-box").each(function(){		
			
			$(this).find(".mix").each(function(){
				
				var title = $(this).find(".title").text().toLowerCase();
				var subtitle = $(this).find(".subtitle").text().toLowerCase();
				var description = $(this).find(".description").text().toLowerCase();	
				
				
				if(txtSearch.length > 1){
					if(title.indexOf(txtSearch) < 0 && subtitle.indexOf(txtSearch) < 0 && description.indexOf(txtSearch) < 0){
						$(this).addClass("hide");
					}
					else{				
						$(this).removeClass("hide");
					}	
				}
				else{
					$(this).removeClass("hide");
				}
			});	

			if($(this).find(".mix:not(.hide)").length == 0){
				$(this).addClass("hide");
			}
			else{
				$(this).removeClass("hide");
			}	
			
		});	
		
		//Remove h5's
		
		if(txtSearch.length > 1){
			$(".family-box h5").each(function(){			
				if($(this).nextUntil("h5").find(".mix:not(.hide)").length === 0){
					$(this).hide();
				}
				else{
					$(this).show();
				}
			});
		}
		else{
			$(".family-box h5").show();
		}

	});
	
	
	$(".filter").on("click", function(){
		var filter = $(this).data("filter");
		if(filter != "all"){
			$(".mix").addClass("hide");
			$(".mix" + filter + "").removeClass("hide");
		}else{
			$(".mix").removeClass("hide");
		}		
		$(".family-box").each(function(){
			if($(this).find(".mix:not(.hide)").length === 0){
				$(this).addClass("hide");
			}
			else{
				$(this).removeClass("hide");
			}	
		});
	});	
	
});

function togglefilter(){
	$("#filterbtns").toggleClass("show");
}