
/* Gerência o dispositivo */
var app = {
    macAddress: "",
    deviceName: "",
    apiURL: "http://192.168.0.200:3000/obd/data/",

    /*
        Construtor da aplicação.
    */
    initialize: function () {
        this.bindEvents();
    },

    /*
        Associa os botões da interface com a funções criadas.
    */
    bindEvents: function () {
        document.addEventListener('deviceready', app.onDeviceReady, false);
        searchPairedDeviceButton.addEventListener('touchend', app.findPairedDevice, false);
        searchUnpairedDeviceButton.addEventListener('touchend', app.findUnpairedDevice, false);
        disconnectDevice.addEventListener('touchend', app.manageConnection(app.deviceName.app.macAddress), false);
        document.addEventListener('onunload', app.alertTest, false);
    },

    alertTest: function () {
        httpManager.getHttp("http://192.168.0.200:3000/test");
    },

    /*
        Esta função é automaticamente executada quando o aplicativo está pronto para ser usado
        É aqui que deve ficar tudo que for pos-processamento para ser chamado na tela inicial do aplicativo.
    */
    onDeviceReady: function () {
        if (cordova.platformId == 'android') {
            StatusBar.backgroundColorByHexString("#000000");
        }

        cordova.plugin.http.setDataSerializer('json');
        cordova.plugin.http.setSSLCertMode('nocheck', function () {
            interfaceManager.appendMessageToElementId("> Não está verificando por certificados SSL", "cmdLog");
        }, function () {
            interfaceManager.appendMessageToElementId("> Error ao definir certificado SSL", "cmdLog");
        });

        interfaceManager.appendMessageToElementId("> Sistema iniciado", "cmdLog");
        app.findPairedDevice();
    },

    connectionError: function () {
        interfaceManager.appendMessageToElementId("> Erro de conexão (Você foi desconectado)", "cmdLog");
        app.endConnection();
    },

    endConnection: function () {
        app.stopSendingRequests();
        interfaceManager.hideElementById("connectedDevice");
        document.getElementById("containerList").style.top = "122px";
    },

    finishConnection: function () {
        interfaceManager.appendMessageToElementId("> Desconectando...", "cmdLog");

        var success = function () {
            interfaceManager.appendMessageToElementId("> Desconectado de " + app.macAddress, "cmdLog");
        }
        // Tenta abrir uma conexão com o dispositivo especificado
        app.endConnection();
        bluetoothSerial.disconnect(success);
    },

    /*
        Estabelece uma conexão Bluetooth com o endereço MAC especificado.
    */
    manageConnection: function (dName, dMac) {
        app.macAddress = dMac;
        app.deviceName = dName;

        // bluetoothSerial.isEnabled - On Success
        var bTrue = function () {

            var connected = function () {
                app.finishConnection();
            }

            var disconnected = function () {
                interfaceManager.appendMessageToElementId("> Conectando...", "cmdLog");

                // Tenta abrir uma conexão com o dispositivo especificado
                bluetoothSerial.connect(app.macAddress, app.deviceInteraction, app.connectionError);
            }

            bluetoothSerial.isConnected(connected, disconnected);

        }

        // bluetoothSerial.isEnabled - On Failure
        var bFalse = function () {
            interfaceManager.appendMessageToElementId("> Habilitando Bluetooth...", "cmdLog");
            bluetoothSerial.enable(

                // bluetoothSerial.enable - On Success
                function () {
                    interfaceManager.appendMessageToElementId("> O Bluetooth foi ativado.", "cmdLog");
                    app.findUnpairedDevice();
                },

                // bluetoothSerial.enable - On Failure
                function () {
                    interfaceManager.appendMessageToElementId("> Permissão para ativar o Bluetooth foi negada.", "cmdLog");
                }
            );
        }

        // É verificado na hora da listagem e na hora de tentar conectar com o dispositivo
        // Para caso o bluetooth tenha sido desativado depois de ter feita a listagem.
        bluetoothSerial.isEnabled(bTrue, bFalse);
    },

    /*
        Busca por dispositivos não pareados
    */
    findUnpairedDevice: function () {
        interfaceManager.clearList("unpairedDevicesList");
        interfaceManager.swapVisibilityById("pairedDevicesSection", "loadingSection");
        interfaceManager.changeTab("searchUnpairedDeviceButton", "searchPairedDeviceButton");
        interfaceManager.appendMessageToElementId("> Tentando encontrar por dispositivos não pareados...", "cmdLog");

        //  bluetoothSerial.isEnabled - On Success
        var bTrue = function () {

            // Busca por dispositivos próximos
            bluetoothSerial.discoverUnpaired(

                // bluetoothSerial.discoverUnpaired - On Success
                function (results) {
                    interfaceManager.swapVisibilityById("loadingSection", "unpairedDevicesSection");

                    if (results.length <= 0) {
                        interfaceManager.appendMessageToElementId("> Nada encontrado.", "cmdLog");
                        interfaceManager.appendMessageToElementId("Nada encontrado", "unpairedDevicesList");
                    } else {
                        interfaceManager.appendMessageToElementId("> Dispositivo encontrado.", "cmdLog");
                        // Cria um botão para cada dispositivo para poder estabelecer uma conexão
                        results.forEach(element => {
                            interfaceManager.appendMessageWithOnClickToElementId(
                                "Dispositivo: " + element.name + " (" + element.address + ")",
                                "unpairedDevicesList",
                                "app.manageConnection('" + element.name + "', '" + element.address + "')"
                            );
                        });
                    }

                },

                // bluetoothSerial.discoverUnpaired - On Failure
                function (error) {
                    interfaceManager.appendMessageToElementId("> Falha ao buscar por dispositivos não pareados", "cmdLog");
                }
            );
        }

        //  bluetoothSerial.isEnabled - On Failure
        var bFalse = function () {
            interfaceManager.appendMessageToElementId("> Habilitando Bluetooth...", "cmdLog");

            // Pede permissão para ativar o bluetooth
            bluetoothSerial.enable(

                // bluetoothSerial.enable - On Success
                function () {
                    interfaceManager.appendMessageToElementId("> O Bluetooth foi ativado.", "cmdLog");
                    app.findUnpairedDevice();
                },
                // bluetoothSerial.enable - On Failure
                function () {
                    interfaceManager.appendMessageToElementId("> Permissão para ativar o Bluetooth foi negada.", "cmdLog");
                }
            );
        }

        // Verifica se o bluetooth está ativado
        bluetoothSerial.isEnabled(bTrue, bFalse);
    },


    /*
        Busca por dispositivos que estão pareados
    */
    findPairedDevice: function () {
        interfaceManager.clearList("pairedDevicesList");
        interfaceManager.swapVisibilityById("unpairedDevicesSection", "loadingSection");
        interfaceManager.changeTab("searchPairedDeviceButton", "searchUnpairedDeviceButton");

        interfaceManager.appendMessageToElementId("> Tentando encontrar por dispositivos pareados...", "cmdLog");

        // Busca por dispositivos pareados
        bluetoothSerial.list(

            // bluetoothSerial.list - On Success
            function (results) {
                interfaceManager.swapVisibilityById("loadingSection", "pairedDevicesSection");

                if (results.length <= 0) {
                    interfaceManager.appendMessageToElementId("> Nenhum dispositivo pareado", "cmdLog");
                    interfaceManager.appendMessageToElementId("Nada encontrado", "pairedDevicesList");
                } else {
                    interfaceManager.appendMessageToElementId("> Dispositivo encontrado.", "cmdLog");
                    // Cria um botão para cada dispositivo para poder estabelecer uma conexão
                    results.forEach(element => {
                        interfaceManager.appendMessageWithOnClickToElementId(
                            "Dispositivo: " + element.name + " (" + element.address + ")",
                            "pairedDevicesList",
                            "app.manageConnection('" + element.name + "' , '" + element.address + "')"
                        );
                    });
                }

            },

            // bluetoothSerial.list - On Failure
            function (error) {
                interfaceManager.appendMessageToElementId("> Falha ao buscar por dispositivos pareados", "cmdLog");
            }
        );

    },

    /*
        Gerência interações de envio e recebimento de mensagems com o outro dispositivo
    */
    deviceInteraction: function () {
        interfaceManager.appendMessageToElementId("> Conectado a " + app.macAddress, "cmdLog");

        interfaceManager.changeElementIdTextContent("connectedDeviceInfo", "Dispositivo: " + app.deviceName + " (" + app.macAddress + ")");
        document.getElementById("containerList").style.top = "212px";
        interfaceManager.showElementById("connectedDevice");

        app.sendRequests();

        // Cria uma escuta no canal Bluetooth para ficar recebendo as mensagems
        bluetoothSerial.subscribe("\r",
            // bluetoothSerial.subscribe - On Success
            function (data) {
                var code = dataManager.transformOBDdata(data);
                obdManager.convertCodesAndInsertInJSON(code);
            },

            // bluetoothSerial.subscribe - On Failure
            function (error) {
                interfaceManager.appendMessageToElementId("> Erro em ao estabelercer uma conexão para recebimento dos dados." + error, "cmdLog");
            }
        );
    },

    /*
        Envia uma mensagem para o dispositivo ao qual está conectado no momento.
    */
    writeMessage: function (message) {
        bluetoothSerial.write(message + "\r\n",
            // bluetoothSerial.write - On Success
            function () {
                //interfaceManager.appendMessageToElementId("> Mensagem '" + message + "' foi enviada", "cmdLog");

                // bluetoothSerial.write - On Failure
            },
            function () {
                //interfaceManager.appendMessageToElementId("> Mensagem '" + message + "' não foi enviada");
            }
        );
    },

    interval: '',
    /* 
        Envia ou para de enviar requisições para o dispositivo OBD
    */
    sendRequests: function () {
        app.requestManager(true);
    },

    stopSendingRequests: function () {
        if (app.interval.length != 0) {
            clearInterval(app.interval);
            interfaceManager.appendMessageToElementId("> Parando de enviar requisições...", "cmdLog");
            JSONTemplate = cleanJSON;
            app.interval = '';
        } else {
            interfaceManager.appendMessageToElementId("> Não existe requisições sendo enviadas", "cmdLog");
        }
    },

    sleep: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    sendOBDMessages: async function () {
        app.writeMessage("0104");
        await app.sleep(250);
        app.writeMessage("0105");
        await app.sleep(250);
        app.writeMessage("0106");
        await app.sleep(250);
        app.writeMessage("0107");
        await app.sleep(250);
        app.writeMessage("0108");
        await app.sleep(250);
        app.writeMessage("0109");
        await app.sleep(250);
        app.writeMessage("010A");
        await app.sleep(250);
        app.writeMessage("010B");
        await app.sleep(250);
        app.writeMessage("010C");
        await app.sleep(250);
        app.writeMessage("010D");
        await app.sleep(250);
        app.writeMessage("010E");
        await app.sleep(250);
        app.writeMessage("010F");
        await app.sleep(250);
        app.writeMessage("0110");
        await app.sleep(250);
        app.writeMessage("0111");
        await app.sleep(250);
        app.writeMessage("011C");
        await app.sleep(250);
        app.writeMessage("011F");
        await app.sleep(250);
        interfaceManager.appendMessageToElementId("> Requisições enviadas...", "cmdLog");
        //4000ms

        await app.sleep(2500);
        httpManager.postHttp(app.apiURL, JSONTemplate);
        //6500ms
    },

    requestManager: function (sendRequest) {
        var success = function () {
            if (sendRequest) {
                interfaceManager.appendMessageToElementId("> Começando a enviar requisições...", "cmdLog");

                app.interval = setInterval(
                    function () {
                        app.sendOBDMessages();
                    }, 10000);
            }
        }

        var failure = function () {
            interfaceManager.appendMessageToElementId("> Você não está conectado a um dispositivo", "cmdLog");
        }

        bluetoothSerial.isConnected(success, failure);
    }
};

// Inicializa a aplicação
app.initialize();
