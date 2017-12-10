$(document).ready(function(){
	$("#ingresar").click(function(){
		var email = $("#correo_ingreso").val();
		var password = $("#pass_ingreso").val();

		if( email =='' || password ==''){
			$('input[type="text"],input[type="password"]').css("border","2px solid red");
			$('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
			alert("Correo o contraseña incorrectos!");
		}else {
			if(email == 'profesor'){
				window.location.replace('profesor_inicio.html');
			}else{
				if(email == 'ayudante'){
					window.location.replace('ayudante_inicio.html')
				}
			}
		}
	}
)})