
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mdu = document.getElementById("modalDeleteUniversity");
var bdu = document.getElementById("btnDeleteUniversity");
var cdu = document.getElementById("closeDeleteUniversity");
var sdu = document.getElementById("submitDeleteUniversity");
var fdu = document.getElementById("formDeleteUniversity");
var fdu_m = document.getElementById("fdu_message");
var fdu_d = document.getElementById("fdu_data");

// add event functions to buttons
bdu.onclick = function () {
  mdu.style.display = "block";
}
cdu.onclick = function () {
  mdu.style.display = "none";
}
sdu.onclick = function () {
  event.preventDefault();
  submitDeleteUniversity();
}

function submitDeleteUniversity(){
    var formularIds = ["fdu_legalName"];
    var formularDataM = new FormularDataManager(formularIds, fdu, fdu_m, fdu_d);
    var validInput =
        formularDataM.checkRequiredFields(["legalName"]);
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "DeleteCollegeOrUniversity",
            "die Daten bezüglich einer Hochschule sollen gelöscht werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
