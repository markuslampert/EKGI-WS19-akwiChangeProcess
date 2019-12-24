
class InsertCourse{
    
    constructor(fusekiConnector){
            this.fc = fusekiConnector;
    }

    insertCourse(){
        /* aim of this method and the object is to generate the sparql command that inserts a specific course */
        var fd = this.fc.jsoninput.formularData;
        
        //check if CollegeOrUniversity is in the schema
        var cid = this.fc.checkCollegeExists(fd.legalName);
        if(!cid){
            window.alert("Given CollegeOrUniversity is not in the schema. Can not insert course because the university does not exist.");
            throw new Error("CollegeOrUniversity ID not found by select statement.");
        }
        //check if DepartmentOrFaculty is in the schema
        var fid = this.fc.checkFacultyExists(fd.legalName, fd.facultyName);
        if(!fid){
            window.alert("Given faculty is not in the schema.");
            throw new Error("Faculty ID not found by select statement.");
        }
        //check if AlignmentObject is in the schema
        var aid = this.fc.checkAlignmentObjectExists(fd.targetName);
        if(!aid){
            window.alert("Given AlignmentObject is not in the schema. Can not insert course because the AlignmentObject does not exist.");
            throw new Error("AlignmentObject ID not found by select statement.");
        }
        //check if specific Course is not already in the schema
        var coid = this.fc.checkCourseExists(fd.legalName, fd.name, fd.targetName);
        if(coid){
            window.alert("Course already exists. It can not be inserted.");
            throw new Error("Course ID found by select statement. Course can not be inserted.");
        }
        
        //generate Id of Course
        var coid = this.fc.generateId(fd.legalName+"_"+fd.facultyName+"_"+fd.targetName.substring(0, 2)+"_"+fd.name); 

        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi:  <https://bmake.th-brandenburg.de/akwi/>
            Insert{
                ${coid} a schema:Course;
                schema:educationalAlignment <${aid}>;
                schema:provider <${fid}>;
                schema:name "${fd.name}";
                akwi:newEnrollments ${fd.newEnrollments};
                akwi:totalEnrollments ${fd.totalEnrollments}.	
            }
            Where{}
            `;
        return sparqlQuery;
    }

}
