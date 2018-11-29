var geolocation = {
    apiURL: "http://192.168.0.200:3000/stores/@",
    userPosX: "",
    userPosY: "",

    setUserCurrentPositions: function () {
        var onSuccess = function (location) {
            $("#mapSection").append("<iframe id='map' src='" + geolocation.apiURL + location.coords.latitude + "," + location.coords.longitude + "'></iframe>");
            //document.getElementById("map").setAttribute("src", geolocation.apiURL + location.coords.latitude + "," + location.coords.longitude);
        }

        var onFailure = function (error) {
            interfaceManager.appendMessageToElementId("> " + error.message, "cmdLog");
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onFailure, { enableHighAccuracy: true });
    },

    constantCheck: function () {
        var onSuccess = function (position) {
            geolocation.setUserCurrentPositions();
        }

        var onError = function (error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
    }
}