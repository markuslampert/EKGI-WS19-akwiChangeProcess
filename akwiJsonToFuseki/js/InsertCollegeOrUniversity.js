
class InsertCollegeOrUniversity{

    constructor(fusekiConnector){
        this.fc = fusekiConnector;
    }

    insertCollegeOrUniversity(){
        /* aim of this method and the object is to generate the sparql command that insertes a CollegeOrUniversity */
        var fd = this.fc.jsoninput.formularData;
        
        var college = this.fc.checkCollegeExists(fd.legalName); //check if specific CollegeOrUniversity is not already in the schema
        if(college){
            window.alert("College already exists. It can not be inserted.");
            throw new Error("College ID found by select statement. College can not be inserted.");
        }
        var cid = this.fc.generateId(fd.legalName); //generate ids for sparql query
        var cpaid = this.fc.generateId(fd.legalName,"_pa"); //id for postal address of college
        
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
