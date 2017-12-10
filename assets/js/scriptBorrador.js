 
function cargarContenidoPregunta(num_pregunta){

    $.getJSON("data/preguntas.json", function(data) {
        $.each(data, function(key, val) {
            if(val.numero+"_seleccionar" == num_pregunta){

                $('#contenido').text(val.contenido);
  

                $.each(val.respuestas, function(index, element){
                    var div_contenedorRespuesta = $('<div></div>');
                    div_contenedorRespuesta.attr('class', 'respuestas');

                    var div_respuesta = $('<div></div>');
                    div_respuesta.attr('class', 'col-md-6 form-group');

                    var label_respuesta = $('<label></label>');
                    label_respuesta.attr('class', 'sr-only');
                    label_respuesta.attr('for','r1-respuesta');
                    label_respuesta.text("Respuesta");

                    var input_respuesta = $('<input></input>');
                    input_respuesta.attr('type', 'text');
                    input_respuesta.attr('name', 'respuesta');
                    input_respuesta.attr('class','f1-password form-control');
                    input_respuesta.val(element.respuesta);

                    var div_retroalimentacion = $('<div></div>');
                    div_retroalimentacion.attr('class', 'col-md-6 form-group');

                    var label_retroalimentacion= $('<label></label>');
                    label_retroalimentacion.attr('class', 'sr-only');
                    label_retroalimentacion.attr('for','r1-respuesta');
                    label_retroalimentacion.text("Respuesta");

                    var input_retroalimentacion = $('<input></input>');
                    input_retroalimentacion.attr('type', 'text');
                    input_retroalimentacion.attr('name', 'retroalimentacion');
                    input_retroalimentacion.attr('class','f1-password form-control');
                    input_retroalimentacion.attr('id','f1-repeat-password');
                    input_retroalimentacion.val(element.retroalimentacion);

                    div_respuesta.append(label_respuesta);
                    div_respuesta.append(input_respuesta);

                    div_retroalimentacion.append(label_retroalimentacion);
                    div_retroalimentacion.append(input_retroalimentacion);

                    div_contenedorRespuesta.append(div_respuesta);
                    div_contenedorRespuesta.append(div_retroalimentacion);

                    $('#botones_contenido').before(div_contenedorRespuesta);
                });
            }
        });
    });
}

function rechazar(event){
    var target_id = event.target.id;
    var id = target_id.split('_');
    $('#'+id[0]).css('display', 'none');
}


function seleccionar(event) {
    cargarContenidoPregunta(event.target.id);
    var parent_fieldset = $(this).parents('fieldset');
    var next_step = true;
    // navigation steps / progress steps
    var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    if( next_step ) {
        parent_fieldset.fadeOut(400, function() {
            // change icons
            current_active_step.removeClass('active').addClass('activated').next().addClass('active');
            // progress bar
            bar_progress(progress_line, 'right');
            // show next step
            $(this).next().fadeIn();
            // scroll window to beginning of the form
            scroll_to_class( $('.f1'), 20 );
        });
    }
    
}


function cargarPreguntas() {

    $.getJSON("data/preguntas.json", function(data) {
        $.each(data, function(key, val) {
            var tr = $('<tr></tr>');
            tr.attr('id',val.numero);
            var th = $('<th></th>');
            th.attr('scope', 'row');
            th.text(val.numero);
            tr.append(th);

            var pregunta = $('<td></td>');
            pregunta.text(val.pregunta);
            tr.append(pregunta);

            var td_rechazar = $('<td></td>');

            var p_rechazar = $('<p></p>');
            p_rechazar.attr('data-placement','top');
            p_rechazar.attr('data-toggle','tooltip');
            p_rechazar.attr('tittle','Rechazar');

            var btn_rechazar = $('<button></button>');
            btn_rechazar.attr('class','btn btn-danger btn-xs');
            btn_rechazar.attr('data-title','Rechazar');
            btn_rechazar.attr('data-toggle','modal');
            btn_rechazar.attr('data-target', '#edit');
            btn_rechazar.attr('id', val.numero+'_rechazar')
            btn_rechazar.bind('click', rechazar);
            

            var span_rechazar = $('<span></span>');
            span_rechazar.attr('class','glyphicon glyphicon-remove');
            
            btn_rechazar.append(span_rechazar);
            p_rechazar.append(btn_rechazar);
            td_rechazar.append(p_rechazar);
            tr.append(td_rechazar);

            var td_seleccionar = $('<td></td>');

            var p_seleccionar = $('<p></p>');
            p_seleccionar.attr('data-placement','top');
            p_seleccionar.attr('data-toggle','tooltip');
            p_seleccionar.attr('tittle','Seleccionar');

            var btn_seleccionar = $('<button></button>');
            btn_seleccionar.attr('class','btn btn-success btn-xs');
            btn_seleccionar.attr('data-title','Seleccionar');
            btn_seleccionar.attr('data-toggle','modal');
            btn_seleccionar.attr('data-target', '#delete');
            btn_seleccionar.attr('id', val.numero+"_seleccionar");
            btn_seleccionar.bind('click', seleccionar);

            var span_seleccionar = $('<span></span>');
            span_seleccionar.attr('class','glyphicon glyphicon-ok');
            
            btn_seleccionar.append(span_seleccionar);
            p_seleccionar.append(btn_seleccionar);
            td_seleccionar.append(p_seleccionar);
            tr.append(td_seleccionar);


            $('#cuerpo_tabla').append(tr);
        });
    });
}

$(window).load(function() {

    cargarPreguntas();    

});

function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 0);
	}
}

function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if(direction == 'right') {
		new_value = now_value + ( 100 / number_of_steps );
	}
	else if(direction == 'left') {
		new_value = now_value - ( 100 / number_of_steps );
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}


jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    
    $.backstretch("assets/img/backgrounds/1.jpg");*/
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form
    */
    $('.f1 fieldset:first').fadeIn('slow');
    
    $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // next step
    $('.btn-primary').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	// fields validation
    	parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	// fields validation
    	
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
    			// change icons
    			current_active_step.removeClass('active').addClass('activated').next().addClass('active');
    			// progress bar
    			bar_progress(progress_line, 'right');
    			// show next step
	    		$(this).next().fadeIn();
	    		// scroll window to beginning of the form
    			scroll_to_class( $('.f1'), 20 );
	    	});
    	}
    	
    });

    $('.btn-success').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        var progress_line = $(this).parents('.f1').find('.f1-progress-line');


        if( next_step ) {
            parent_fieldset.fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                // progress bar
                bar_progress(progress_line, 'right');
                // show next step
                $(this).next().fadeIn();
                // scroll window to beginning of the form
                scroll_to_class( $('.f1'), 20 );
            });
        }
        
    });

    $('.f1 .btn-next').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        var progress_line = $(this).parents('.f1').find('.f1-progress-line');
        

        if( next_step ) {
            parent_fieldset.fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                // progress bar
                bar_progress(progress_line, 'right');
                // show next step
                $(this).next().fadeIn();
                // scroll window to beginning of the form
                scroll_to_class( $('.f1'), 20 );
            });
        }
        
    });
    
    // previous step
    $('.f1 .btn-previous').on('click', function() {
    	// navigation steps / progress steps
    	var current_active_step = $(this).parents('.f1').find('.f1-step.active');
    	var progress_line = $(this).parents('.f1').find('.f1-progress-line');
    	
    	$(this).parents('fieldset').fadeOut(400, function() {
    		// change icons
    		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
    		// progress bar
    		bar_progress(progress_line, 'left');
    		// show previous step
    		$(this).prev().fadeIn();
    		// scroll window to beginning of the form
			scroll_to_class( $('.f1'), 20 );
    	});
    });
    
    // submit
    $('.f1').on('submit', function(e) {
    	
    	// fields validation
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	// fields validation
    	
    });
    
    
});




