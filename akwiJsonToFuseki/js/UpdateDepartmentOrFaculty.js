
class UpdateDepartmentOrFaculty{
    
    constructor(fusekiConnector){
            this.fc = fusekiConnector;
    }

    selectFacultyID(legalName, name){
        var tmp = `      
            PREFIX schema: <https://schema.org/>
            PREFIX akwi: <https://bmake.th-brandenburg.de/akwi/>
            Select ?s
            Where{
              ?s a akwi:DepartmentOrFaculty;
                   schema:name "${name}".
              ?s ^schema:department ?2.
              ?2 schema:legalName "${legalName}".
            }
            `;
        var answerObj = this.fc.query(tmp);      
        var fid;
        try{console.log(tmp);
            fid = answerObj.results.bindings[0].s.value;
        }
        catch(e){
            window.alert("ID Error: Data set can not be found. Check Ids in Json input.");
            throw new Error("Faculty ID not found by Select statement.");
        }
        return fid;
    }

    updateDepartmentOrFaculty(){
        /* aim of this method and the object is to generate the sparql command that updates a specific person */
        var fd = this.fc.jsoninput.formularData;
        var fid = this.selectFacultyID(fd.id_legalName, fd.id_name);
        var ub = this.fc.buildUpdateBlock(fd);
        var ubwp = this.fc.buildUpdateBlock(fd, true); // UpdateBlock with Placeholder
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/> 
            DELETE {
            <${fid}> ${ubwp}
            }
            INSERT{
            <${fid}> ${ub} 
            }
            Where{
            <${fid}> ${ubwp}
            }
            `;
        return sparqlQuery;
    }

}
