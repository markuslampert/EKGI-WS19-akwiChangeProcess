
class DeletePerson{
    
    constructor(fusekiConnector){
            this.fc = fusekiConnector;
    }

    check(fd){
        /*Checks if schema and input are valid to delete the specific object.*/
        
        //check if CollegeOrUniversity is in the schema
        var cid = this.fc.checkCollegeExists(fd.legalName);
        if(!cid){
            window.alert("Given CollegeOrUniversity is not in the schema.");
            throw new Error("CollegeOrUniversity ID not found by select statement.");
        }
        //check if DepartmentOrFaculty is in the schema
        var fid = this.fc.checkFacultyExists(fd.legalName, fd.name);
        if(!fid){
            window.alert("Given faculty is not in the schema.");
            throw new Error("Faculty ID not found by select statement.");
        }
        //check if specific Person is in the schema
        var pid = this.fc.checkPersonExists(fd.familyName, fd.givenName);
        if(!pid){
            window.alert("Given Person is not in the schema.");
            throw new Error("Person ID not found by select statement.");
        }
        return [pid, fid];
    }

    deletePerson(){
        var fd = this.fc.jsoninput.formularData;
        var tmps = this.check(fd);
        var pid = tmps[0]; 
        var fid = tmps[1];

        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi: <https://bmake.th-brandenburg.de/akwi/> 
            DELETE {
            <${pid}> a schema:Person ;
                schema:familyName ?1 ;
                schema:givenName ?2 ;
                schema:honorificPrefix ?3 ;
                schema:telephone ?4 ;
                schema:eMail ?5 .
            <${fid}> schema:employee <${pid}> .
            }
            Where{
            <${pid}> a schema:Person ;
                     schema:familyName ?1 ;
                     schema:givenName ?2 ;
                     schema:honorificPrefix ?3 ;
                     schema:telephone ?4 ;
                     schema:eMail ?5 .
            <${fid}> schema:employee <${pid}> .
            }
        `;
        return sparqlQuery;
    }

}
