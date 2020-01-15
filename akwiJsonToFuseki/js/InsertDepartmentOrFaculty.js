
class InsertDepartmentOrFaculty{

    constructor(fusekiConnector){
        this.fc = fusekiConnector;
    }

    insertDepartmentOrFaculty(){
        /* aim of this method and the object is to generate the sparql command that insertes a DepartmentOrFaculty */
        var fd = this.fc.jsoninput.formularData;

        //check if CollegeOrUniversity is in the schema
        var cid = this.fc.checkCollegeExists(fd.legalName);
        if(!cid){
            window.alert("Given CollegeOrUniversity is not in the schema. Can not insert faculty because the university does not exist.");
            throw new Error("CollegeOrUniversity ID not found by select statement.");
        }
        //check if specific DepartmentOrFaculty is not already in the schema
        var faculty = this.fc.checkFacultyExists(fd.legalName, fd.name);
        if(faculty){
            window.alert("Faculty already exists. It can not be inserted.");
            throw new Error("Faculty ID found by select statement. Faculty can not be inserted.");
        }
        //generate id for DepartmentOrFaculty
        var fid = this.fc.generateId(fd.legalName,"_" + fd.name); //generate ids for sparql query
        
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi:  <https://bmake.th-brandenburg.de/akwi/>
            Insert{
            <${cid}> schema:department ${fid}.
            ${fid} a akwi:DepartmentOrFaculty;
                   schema:name "${fd.name}".
            }
            Where{}
            `;
        return sparqlQuery;
    }

}
