(function() {

/*
	Variables
*/
	var map = new google.maps.Map(document.getElementById('mymap'), {
          zoom: 13,
          center: {lat:-36.849508, lng:174.788510}
        });

	var markers = [];
	var infowindow = new google.maps.InfoWindow();

	var lats = [];
	var lngs = [];


/*
	Add Event handler
*/

	google.maps.event.addListener(map, 'idle', getMapViewBound);



/**
	Functions declaration
*/
	function getMapViewBound(){
		var bounds = map.getBounds();
		var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();

        var minLat = Math.min(ne.lat(),sw.lat());
        //console.log(minLat);
        var maxLat = Math.max(ne.lat(),sw.lat());
        //console.log(maxLat);
        var minLng = Math.min(ne.lng(),sw.lng());
        //console.log(minLng);
        var maxLng = Math.max(ne.lng(),sw.lng());
        //console.log(maxLng);


        //Sent to back end
		var data = getHouseData(minLat,minLng,maxLat,maxLng);
	}


	function getMarkerColour(averagePrice) {
		if (averagePrice < 100) {
			return '#440000';
		} else if (averagePrice < 200) {
			return '#880000';
		} else if (averagePrice < 300) {
			return '#BB0000';
		} else {
			return '#FF0000';
		}
	}


	function getHouseData(minLat,minLng,maxLat,maxLng){
		$.getJSON("/query/", {'minLat':minLat,'minLong':minLng,
					 'maxLat':maxLat, 'maxLong':maxLng}, function(data){
        
        $.each(data, function(key, val){
            addMarkers(val);
        });
    })
	}


	function addMarkers(data) {

		for (var city in data) {

		    var cityCircle = new google.maps.Circle({
		      strokeColor: '#FF0000',
		      strokeOpacity: 0.0,
		      strokeWeight: 0,
		      fillColor: '#FF0000',//getMarkerColour(citymap[city].startPrice),
		      fillOpacity: 0.35,
		      map: map,
		      center: new google.maps.LatLng(data.latitude, data.longitude),
		      radius: 500	
	    	});

	    	markers.push(cityCircle);

	    	google.maps.event.addListener(cityCircle, 'click', function(ev){
	    		// var infowindow = new google.maps.InfoWindow();
			infowindow.setContent(
				"<div class='info-wrap'>"+
					"<div class='prop-img'>"+
						"<img src='"+data.image+"' alt='propert image' class='thumb'>"
					+"</div>"

					+"<div class='prop-info'>"+
						"<h3>"+data.price_display+"</h3>"+
						"<p>"+data.address+"</p>"
						+"<a href='"+"#"+"'>Link</a>"
					+"</div>"
				+"</div>"
			);

		    infowindow.setPosition(cityCircle.getCenter());
		    infowindow.open(map)
			});
  		}

	}
}());


