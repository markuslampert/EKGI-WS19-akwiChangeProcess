
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
            case "UpdatePerson": sparqlQuery = this.updatePerson(); break;
        }
        return sparqlQuery;
    }

    selectPersonID(name, firstname){
        var tmp = `
            PREFIX schema: <https://schema.org/>
            Select ?s
            Where{
            ?s a schema:Person;
                schema:familyName "${name}";
                schema:givenName "${firstname}".
            }
        `;
        var answerObj = this.query(tmp);      
        var pid;
        try{console.log(tmp); pid = answerObj.results.bindings[0].s.value;}
        catch(e){
            window.alert("ID Error: Data set can not be found. Check Ids in Json input.");
            throw new Error("Person ID not found by Select statement.");
        }
        return pid;
    }
    
    buildUpdateBlock(fd, placeholder = false){
        var tmp = "";
        var k=1; // sequence to generate place holder
        for(var key in fd){
            if(!(key.startsWith("id_"))){// skip ids
                tmp += 'schema:'+ key + ' '+ (placeholder ? ("?"+(k++)) : ('"'+fd[key]+'"')) + ';';   
            }
        }
        tmp = tmp.slice(0, -1) + '.';
        return tmp;
    }

    updatePerson(){
        var fd = this.jsoninput.formularData;
        var pid = this.selectPersonID(fd.id_familyName, fd.id_givenName);
        var ub = this.buildUpdateBlock(fd);
        var ubwp = this.buildUpdateBlock(fd, true); // UpdateBlock with Placeholder
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/> 
            DELETE {
            <${pid}> ${ubwp}
            }
            INSERT{
            <${pid}> ${ub} 
            }
            Where{
            <${pid}> ${ubwp}
            }
            `;
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
