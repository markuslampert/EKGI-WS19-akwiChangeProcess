
class InsertPerson{
    
    constructor(fusekiConnector){
            this.fc = fusekiConnector;
    }

    insertPerson(){
        /* aim of this method and the object is to generate the sparql command that updates a specific person */
        
        var fd = this.fc.jsoninput.formularData;
        //check if CollegeOrUniversity is in the schema
        var cid = this.fc.checkCollegeExists(fd.legalName);
        if(!cid){
            window.alert("Given CollegeOrUniversity is not in the schema. Can not insert Person because the university does not exist.");
            throw new Error("CollegeOrUniversity ID not found by select statement.");
        }
        //check if DepartmentOrFaculty is in the schema
        var fid = this.fc.checkFacultyExists(fd.legalName, fd.name);
        if(!fid){
            window.alert("Given faculty is not in the schema. Can not insert Person because the faculty does not exist.");
            throw new Error("Faculty ID not found by select statement.");
        }
        //check if specific Person is not already in the schema
        var pid = this.fc.checkPersonExists(fd.familyName, fd.givenName);
        if(pid){
            window.alert("Person already exists. It can not be inserted.");
            throw new Error("Person ID found by select statement. Person can not be inserted.");
        }
        //generate person id
        var pid = this.fc.generateId(fd.givenName+"_"+fd.familyName);    
        
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi: <https://bmake.th-brandenburg.de/akwi/>
            INSERT{
            ${pid} a schema:Person ;
                   schema:familyName "${fd.familyName}" ;
                   schema:givenName "${fd.givenName}" ;
                   schema:honorificPrefix "${fd.honorificPrefix}" ;
                   schema:telephone "${fd.telephone}" ;
                   schema:eMail "${fd.eMail}" .
            <${fid}> schema:employee ${pid} .
            }
            Where{}
            `;
        return sparqlQuery;
    }

}
