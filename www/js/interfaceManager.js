/* Gerencia a interface da aplicação */
var interfaceManager = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function(){
        debugButton.addEventListener('touchend', interfaceManager.manageConsoleVisibility, false);
    },
    
    /* Cria uma mensagem e inseri em um elemento */
    appendMessageToElementId: function(message, id){
        // cmdLog está hardcoded pois não estava funcionando ao passar o nome do elemento como parametro.
        var elementMaster = document.getElementById(id);
        var elementP = document.createElement("P");
        var messageP = document.createTextNode(message);

        elementP.appendChild(messageP);
        elementMaster.appendChild(elementP);

        $('#cmdLog').scrollTop($('#cmdLog').scrollTop() + 100);
    },

    /* Cria uma mensagem com o atributo onClick e inseri em um elemento */
    appendMessageWithOnClickToElementId: function(message, element, functionCall){
        var elementMaster = document.getElementById(element);
        var elementP = document.createElement("P");
        var messageP = document.createTextNode(message);

        elementP.setAttribute("onclick", functionCall);

        elementP.appendChild(messageP);
        elementMaster.appendChild(elementP);
    },

    /* Exibe um elemento na interface que estava oculto */
    showElementById: function(element){
        document.getElementById(element).style.display = "block";
    },

    /* Esconde um elemento na interface */
    hideElementById: function(element){
        document.getElementById(element).style.display = "none";
    },

    /* Esconde um elemento e exibe outro */
    swapVisibilityById: function(elementToHide, elementToShow){
        document.getElementById(elementToHide).style.display = "none";
        document.getElementById(elementToShow).style.display = "block";
    },

    /* Limpa o conteudo de um elemento */
    clearList: function(element){
        document.getElementById(element).textContent = '';
    },

    /* Esconde/exibe a tela de log */
    manageConsoleVisibility: function(){
        if($("#nightlyMode").height() == 40){
            $("#nightlyMode").animate({
                height: "+=120px"
              }, 100, function() {
                // 
              });
        } else {
            $("#nightlyMode").animate({
                height: "-=120px"
              }, 100, function() {
                // 
              });
        }
    },

    changeElementIdTextContent: function(element, text){
        document.getElementById(element).textContent = text;
    }
}

interfaceManager.initialize();