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

  $('#searchForm').submit(function(e){
    e.preventDefault();
    getCoordinates($('#seachTextbox').val(),renderMap);
  })

  //geocoding location
  $(document).on('submit','#new_photo',function(e){
    e.preventDefault();
    getCoordinates($("#location").val(),uploadPhoto);
  })

  setTimeout(function(){ $('.notice').hide() }, 3000);
});

function showPosition(position) {
  renderMap(position.coords.latitude,position.coords.longitude)
}

function renderMap(lat, lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 8
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
          $("#modal-window").find(".modal-content").html("<img src='"+markers[i].image.full.url+"'/><button class=\"btn btn-default\" data-dismiss=\"modal\" aria-hidden=\"true\">Close</button>");
          $("#modal-window").modal();
      }
    })(marker, i));
  }
}

function getCoordinates(query, successFunction){

  $.getJSON( {
    url  : 'https://maps.googleapis.com/maps/api/geocode/json',
    data : {
        sensor  : false,
        address : query,
        key: 'AIzaSyAVI5OeqKWBBPxInEtlQmENnm50qqjS8ZA'
    },
    success : function( data, textStatus ) {
      if(data.status === 'OK'){
        successFunction(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng)
      } else {

        errorModal('Could not find the location provided')
      }
    }
  });
}

function errorModal(errorString){
  $("#modal-window").find(".modal-content").html("<div class=\"modal-body\"><h4>"+errorString+"<h4/></div><div class='modal-footer'><button class='btn btn-danger' data-dismiss='modal' aria-hidden='true'>Close</button></div>");
  $("#modal-window").modal();
}

function uploadPhoto(lat,lng){
  $('#photo_lat').val(lat);
  $('#photo_lng').val(lng);
  $(document).unbind('submit');
  $('#new_photo').submit()
}
