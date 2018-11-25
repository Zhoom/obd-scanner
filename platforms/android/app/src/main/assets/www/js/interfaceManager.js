/* Gerencia a interface da aplicação */
var interfaceManager = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function(){
        document.addEventListener('deviceready', interfaceManager.onDeviceReady, false);
        debugButton.addEventListener('touchend', interfaceManager.manageConsoleVisibility, false);
        menuButton.addEventListener('touchend', interfaceManager.manageDropMenu, false);
        conectivityButton.addEventListener('touchend', interfaceManager.conectivityPage, false);
        carInfoButton.addEventListener('touchend', interfaceManager.carInfoPage, false);
        carProblemsButton.addEventListener('touchend', interfaceManager.carProblemsPage, false);
        storesButton.addEventListener('touchend', interfaceManager.storesPage, false);
        carLogButton.addEventListener('touchend', interfaceManager.carLogPage, false);
        searchPairesDeviceButton.addEventListener('touchend', interfaceManager.pairedSection, false);
        searchUpairedDeviceButton.addEventListener('touchend', interfaceManager.unpairedSection, false);  
    },
    
    onDeviceReady: function(){
        interfaceManager.conectivityPage();
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
    },

    manageDropMenu: function(){
        var dropMenu = document.getElementById("dropMenu");

        if(dropMenu.style.display == "none"){
            interfaceManager.showElementById("dropMenu");
        } else {
            interfaceManager.hideElementById("dropMenu");
        }
    },

    conectivityPage: function(){
        interfaceManager.changePageOnMenu("conectivityButton",
                                    "carInfoButton",
                                    "carProblemsButton",
                                    "storesButton",
                                    "carLogButton"
        );

        interfaceManager.changePage("connectivitySection", "mapSection");
    },

    carInfoPage: function(){
        interfaceManager.changePageOnMenu("carInfoButton",
                                    "conectivityButton",
                                    "carProblemsButton",
                                    "storesButton",
                                    "carLogButton"
        );
    },

    carProblemsPage: function(){
        interfaceManager.changePageOnMenu("carProblemsButton",
                                    "conectivityButton",
                                    "carInfoButton",
                                    "storesButton",
                                    "carLogButton"
        );
    },
    storesPage: function(){
        interfaceManager.changePageOnMenu("storesButton",
                                    "conectivityButton",
                                    "carInfoButton",
                                    "carProblemsButton",
                                    "carLogButton"
        );

        interfaceManager.changePage("mapSection", "connectivitySection");
        geolocationPage.setUserCurrentPositions();
    },
    carLogPage: function(){
        interfaceManager.changePageOnMenu("carLogButton",
                                    "conectivityButton",
                                    "carInfoButton",
                                    "carProblemsButton",
                                    "storesButton"
        );
    },

    changePageOnMenu: function(activePage, dPage1, dPage2, dPage3, dPage4){
        document.getElementById(activePage).style.backgroundColor = "#212121";
        document.getElementById(dPage1).style.backgroundColor = "";
        document.getElementById(dPage2).style.backgroundColor = "";
        document.getElementById(dPage3).style.backgroundColor = "";
        document.getElementById(dPage4).style.backgroundColor = "";
    },

    changePage: function(activePage, dPage1){
        interfaceManager.showElementById(activePage);
        interfaceManager.hideElementById(dPage1);
        interfaceManager.hideElementById("dropMenu");
        //interfaceManager.hideElementById(dPage2);
        //interfaceManager.hideElementById(dPage3);
        //interfaceManager.hideElementById(dPage4);
    },

    changeTab: function(tab1, tab2){
        document.getElementById(tab1).style.color = "#5d2360";
        document.getElementById(tab1).style.borderColor = "#501e52";
        document.getElementById(tab2).style.color = "#333333";
        document.getElementById(tab2).style.borderColor = "#333333";
    }
}

interfaceManager.initialize();