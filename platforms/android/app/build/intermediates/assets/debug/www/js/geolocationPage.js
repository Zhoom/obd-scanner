var geolocation = {
    URL: "http://192.168.0.200:3000/stores/@",
    userPosX: "",
    userPosY: "",

    initialize: function(){
        geolocation.bindEvents();
    },

    bindEvents: function(){
        document.addEventListener('deviceready', geolocation.onDeviceReady, false);
    },

    onDeviceReady: function(){
        geolocation.setUserCurrentPositions();
        //geolocation.constantCheck();
    },

    setUserCurrentPositions: function(){
        document.getElementById("map").setAttribute("src", "");

        var onSuccess = function(location){
            document.getElementById("map").setAttribute("src", geolocation.URL + location.coords.latitude + "," + location.coords.longitude);
        }

        var onFailure = function(error){
            interfaceManager.appendMessageToElementId("> " + error.message, "cmdLog");
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onFailure, { enableHighAccuracy: true });
    },

    constantCheck: function(){
        var onSuccess= function(position) {
            geolocation.setUserCurrentPositions();
        }

        var onError = function(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    
        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
    }
}
geolocation.initialize();