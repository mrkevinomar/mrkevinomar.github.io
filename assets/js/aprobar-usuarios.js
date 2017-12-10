
$(document).ready(function(){
		$('button').on('click',function(){
			$('tr[id='+this.getAttribute('value')+']').remove();
		});
		$('.aprove').on('click',function(){
			$("td").each(function () {
					this.remove();
					
				});
			alert("Jugadores aprobados");
		});
		$('.remove').on('click',function(){
			$("td").each(function () {
					this.remove();
					
				});
			alert("Jugadores rechazados");
		});
	
	$("#mytable #checkall").click(function () {
			if ($("#mytable #checkall").is(':checked')) {
				$("#mytable input[type=checkbox]").each(function () {
					$(this).prop("checked", true);
				});
				

			} else {
				$("#mytable input[type=checkbox]").each(function () {
					$(this).prop("checked", false);
				});
			}
		});
		
		$("[data-toggle=tooltip]").tooltip();
});

