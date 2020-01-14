
class DeleteCourse{
    
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
        //check if AlignmentObject is in the schema
        var aid = this.fc.checkAlignmentObjectExists(fd.targetName);
        if(!aid){
            window.alert("Given AlignmentObject is not in the schema.");
            throw new Error("AlignmentObject ID not found by select statement.");
        }
        //check if specific Course is in the schema
        var coid = this.fc.checkCourseExists(fd.legalName, fd.name, fd.targetName);
        if(!coid){
            window.alert("Given Course is not in the schema.");
            throw new Error("Course ID found by select statement. Course can not be inserted.");
        }
        return coid;
    }

    deleteCourse(){
        var fd = this.fc.jsoninput.formularData;
        var coid = this.check(fd);
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi:  <https://bmake.th-brandenburg.de/akwi/>
            Delete{
            akwi:hogwarts_information_technology_ba_business_informatics a schema:Course;
                schema:educationalAlignment ?1;
                schema:provider ?2;
                schema:name ?3;
                akwi:newEnrollments ?4;
                akwi:totalEnrollments ?5.
            }
            Where{
            akwi:hogwarts_information_technology_ba_business_informatics a schema:Course;
                schema:educationalAlignment ?1;
                schema:provider ?2;
                schema:name ?3;
                akwi:newEnrollments ?4;
                akwi:totalEnrollments ?5.
            }
        `;
        return sparqlQuery;
    }

}
