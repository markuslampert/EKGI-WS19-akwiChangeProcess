
class DeleteDepartmentOrFaculty{
    
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
        //check if DepartmentOrFaculty is in the schema
        var fid = this.fc.checkFacultyExists(fd.legalName, fd.name);
        if(!fid){
            window.alert("Given faculty is not in the schema.");
            throw new Error("Faculty ID not found by select statement.");
        }
        if(this.fc.checkDependencyCourse(fid)){
            window.alert("Cannot delete. At least one course is connected to this faculty.");
            throw new Error("Dependency Course.");
        }
        if(this.fc.checkDependencyPerson(fid)){
            window.alert("Cannot delete. At least one person is connected to this faculty.");
            throw new Error("Dependency Person.");
        }
        return [cid, fid];
    }

    deleteDepartmentOrFaculty(){
        var fd = this.fc.jsoninput.formularData;
        var tmps = this.check(fd);
        var cid = tmps[0];
        var fid = tmps[1];
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi:  <https://bmake.th-brandenburg.de/akwi/>
            Delete{
            <${cid}> schema:department <${fid}>.
            <${fid}> a akwi:DepartmentOrFaculty;
                     schema:name ?1.
            }
            Where{
            <${cid}> schema:department <${fid}>.
            <${fid}> a akwi:DepartmentOrFaculty;
                     schema:name ?1.
            }
        `;
        return sparqlQuery;
    }

}
