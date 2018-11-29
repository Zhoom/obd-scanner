var storage = {
    array: [],
    tempBuffer: [],

    saveRequest: function (json) {
        var fila = storage.array.push(JSON.stringify(json));
        interfaceManager.appendMessageToElementId("> Conteúdo armazenado para a fila de envio: " + fila, "cmdLog");
    },

    // Envia as informações pendentes dentro do array
    sendPendingRequests: function () {

        // Transfere para um outro array e esvazia o antigo, evita que esta função seja chamada várias vezes.
        storage.tempBuffer = storage.array;
        storage.array = [];

        var intr = setInterval(function () {
            var json = storage.tempBuffer.pop();
            interfaceManager.appendMessageToElementId("> Limpando storage: " + json, "cmdLog");
            httpManager.postHttp(app.apiURL, JSON.stringify(json));

            if (storage.tempBuffer.length <= 0) clearInterval(intr);
        }, 1000);
    },
}