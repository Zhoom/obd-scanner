var dataManager = {
    transformOBDdata: function(string){
        if(string.charAt(0) == ">"){
            string = string.substring(1);
        }

        string = string.replace(/\s+/g, '');

        return string;
    }
}