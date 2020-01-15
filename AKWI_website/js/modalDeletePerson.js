
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mdp = document.getElementById("modalDeletePerson");
var bdp = document.getElementById("btnDeletePerson");
var cdp = document.getElementById("closeDeletePerson");
var sdp = document.getElementById("submitDeletePerson");
var fdp = document.getElementById("formDeletePerson");
var fdp_m = document.getElementById("fdp_message");
var fdp_d = document.getElementById("fdp_data");

// add event functions to buttons
bdp.onclick = function () {
  mdp.style.display = "block";
}
cdp.onclick = function () {
  mdp.style.display = "none";
}
sdp.onclick = function () {
    event.preventDefault();
    submitDeletePerson();
}

function submitDeletePerson(){
    var formularIds = ["fdp_legalName", "fdp_name", "fdp_familyName", "fdp_givenName"];
    var formularDataM = new FormularDataManager(formularIds, fdp, fdp_m, fdp_d);
    var validInput =
        formularDataM.checkRequiredFields(["legalName", "name", "familyName", "givenName"]);
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "DeletePerson",
            "die Daten bezüglich einer Person sollen gelöscht werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
