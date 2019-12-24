
class DeleteCollegeOrUniversity{
    
    constructor(fusekiConnector){
        this.fc = fusekiConnector;
    }

    check(fd){
        //check if CollegeOrUniversity is in the schema
        var cid = this.fc.checkCollegeExists(fd.legalName);
        if(!cid){
            window.alert("Given CollegeOrUniversity is not in the schema.");
            throw new Error("CollegeOrUniversity ID not found by select statement.");
        }
        if(this.fc.checkDependencyFaculty(cid)){
            window.alert("Cannot delete. At least one faculty is connected to this university.");
            throw new Error("Dependency DepartmentOrFaculty.");
        }
        return cid;
    }

    deleteCollegeOrUniversity(){
        var fd = this.fc.jsoninput.formularData;
        var cid = this.check(fd);
        console.log("here");
        var sparqlQuery = `
        PREFIX schema: <https://schema.org/>
        PREFIX akwi:  <https://bmake.th-brandenburg.de/akwi/> 
        DELETE {
        <${cid}> a schema:CollegeOrUniversity;
            schema:legalName ?1;
            schema:url ?2;
            schema:address ?3.
        ?3 schema:addressCountry ?4;
            schema:addressLocality ?5;
            schema:addressRegion ?6;
            schema:postalCode ?7;
            schema:streetAddress ?8.
        }
        Where{
        <${cid}> a schema:CollegeOrUniversity;
            schema:legalName ?1;
            schema:url ?2;
            schema:address ?3.
        ?3 schema:addressCountry ?4;
            schema:addressLocality ?5;
            schema:addressRegion ?6;
            schema:postalCode ?7;
            schema:streetAddress ?8.
        }
        `;
        return sparqlQuery;
    }

}
