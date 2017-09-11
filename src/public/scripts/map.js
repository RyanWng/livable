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


	function getHouseData(minLat,minLng,maxLat,maxLng){
		$.getJSON(
				"/query/",
				{'minLat':minLat,'minLong':minLng,
					'maxLat':maxLat, 'maxLong':maxLng
				}, 
				function(data){
					console.log(data.pop());
					clearMarkers();
	        $.each(data, function(key, val){
	            addMarkers(val);
	        });
    })
	}


	function addMarkers(property) {

				var price = fetchPrice(property.price_display);
		    var circleMarker = new google.maps.Circle({
		    	strokeColor: '#ffffff',
					strokeOpacity: 0.0,
          strokeWeight: 0,
		      fillColor: getMarkerColour(price),
		      fillOpacity: 0.55,
		      map: map,
		      center: new google.maps.LatLng(property.latitude, property.longitude),
		      radius: 500	
	    	});

	    	markers.push(circleMarker);

	    	google.maps.event.addListener(circleMarker, 'click', function(ev){
	    		// var infowindow = new google.maps.InfoWindow();
			infowindow.setContent(
				"<div class='info-wrap'>"+
					"<div class='prop-img'>"+
						"<img src='"+property.image+"' alt='propert image' class='thumb'>"
					+"</div>"

					+"<div class='prop-info'>"+
						"<h3>"+property.price_display+"</h3>"+
						"<p>"+property.address+"</p>"
						+"<a href='"+"#"+"'>Link</a>"
					+"</div>"
				+"</div>"
			);

		    infowindow.setPosition(circleMarker.getCenter());
		    infowindow.open(map)
			});
  		

	}


	function clearMarkers(){
		markers.forEach((marker)=>{
			marker.setMap(null);
		});

		markers.length = 0; 
	}


	function fetchPrice(priceString){
		var price = Number(priceString.replace(/[^0-9\.-]+/g,""));
		return price;
	}



	function getMarkerColour(averagePrice) {
		if (averagePrice < 350) {
			return '#13de57';
		} else if (averagePrice < 450) {
			return '#35de13';
		} else if (averagePrice < 550) {
			return '#d3e21b';
		} else if (averagePrice < 800) {
			return '#e2c01b';
		}else if (averagePrice < 1100) {
			return '#e97308';
		}else if (averagePrice < 1500) {
			return '#e94608';
		}else if (averagePrice < 5500) {
			return '#f30404';
		}
	}


}());


