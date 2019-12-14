
class UpdatePerson{
    
    constructor(fusekiConnector){
            this.fc = fusekiConnector;
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
        var answerObj = this.fc.query(tmp);      
        var pid;
        try{console.log(tmp);
            pid = answerObj.results.bindings[0].s.value;
        }
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
        /* aim of this method and the object is to generate the sparql command that updates a specific person */
        var fd = this.fc.jsoninput.formularData;
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

}
