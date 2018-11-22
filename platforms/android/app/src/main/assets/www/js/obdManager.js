/* Funções para realizar os cálculos necessários das informações que o OBD enviou */

var obdManager = {

    // PID 03
    getFuelSystemStatus: function(){

    },

    // PID 04
    getCalculatedEngineLoad: function(byteA){
        return (parseInt(byteA, 16) / 2.55);
    },

    // PID 05
    getEngineCoolantTemperature: function(byteA){
        return (parseInt(byteA, 16) - 40);
    },

    // PID 06, 07, 08 e 09
    getFuelTrim: function(byteA){
        return ((parseInt(byteA, 16) / 1.28) - 100);
    },

    // PID 0A
    getFuelPressure: function(byteA){
        return (parseInt(byteA, 16) * 3);
    },

    // PID 0B
    getIntakeManifoldAbsolutePressure: function(byteA){
        return parseInt(byteA, 16);
    },

    // PID 0C
    getRPM: function(byteA, byteB){
        return (((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 4);
    },

    // PID 0D
    getVehicleSpeed: function(byteA){
        return parseInt(byteA, 16);
    },

    // PID 0E
    getTimingAdvance: function(byteA){
        return ((parseInt(byteA, 16) / 2) - 64);
    },

    // PID 0F
    getIntakeAirTemperature: function(byteA){
        return (parseInt(byteA, 16) - 40);
    },

    // PID 10
    getMafAirFlowRate: function(byteA, byteB){
        (((parseInt(byteA, 16) * 256) + byteB) / 100);
    },

    // PID 11
    getThrottlePosition: function(byteA){
        return (parseInt(byteA, 16) / 2.55);
    },

    // PID 12
    getCommandedSecondaryAirStatus: function(byteA, byteB, byteC, byteD){
        //bitcoded
    },

    // PID 13
    getOxygenSensorsPresentIn2Banks: function(){
        // ??
    },

    // PID 14, 15, 16, 17, 18, 19, 1A e 1B
    getOxygenSensorVoltageAndShortTermFuelTrim: function(byteA, byteB){
        var oxygenSensor = { 
            voltage: (parseInt(byteA, 16) / 200), 
            shortTermFuelTrim: (((100 / 128) * parseInt(byteB, 16)) - 100)
        };
        return oxygenSensor;
    },

    // PID 1C
    getObdStandards: function(byteA){
        //bitcoded
    },

    // PID 1D
    getOxygenSensorsPresentIn4Banks: function(byteA){
        // Não entendi o cálculo
    },

    // PID 1E
    getAuxiliaryInputStatus: function(byteA){
        //
    },

    // PID 1F
    getRunTimeSinceEngineStart: function(byteA, byteB){
        return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16))
    },
}