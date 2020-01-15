
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var muu = document.getElementById("modalUpdateUniversity");
var buu = document.getElementById("btnUpdateUniversity");
var cuu = document.getElementById("closeUpdateUniversity");
var suu = document.getElementById("submitUpdateUniversity");
var fuu = document.getElementById("formUpdateUniversity");
var fuu_m = document.getElementById("fuu_message");
var fuu_d = document.getElementById("fuu_data");

// add event functions to buttons
buu.onclick = function () {
  muu.style.display = "block";
}
cuu.onclick = function () {
  muu.style.display = "none";
}
suu.onclick = function () {
    event.preventDefault();
    submitUpdateUniversity();
}

function submitUpdateUniversity(){
    var formularIds = ["fuu_id_legalName", "fuu_legalName", "fuu_url", "fuu_addressCountry", "fuu_addressLocality", "fuu_addressRegion", "fuu_postalCode", "fuu_streetAddress"];
    var formularDataM = new FormularDataManager(formularIds, fuu, fuu_m, fuu_d);
    var validInput =
        formularDataM.checkRequiredFields(["id_legalName"])
        &&
        formularDataM.checkAtLeastOneFieldFilled(
            ["legalName", "url", "addressCountry", "addressLocality", "addressRegion", "postalCode", "streetAddress"],
            "Bitte mindestens ein zu änderndes Feld ausfüllen."
        );
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "UpdateCollegeOrUniversity",
            "die Daten bezüglich einer Hochschule sollen geändert werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
