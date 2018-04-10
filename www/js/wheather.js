var latitudeGps;
var longitudeGps;



$(document).on('pagecreate', '#home', function () {

    getWheather();

});


$(document).on('tap', '#arrowContainer', function () {
    getWheather();
});



function getWheather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (loc) {

            console.log(loc);

            latitudeGps = loc.coords.latitude;
            longitudeGps = loc.coords.longitude;


            var url = 'https://api.darksky.net/forecast/',
                token = '2df43ebca604a5f253c427577309015e/';

            $.ajax({
                url: url + token + latitudeGps + "," + longitudeGps,
                dataType: "jsonp",
                async: true,
                success: function (result) {
                    console.log(result);
                    ajax.santiagoGetJson(result);
                },
                error: function (request, error) {
                    alert('Network error has occurred please try again!' + longitudeGps);
                }
            });
        },
            function (error) {
                if (error.PERMISSION_DENIED) {
                    alert("you did not allow to get your current position. ");
                    $("#textCountry").html("you did not allow to get your current position.");
                }

            })
    } else {
        alert("Geolocation is not supported by this browser.");
        return;
    }
}


var wheather = {
    result: null
}

var ajax = {
    santiagoGetJson: function (result) {
        wheather.result = result;

        $("#textCountry").html(wheather.result.timezone);
        $("#temperatureNumber").html(wheather.result.currently.temperature + "°");
        $("#humidityPercent").html((wheather.result.currently.humidity) * 100 + "%");
        $("#iconName").html(wheather.result.currently.icon);
        $("#precipProbabilityPercent").html((wheather.result.currently.precipProbability) * 100 + "%");
        $("#sumaryText").html(wheather.result.currently.summary);

    }
}



