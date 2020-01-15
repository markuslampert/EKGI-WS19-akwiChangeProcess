
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mip = document.getElementById("modalInsertPerson");
var bip = document.getElementById("btnInsertPerson");
var cip = document.getElementById("closeInsertPerson");
var sip = document.getElementById("submitInsertPerson");
var fip = document.getElementById("formInsertPerson");
var fip_m = document.getElementById("fip_message");
var fip_d = document.getElementById("fip_data");

// add event functions to buttons
bip.onclick = function () {
  mip.style.display = "block";
}
cip.onclick = function () {
  mip.style.display = "none";
}
sip.onclick = function () {
    event.preventDefault();
    submitInsertPerson();
}

function submitInsertPerson(){
    var formularIds = ["fip_legalName","fip_name","fip_familyName", "fip_givenName", "fip_honorificPrefix","fip_telephone","fip_eMail"];
    var formularDataM = new FormularDataManager(formularIds, fip, fip_m, fip_d);
    var validInput =
        formularDataM.checkRequiredFields(["legalName","name","familyName", "givenName", "honorificPrefix","telephone","eMail"], "Bitte alle Felder ausfüllen.");
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "InsertPerson",
            "die Daten bezüglich einer Person sollen eingefügt werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
