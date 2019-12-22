
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
            case "UpdateCollegeOrUniversity": sparqlQuery = new UpdateCollegeOrUniversity(this).updateCollegeOrUniversity(); break;
            case "UpdateCourse": sparqlQuery = new UpdateCourse(this).updateCourse(); break;
            case "UpdateDepartmentOrFaculty": sparqlQuery = new UpdateDepartmentOrFaculty(this).updateDepartmentOrFaculty(); break;
            case "UpdatePerson": sparqlQuery = new UpdatePerson(this).updatePerson(); break;
            case "InsertCollegeOrUniversity": sparqlQuery = new InsertCollegeOrUniversity(this).insertCollegeOrUniversity(); break;
            case "InsertDepartmentOrFaculty": sparqlQuery = new InsertDepartmentOrFaculty(this).insertDepartmentOrFaculty(); break;
            case "InsertPerson": sparqlQuery = new InsertPerson(this).insertPerson(); break;
        }
        return sparqlQuery;
    }

    buildUpdateBlock(fd, placeholder = false, prefixes = []){
        var tmp = "";
        var k=1; // sequence to generate place holder
        var i=0; // sequence to iterate prefixes
        for(var key in fd){
            if(!(key.startsWith("id_"))){// skip ids
                var fdvalue = fd[key]; // Check if attribute value is a number. If yes, do not put them into quotation marks.
                if(isNaN(fdvalue)){fdvalue = '"'+fdvalue+'"';}
                tmp += (!prefixes.length ? 'schema:' : prefixes[i++]) + key + ' '
                       + (placeholder ? ("?"+(k++)) : fdvalue) + ';';
                // If there are no prefixes for attributes given, all attrinutes get prefix schema.
            }
        }
        tmp = tmp.slice(0, -1) + '.';
        return tmp;
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

    generateId(attribute, postfix="", prefix="akwi:", seperator="_"){
        /* Spaces are replaced by the seperator symbols. Postfix and prefix are added to the attribute.
           Returns a string with lowercase characters.
        */
        prefix = prefix.replace(" ", seperator);
        attribute = attribute.replace(" ", seperator);
        postfix = postfix.replace(" ", seperator);
        return (prefix + attribute + postfix).toLowerCase();   
    }
    
    checkCollegeExists(id_legalName){
        /*returns id of specific CollegeOrUniversity object or false*/
        var tmp = `  
        PREFIX schema: <https://schema.org/>
        Select ?s
        Where{
            ?s a schema:CollegeOrUniversity;
                schema:legalName "${id_legalName}".
        }
        `;
        var answerObj = this.query(tmp);      
        var cid;
        try{console.log(tmp);
            cid = answerObj.results.bindings[0].s.value;
        }
        catch(e){
            return false;
        }
        return cid;
    }

    checkFacultyExists(legalName, name){
        /*returns id of specific DepartmentOrFaculty object or false*/
        var tmp = `      
            PREFIX schema: <https://schema.org/>
            PREFIX akwi: <https://bmake.th-brandenburg.de/akwi/>
            Select ?s
            Where{
                ?s a akwi:DepartmentOrFaculty;
                    schema:name "${name}".
                ?s ^schema:department ?2.
                ?2 schema:legalName "${legalName}".
            }
            `;
        var answerObj = this.query(tmp);      
        var fid;
        try{console.log(tmp);
            fid = answerObj.results.bindings[0].s.value;
        }
        catch(e){
            return false;
        }
        return fid;
    }

    checkPersonExists(familyName, givenName){
        /*returns id of specific Person object or false*/
        var tmp = `
            PREFIX schema: <https://schema.org/>
            Select ?s
            Where{
            ?s a schema:Person;
                schema:familyName "${familyName}";
                schema:givenName "${givenName}".
            }
        `;
        var answerObj = this.query(tmp);      
        var pid;
        try{console.log(tmp);
            pid = answerObj.results.bindings[0].s.value;
        }
        catch(e){
            return false;
        }
        return pid;
    }

}
