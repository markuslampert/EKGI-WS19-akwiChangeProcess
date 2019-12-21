
class InsertCollegeOrUniversity{

    constructor(fusekiConnector){
        this.fc = fusekiConnector;
    }

    generateId(attribute, postfix="", prefix="akwi:", seperator="_"){
        return (prefix + attribute.replace(" ", seperator) + postfix).toLowerCase();   
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
        var answerObj = this.fc.query(tmp);      
        var cid;
        try{console.log(tmp);
            cid = answerObj.results.bindings[0].s.value;
        }
        catch(e){
            return false;
        }
        return cid;
    }

    insertCollegeOrUniversity(){
        /* aim of this method and the object is to generate the sparql command that insertes a CollegeOrUniversity */
        var fd = this.fc.jsoninput.formularData;
        
        var college = this.checkCollegeExists(fd.legalName); //check if specific CollegeOrUniversity is already in the schema
        if(college){
            window.alert("College already exists. It can not be inserted.");
            throw new Error("College ID found by select statement. College can not be inserted.");
        }
        var cid = this.generateId(fd.legalName); //generate ids for sparql query
        var cpaid = this.generateId(fd.legalName,"_pa"); //id for postal address of college
        
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi:  <https://bmake.th-brandenburg.de/akwi/>
            INSERT{
            ${cid}
                a schema:CollegeOrUniversity; 
                schema:legalName "${fd.legalName}";
                schema:url "${fd.url}";
                schema:address ${cpaid}.
                ${cpaid} schema:addressCountry "${fd.addressCountry}";
                schema:addressLocality "${fd.addressLocality}";
                schema:addressRegion "${fd.addressRegion}";
                schema:postalCode "${fd.postalCode}";
                schema:streetAddress "${fd.streetAddress}".
            }
            WHERE {}
            `;
        return sparqlQuery;
    }

}
