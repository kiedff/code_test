// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require jquery
//= require jquery_ujs
//= require popper
//= require turbolinks
//= require bootstrap
//= require_tree .

$(function(){
  var lat = 55.890;
  var lng = -4.294;

  // don't bother waiting on permissions becuase change function doesn't work
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state === 'granted') {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      renderMap(lat,lng);
    }
  });

  $('#photoUpload').click(function(e){
    e.preventDefault()
    displayForm()
  })
});

function showPosition(position) {
  console.log(position.coords.latitude,position.coords.longitude)
  renderMap(position.coords.latitude,position.coords.longitude)
}

function renderMap(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 10
  });

  addMarkers(map)
}

function addMarkers(map) {
  $.ajax({
    url: "/photos/",
    type: "get",
    data: "",
    success: function(data) { 
      updateMarkers(map,data);
    },
    error: function () {
      alert("There was an error");
    }
  });
}

function updateMarkers(map,markers){

  var i, marker, contentString;

  for (i=0; i<markers.length; i++){
    marker = new google.maps.Marker({
      position: {'lat':markers[i].lat,'lng':markers[i].lng}, 
      map: map,
      infoWindowContent: "<img src='"+markers[i].image.thumb.url+"'/>"
    });

    infowindow = new google.maps.InfoWindow({
        content: ""
    });

    google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
      return function() {
        infowindow.setContent(marker.infoWindowContent);
        infowindow.open(map, marker);
      }
    })(marker, i));

    google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
      return function() {
        infowindow.close(map, marker);
      }
    })(marker, i));

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
          $("#modal-window").find(".modal-content").html("<img src='"+markers[i].image.full.url+"'/>");
          $("#modal-window").modal();
      }
    })(marker, i));
  }
}

function displayForm() {
  // var htmlString = '/app/views/photos/_new.html';
  // $('.modal-content').html(htmlString);


  $.get('photos/new.html', function(content) {
      $('.modal-content').html(content);
  });


  $('.modal').addClass('is-visible');

  $('#new_photo').submit(function(e){
    e.preventDefault()

    console.log($('#new_photo'))
  })
}
