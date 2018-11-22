/* Gerencia requisições HTTP */

var httpManager = {
    postHttp: function(url, json){
        interfaceManager.appendMessageToElementId("> En do requisição POST...", "cmdLog");

        cordova.plugin.http.post(url, json, {}, 
        function(response) {
            // prints 200
            interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
            interfaceManager.appendMessageToElementId("> Conteúdo enviado: " + response.data, "cmdLog");
        }, 
        function(response) {
            // prints 403
            interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
            interfaceManager.appendMessageToElementId("> Conteúdo recebido: " + response.error, "cmdLog");
        });
    },

    getHttp: function(){
        interfaceManager.appendMessageToElementId("> Enviando requisição GET...", "cmdLog");

        cordova.plugin.http.get(url, {}, {}, function(response){
            interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
            interfaceManager.appendMessageToElementId("> Conteúdo recebido: " + response.data, "cmdLog");
        }, function(response){
            interfaceManager.appendMessageToElementId("> Servidor " + response.url + "respondeu com a mensagem " + response.status, "cmdLog");
            interfaceManager.appendMessageToElementId("> Conteúdo recebido: " + response.error, "cmdLog");
        });
    }
}