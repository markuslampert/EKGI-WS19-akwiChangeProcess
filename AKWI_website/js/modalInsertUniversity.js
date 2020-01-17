
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var miu = document.getElementById("modalInsertUniversity");
var biu = document.getElementById("btnInsertUniversity");
var ciu = document.getElementById("closeInsertUniversity");
var siu = document.getElementById("submitInsertUniversity");
var fiu = document.getElementById("formInsertUniversity");
var fiu_m = document.getElementById("fiu_message");
var fiu_d = document.getElementById("fiu_data");

// add event functions to buttons
biu.onclick = function () {
  miu.style.display = "block";
}
ciu.onclick = function () {
  miu.style.display = "none";
}
siu.onclick = function () {
    event.preventDefault();
    submitInsertUniversity();
}

function submitInsertUniversity(){
    var formularIds = ["fiu_legalName", "fiu_url", "fiu_addressCountry", "fiu_addressLocality", "fiu_addressRegion", "fiu_postalCode", "fiu_streetAddress"];
    var formularDataM = new FormularDataManager(formularIds, fiu, fiu_m, fiu_d);
    var validInput =
        formularDataM.checkRequiredFields(["legalName", "url", "addressCountry", "addressLocality", "addressRegion", "postalCode", "streetAddress"], "Bitte alle Felder ausfüllen.");
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "InsertCollegeOrUniversity",
            "eine Hochschule soll eingefügt werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
