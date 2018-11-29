/* Gerencia requisições HTTP */

var httpManager = {
    postHttp: function (url, json) {
        interfaceManager.appendMessageToElementId("> Enviando requisição POST...", "cmdLog");

        cordova.plugin.http.post(url, json, {},
            function (response) {
                // prints 200
                interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
                interfaceManager.appendMessageToElementId("> Conteúdo enviado: " + response.data, "cmdLog");

                if (storage.array.length > 0) {
                    interfaceManager.appendMessageToElementId("> Requisições pendentes estão sendo enviadas", "cmdLog");
                    //app.stopSendingRequests(); // Para de enviar requisições ao OBD
                    storage.sendPendingRequests(); // Começa a enviar pro servidor as informações pendentes
                    //app.sendRequests(); // Começa a enviar requisições pro OBD
                    interfaceManager.appendMessageToElementId("> Requisições pendentes foram enviadas", "cmdLog");
                }
            },
            function (response) {
                interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
                interfaceManager.appendMessageToElementId("> Conteúdo recebido: " + response.error, "cmdLog");

                if (response.status == "-1" || response.url == "undefined") {
                    interfaceManager.appendMessageToElementId("> -1 ok", "cmdLog");
                    storage.saveRequest(json);
                }
            });
    },

    getHttp: function (url) {
        interfaceManager.appendMessageToElementId("> Enviando requisição GET...", "cmdLog");

        cordova.plugin.http.get(url, {}, {}, function (response) {
            interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
            interfaceManager.appendMessageToElementId("> Conteúdo recebido: " + response.data, "cmdLog");
        }, function (response) {
            interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
            interfaceManager.appendMessageToElementId("> Conteúdo recebido: " + response.error, "cmdLog");
        });
    }
}