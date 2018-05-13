/*var paused_count =0;
var resumed_count = 0;
var launched_count = 0;

document.addEventListener("deviceready", onDeviceReady, false);
		
	
function updateDisplay() {
	$("#launched").text("Application launched: " + launched_count);
	$("#resumed").text("Application paused: " + paused_count);
	$("#paused").text("Application resumed: " + resumed_count);
    }

*/

//
//Page 1 JavaScript
//

var searchBar;
var searchVar;
var feedURL = "http://www.omdbapi.com/?apikey=34fc007e&t=";
var imageURL ="http://img.omdbapi.com/?apikey=34fc007e&t=";
var title;
var genre;
var release;
var runtime;
var director;
var writer;
var actors;
var rating;
var response;

//Listener and function for the searchbar / button
var searchbtn = document.getElementById("searchbutton");
function searchButton() {
    searchBar = document.getElementById("searchbox").value;
    //searchBar.replace(" ", "+");
    searchVar = searchBar.split(" ").join("+");
    console.log("Searching for..." + searchVar);
    makeRequest();
}
searchbtn.addEventListener("click", searchButton);

/* var feedKey = "34fc007e"; */
/*Googple key: AIzaSyC6_L1aGCV9RnJfi56DjISvuyJpWCwxLGs
New key?: AIzaSyC8Kt2m8RQlajz04BJhl0uBlueKzo7TzWU
*/

//Function for requesting information from the API
function makeRequest() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = callback;
    httpRequest.open('GET', feedURL + searchVar, true);
    httpRequest.send();
}

//Dealing with the response from the API
function callback() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        console.log(httpRequest.responseText);
        var responseStr = JSON.stringify(httpRequest.ResponseText);
        response = JSON.parse(httpRequest.responseText);
        
        title = response.Title;
        genre = response.Genre;
        release = response.Released;
        runtime = response.Runtime;
        director = response.Director;
        writer = response.Writer;
        actors = response.Actors;
        rating = response.imdbRating;
        
        
    }
    document.getElementById("movieTitle").innerHTML = title;
    document.getElementById("movieGenre").innerHTML = genre;
    document.getElementById("movieRelease").innerHTML = release;
    document.getElementById("movieRuntime").innerHTML = runtime;
    document.getElementById("movieDirector").innerHTML = director;
    document.getElementById("movieWriter").innerHTML = writer;
    document.getElementById("movieActors").innerHTML = actors;
    document.getElementById("movieRating").innerHTML = rating;
}

//document.getElementById('searchbutton').onclick = function()
document.getElementById("movieInfo").innerHTML = makeRequest();

//
//Page 2 JavaScript
//

//$(document).ready(function initMap() {});

function initMap() {
    var latlng = new google.maps.LatLng(51.508742, -0.120850);
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: latlng,
        zoom: 8
    });
    //
    //The below JavaScript has been copied from google maps documentation
    //I did not write any of this, it belongs to Google
    //Available at: https://developers.google.com/maps/documentation/javascript/geolocation
    //
    //Portions of this page are reproduced from work created and shared by Google and used according to terms described in the Creative Commons 3.0 Attribution License.
    //https://creativecommons.org/licenses/by/3.0/legalcode
    //
    infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}