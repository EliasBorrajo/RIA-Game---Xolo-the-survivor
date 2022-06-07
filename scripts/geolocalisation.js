function showCoordinate (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    // load document
    var request = new XMLHttpRequest;

    request.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.44939cdcc6812e1e2543a968f09d0b72&lat=" +
    lat + "&lon=" + long + "&format=json", true);
    request.send();
    request.onreadystatechange = processRequest;

    function processRequest(e) {
        if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        var city = response.address.town;
        console.log(`ville: ${city}`);
        document.getElementById("ville").innerHTML = city;
        }
    }   
}

// Erreurs
function showError(error) {
    var msg;
    switch(error.code) {
      case error.PERMISSION_DENIED:
        msg = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        msg = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        msg = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        msg = "An unknown error occurred."
        break;
    }
    alert(msg);
}

// Si geoloclisation active
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showCoordinate, showError);
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}