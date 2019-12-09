
class JsonInputValidator{
    
    checkValidJson(jsonString){
        try {
            var o = JSON.parse(jsonString);
            if (o && typeof(o) === "object") {
                return true;
            }
        }
        catch (e) {
            window.alert("Syntaxfehler: Input ist kein syntaktisch korrekter Json-Stirng.");
            return false;
        }
    };

    getConfigModi(){
        var configModiList=[];
        var modiObjectList = validFormularConfig.modi;
        for (var i = 0; i < modiObjectList.length; i++) {
            configModiList.push(modiObjectList[i].modus);
        }
        return new Set(configModiList);
    }

    getConfigModus(modus){
        var configModiList=[];
        var modiObjectList = validFormularConfig.modi;
        for (var i = 0; i < modiObjectList.length; i++) {
           if(modus == modiObjectList[i].modus){return modiObjectList[i];}
        }
        return false;
    }

    checkIds(cidf, formular){
        /*checks if required id fields are in the formular*/
        var complete = true;
        for (var i = 0; i < cidf.length; i++) {
            complete &= (cidf[i] in formular.formularData);
        }
        return complete;
    }

    checkFields(cf, formular){
        /*checks if at least one required field is in fields formular*/
        var complete = false;
        for (var i = 0; i < cf.length; i++) {
            complete += (cf[i] in formular.formularData);
        }
        return complete;
    }

    checkValidAttributes(jsonString){
        var formular = JSON.parse(jsonString);
        // check if first level attributes are in the json string
        if (!('modus' in formular)){window.alert("Attribut modus nicht angegeben."); return false;}
        if(!('formularData' in formular)){window.alert("Attribut formularData nicht angegeben."); return false;}
        var configModi = this.getConfigModi();
        // check if attribute value of modus is valid
        if(!(configModi.has(formular.modus))){window.alert("Attributwert für Attribut modus ist ungültig."); return false;}
        // get Modus
        var configModus = this.getConfigModus(formular.modus);
        // check if formular fields match the required fields
        var cidf = configModus.id_fields;
        var idsComplete = this.checkIds(cidf, formular);
        if(!idsComplete){window.alert("Id-Felder in formularData sind nicht vollständig."); return false;}
        if ("fields" in configModus) {
            var cf = configModus.fields;
            var fieldsComplete = this.checkFields(cf, formular);
            if(!fieldsComplete){window.alert("Es muss mindestens ein zu änderndes Feld in formularData angegeben sein."); return false;}
        }
        return true;
    }

    checkValidValues(jsonString){
        var formular = JSON.parse(jsonString);
        var complete = true;
        var fd = formular.formularData;
        for (const key in fd) {
          complete &= (fd[key] != "");
        }
        if(!complete){window.alert("Es sind leere Attribut-Werte vorhanden.");}
        return complete;
    }

    checkJsonInput(jsonString){
        //valid json?
        var validJson = this.checkValidJson(jsonString);
        if(!validJson){return false;}
        //valid attributes?
        var validAttributes = this.checkValidAttributes(jsonString);
        if(!validAttributes){return false;}
        //no empty attribute values
        var validValues = this.checkValidValues(jsonString);
        if(!validValues){return false;}
        return true;
    }

}
