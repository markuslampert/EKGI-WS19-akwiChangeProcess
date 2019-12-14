
class FusekiConnector{

    constructor(jsonString){
        var jiv = new JsonInputValidator();
        var validJsonInput = jiv.checkJsonInput(jsonString);
        if(validJsonInput){
            this.jsoninput = JSON.parse(jsonString);
        }
    }
    sendQuery(){
        /* main procedure of this object is called from outside */
        var sparqlQuery = this.createQuery(); //creates the specific query
        console.log(sparqlQuery);
        this.query(sparqlQuery, "sparql-update"); //submit sparql Querry
        window.alert("Sparql queries are sended to Fuseki.");
    }

    createQuery(){
        /* selects the specific function to create the query and calls it */
        var sparqlQuery;
        switch(this.jsoninput.modus){
            case "UpdatePerson": sparqlQuery = new UpdatePerson(this).updatePerson(); break;
        }
        return sparqlQuery;
    }

    query(body, content_type="sparql-query", url=fusekiUrlConfig){
        /* fusekiUrlConfig is global and comes from config.js
           body is sparql-query as String
        */

        const Http = new XMLHttpRequest();
        Http.open("POST", url, false);
        Http.setRequestHeader("Content-type", ("application/"+content_type));
        try{
            Http.send(body);
        }
        catch(e){
            window.alert("Network Error. Check Internet connection.")
        }

        Http.onreadystatechange = function() { //Error stops the script
            if (Http.readyState == 4  ) { // 4 means that request is done
                if(Http.status!=200){
                    window.alert("And Error occured with the request. Check internet connection.");
                    throw new Error("Error status code != 200");
                }
            }
        }

        if(!Http.responseText){
            //sparql-query answer has no body
            return;
        }
        //sparql-update has a body
        return JSON.parse(Http.responseText);
    }

}
