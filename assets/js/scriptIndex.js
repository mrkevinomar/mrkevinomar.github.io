


function cargarCarousel(){

	$.getJSON('data/topJugadores.json', function(data){
		var cnt = 1;
		$.each(data, function(key, val) {

			var item_carousel = $('<div></div>');
			if(cnt==1){
				item_carousel.attr('class','carousel-item active');
			}else{
				item_carousel.attr('class','carousel-item');	
			}

			var puesto = $('<h1></h1>');
			puesto.text(val.puesto+" PUESTO");
			puesto.css('font-weight', "bold");

			var div = $('<div></div>');
			div.attr('class', 'col-12');
			

			var div_img = $('<div></div>');
			div_img.attr('class', 'col-3');

			var img = $('<img></img>');
			img.attr('class', 'img-fluid')
			img.attr('src', val.foto);
			img.attr('alt', val.puesto+"img");
			img.css('width','75%');
			img.css('border-radius', '50%');
			img.css('max-height', '300px');
			img.css('max-width', '300px');


			div_img.append(img);

			var div_contenido = $('<div></div>');
			div_contenido.attr('class', 'col-7');

			var br = $('<br>');

			var nombre = $('<h3></h3>');
			nombre.text(val.nombre);
			nombre.css('font-weight','bold');
			var dias = $('<h3></h3>');
			dias.text(val.dias+" Dias");
			var tiempo = $('<h3></h3>');
			tiempo.text(val.tiempo);

			div_contenido.append(br);
			div_contenido.append(nombre);
			div_contenido.append(dias);
			div_contenido.append(tiempo);


			div.append(div_img);
			div.append(div_contenido);

			item_carousel.append(puesto);
			item_carousel.append(div);

			$('#content_carousel').append(item_carousel);

			cnt++;
		})
	})
}



$(window).on('load',function(){
	cargarCarousel();
})