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

    convertCodesAndInsertInJSON: function(code){

        // Criação do arquivo JSON que será
        JSONTemplate["MAC Address"] = app.macAddress;
        JSONTemplate["Date"] = Date.now;

        if(code.charAt(0) == 4 && code.charAt(1) == 1){
            if(code.charAt(2) == 0 && code.charAt(3) == 4)
                JSONTemplate["Calculated Engine Load (%)"] = obdManager.getCalculatedEngineLoad(code.charAt(4) + '' + code.charAt(5));

            if(code.charAt(2) == 0 && code.charAt(3) == 5)
                JSONTemplate["Engine Coolant Temperature (°C)"] = obdManager.getEngineCoolantTemperature(code.charAt(4) + '' + code.charAt(5));

            if(code.charAt(2) == 0 && code.charAt(3) == 6)
                JSONTemplate["Fuel Trim"]["Bank 1"]["Short Term (%)"] = obdManager.getFuelTrim(code.charAt(4) + '' + code.charAt(5));

            if(code.charAt(2) == 0 && code.charAt(3) == 7)
                JSONTemplate["Fuel Trim"]["Bank 1"]["Long Term (%)"] = obdManager.getFuelTrim(code.charAt(4) + '' + code.charAt(5));
            
            if(code.charAt(2) == 0 && code.charAt(3) == 8)
                JSONTemplate["Fuel Trim"]["Bank 2"]["Short Term (%)"] = obdManager.getFuelTrim(code.charAt(4) + '' + code.charAt(5));

            if(code.charAt(2) == 0 && code.charAt(3) == 9)
                JSONTemplate["Fuel Trim"]["Bank 2"]["Long Term (%)"] = obdManager.getFuelTrim(code.charAt(4) + '' + code.charAt(5));
                
            if(code.charAt(2) == 0 && code.charAt(3) == 'A')
                JSONTemplate["Fuel Pressure (kPa)"] = obdManager.getFuelPressure(code.charAt(4) + '' + code.charAt(5));
            
            if(code.charAt(2) == 0 && code.charAt(3) == 'B')
                JSONTemplate["Intake Manifold Absolute Pressure (kPa)"] = obdManager.getIntakeManifoldAbsolutePressure(code.charAt(4) + '' + code.charAt(5));

            if(code.charAt(2) == 0 && code.charAt(3) == 'C')
                JSONTemplate["Engine RPM (rpm)"] = obdManager.getRPM(code.charAt(4) + '' + code.charAt(5), code.charAt(6) + '' + code.charAt(7));

            if(code.charAt(2) == 0 && code.charAt(3) == 'D')
                JSONTemplate["Vehicle speed (km/h)"] = obdManager.getVehicleSpeed(code.charAt(4) + '' + code.charAt(5));

            if(code.charAt(2) == 0 && code.charAt(3) == 'E')
                JSONTemplate["Timing advance (°)"] = obdManager.getTimingAdvance(code.charAt(4) + '' + code.charAt(5));
            
        } else {
            //interfaceManager.appendMessageToElementId("> O OBD não deu uma resposta válida", "cmdLog");
        }
    }
}