
class FormularDataManager{

    constructor (formularIds){
    /*Binds Formular User Input into an Object*/
        var formularData = {};
        var numericAttributesEscapeFromParseInt = {"postalCode":{},"telephone":{}};
        for(var key in formularIds){
            var formularId = formularIds[key];
            var tmp = document.getElementById(formularId).value;
            if(!isNaN(tmp) && !(formularId in numericAttributesEscapeFromParseInt) ){tmp = parseInt(tmp);}
            formularData[formularId]=tmp;
        }
        this.formularData = formularData; //formular Data is Object which contains User-Input
        this.delEmptyFormularFields();
        this.trimFormularData();
        this.formularIds=formularIds;
    }
 
    trimFormularData(){
        /*Execute trim function of strings*/
        var formularData = this.formularData;
        for(var key in formularData){
            var tmp = formularData[key];
            if(typeof(tmp)=="string"){
                formularData[key] = tmp.trim();
            }
        }
        this.formularData = formularData;
    }

    delEmptyFormularFields(){
        /*Deletes attribute names with empty attribute values of FormularData Object*/
        var formularData = this.formularData;
        for (var key in formularData) {
            var tmp = formularData[key];
            tmp = new Boolean(tmp); // among other 0 and "" become false
            if(!tmp.valueOf()){
                delete formularData[key];
            }
        }
        this.formularData = formularData;
    }

    generateEMailContent(modus, message){
        var jsonstring = '{"modus":"' + modus + '","formularData":' + JSON.stringify(this.formularData) + "}";
        document.getElementById("data").value = jsonstring;
        document.getElementById("message").value = message;
    }
    
    sendEmail(){
        var form = document.getElementById("contact_form");
        emailjs.sendForm('gmail', 'contact_form', form);
        this.clearFormularFields();
        window.alert("Formular wurde gesendet.");
    }

    clearFormularFields(){
        var formularIds = this.formularIds;
        for(var key in formularIds){
            var formularId = formularIds[key];
            document.getElementById(formularId).value="";
        }
    }

    // Functions to check formulars

    checkRequiredFields(requiredFields, text="Bitte alle Pflichtfelder ausfüllen."){
    /*return value is true if all required fields are filled*/
        var complete = true;
        for(var key in requiredFields){
            var requiredField = requiredFields[key];
            var tmp = this.formularData[requiredField];
            tmp = new Boolean(tmp); // among other 0 and "" become false
            complete &= tmp;
        }
        if(!complete){
            window.alert(text);
        }
        return complete;
    }

    checkAtLeastOneFieldFilled(fields, text="Bitte mindestens ein Feld ausfüllen."){
    /*return value complete is true if at least one field is filled*/
        var complete = false;
        for(var key in fields){
            var field = fields[key];
            var tmp = this.formularData[field];            
            tmp = new Boolean(tmp); // among other 0 and "" become false
            complete += tmp;
        }
        if(!complete){
            window.alert(text);
        }
        return complete;
    }

}
