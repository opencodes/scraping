$(document).ready(function(){
	$('.listing-id').on('click',function(e){
		e.preventDefault();
		var menuId = $( "ul.nav" ).first().attr( "id" );
		var request = $.ajax({
		  url: "script.php",
		  type: "POST",
		  data: { id : menuId },
		  dataType: "html"
		});
		 
		request.done(function( msg ) {
		     $( "#details" ).html( msg );
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			 $( "#details" ).html( textStatus );
		});
	})
})