var logOBD = {
    apiURL: "http://192.168.0.200:3000/obd/data/@",

    loadLog: function () {
        $("#obdLogSection").append("<iframe id='obdLog' src='" + logOBD.apiURL + app.macAddress + "'></iframe>");
    },

}