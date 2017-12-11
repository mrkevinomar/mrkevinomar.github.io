
function cargarActividades() {
  $.getJSON('data/actividades_estudiante.json', function(data) {
	  console.log(data);
        $.each(data, function(key, val) {
			var iconValue = val['icon'];
			var titleValue = val['title'];
			var descriptionValue = val['description'];
			
			var activity = $('<article></article>');
            activity.attr('class','actividad');
			var datetime = $('<time></time>');
            datetime.attr('class','actividad-date');
			
			var activityBody = $('<div></div>');
            activityBody.attr('class','actividad-body');
			var image_box = $('<div></div>');
			var image = $('<img></img>');
			image.attr('class','notice-icon');
			var description = $('<div></div>');
			description.attr('class','actividad-description');
			var title = $('<a></a>');
			title.attr('class','title');
			var content = $('<p></p>');
			datetime.text(val["datetime"]);
			image.attr('src', iconValue);
			title.text(titleValue);
		    content.text(descriptionValue);
			description.append(title);
			description.append(content);
			image_box.append(image);
			activityBody.append(image_box);
			activityBody.append(description);
			activity.append(datetime);
			activity.append(activityBody);
			$('.activitiesbox').append(activity);

            
        });
    });
}

$(window).on('load',function(){
	cargarActividades();
})
