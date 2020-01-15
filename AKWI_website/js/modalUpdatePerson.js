
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mup = document.getElementById("modalUpdatePerson");
var bup = document.getElementById("btnUpdatePerson");
var cup = document.getElementById("closeUpdatePerson");
var sup = document.getElementById("submitUpdatePerson");
var fup = document.getElementById("formUpdatePerson");
var fup_m = document.getElementById("fup_message");
var fup_d = document.getElementById("fup_data");

// add event functions to buttons
bup.onclick = function () {
  mup.style.display = "block";
}
cup.onclick = function () {
  mup.style.display = "none";
}
sup.onclick = function () {
    event.preventDefault();
    submitUpdatePerson();
}

function submitUpdatePerson(){
    var formularIds = ["fup_id_familyName", "fup_id_givenName", "fup_honorificPrefix","fup_familyName","fup_givenName","fup_telephone","fup_eMail"];
    var formularDataM = new FormularDataManager(formularIds, fup, fup_m, fup_d);
    var validInput =
        formularDataM.checkRequiredFields(["id_familyName","id_givenName"])
        &&
        formularDataM.checkAtLeastOneFieldFilled(
            ["honorificPrefix","familyName","givenName","telephone","eMail"],
            "Bitte mindestens ein zu änderndes Feld ausfüllen."
        );
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "UpdatePerson",
            "die Daten bezüglich einer Person sollen geändert werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
