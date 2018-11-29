var troublecodes = {
    apiURL: "http://192.168.0.200:3000/troublecodes/@",

    loadTroubleCodes: function () {
        $("#troubleCodesSection").append("<iframe id='troublecodes' src='" + troublecodes.apiURL + app.macAddress + "'></iframe>");
    },

}