
class UpdateCourse{
    
    constructor(fusekiConnector){
            this.fc = fusekiConnector;
    }

    selectCourseID(legalName, name, targetName){
        var tmp = `
            PREFIX schema: <https://schema.org/>
            Select ?s
            Where{
              ?1 a schema:CollegeOrUniversity;
                 schema:legalName "${legalName}";
                 schema:department ?2.
              ?2 ^schema:provider ?s.
              ?s schema:name "${name}";
                 schema:educationalAlignment ?4.
              ?4 schema:targetName "${targetName}".
            }
        `;
        var answerObj = this.fc.query(tmp);      
        var cid;
        try{console.log(tmp);
            cid = answerObj.results.bindings[0].s.value;
        }
        catch(e){
            window.alert("ID Error: Data set can not be found. Check Ids in Json input.");
            throw new Error("Course ID not found by Select statement.");
        }
        return cid;
    }

    updateCourse(){
        /* aim of this method and the object is to generate the sparql command that updates a specific person */
        var fd = this.fc.jsoninput.formularData;
        var cid = this.selectCourseID(fd.id_legalName, fd.id_name, fd.id_targetName);
        var ub = this.fc.buildUpdateBlock(fd, false, ["schema:","akwi:","akwi:"]);
        var ubwp = this.fc.buildUpdateBlock(fd, true, ["schema:","akwi:","akwi:"]); // UpdateBlock with Placeholder
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/>
            PREFIX akwi:  <https://bmake.th-brandenburg.de/akwi/>
            DELETE {
            <${cid}> ${ubwp}
            }
            INSERT{
            <${cid}> ${ub} 
            }
            Where{
            <${cid}> ${ubwp}
            }
            `;
        return sparqlQuery;
    }

}
