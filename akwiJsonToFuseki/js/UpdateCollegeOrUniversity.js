
class UpdateCollegeOrUniversity{
    
    constructor(fusekiConnector){
            this.fc = fusekiConnector;
    }

    selectCollegeID(id_legalName){
        var tmp = `  
        PREFIX schema: <https://schema.org/>
        Select ?s
        Where{
          ?s a schema:CollegeOrUniversity;
             schema:legalName "${id_legalName}".
        }
        `;
        var answerObj = this.fc.query(tmp);      
        var cid;
        try{console.log(tmp);
            cid = answerObj.results.bindings[0].s.value;
        }
        catch(e){
            window.alert("ID Error: Data set can not be found. Check Ids in Json input.");
            throw new Error("College ID not found by Select statement.");
        }
        return cid;
    }

    buildCollegeUpdateBlock(fd, placeholder = false){
        var tmp = "";
        var k = 1; //sequence for placeholder
        
        if("legalName" in fd){tmp+="schema:legalName " + (placeholder ? ("?"+(k++)) : ('"'+fd["legalName"]+'"')) + ';';}
        if("url" in fd){tmp+="schema:url " + (placeholder ? ("?"+(k++)) : ('"'+fd["url"]+'"')) + ';';}
        if( "addressCountry" in fd ||
            "addressLocality" in fd ||
            "addressRegion" in fd ||
            "postalCode" in fd ||
            "streetAddress" in fd){tmp+="schema:address ?9. ?9 ";} //9 will not be reached by placeholder sequence
        if('addressCountry' in fd){tmp+="schema:addressCountry " + (placeholder ? ("?"+(k++)) : ('"'+fd["addressCountry"]+'"')) + ';';}
        if('addressLocality' in fd){tmp+="schema:addressLocality " + (placeholder ? ("?"+(k++)) : ('"'+fd["addressLocality"]+'"')) + ';';}
        if('addressRegion' in fd){tmp+="schema:addressRegion " + (placeholder ? ("?"+(k++)) : ('"'+fd["addressRegion"]+'"')) + ';';}
        if('postalCode' in fd){tmp+="schema:postalCode " + (placeholder ? ("?"+(k++)) : ('"'+fd["postalCode"]+'"')) + ';';}
        if('streetAddress' in fd){tmp+="schema:streetAddress " + (placeholder ? ("?"+(k++)) : ('"'+fd["streetAddress"]+'"')) + ';';}
        
        tmp = tmp.slice(0, -1) + '.';
        return tmp;
    }

    updateCollegeOrUniversity(){
        /* aim of this method and the object is to generate the sparql command that updates a specific person */
        var fd = this.fc.jsoninput.formularData;
        var cid = this.selectCollegeID(fd.id_legalName);
        var ub = this.buildCollegeUpdateBlock(fd);
        var ubwp = this.buildCollegeUpdateBlock(fd, true); // UpdateBlock with Placeholder
        var sparqlQuery = `
            PREFIX schema: <https://schema.org/> 
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
