// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mic = document.getElementById("modalInsertCourse");
var bic = document.getElementById("btnInsertCourse");
var cip = document.getElementById("closeInsertCourse");
var sic = document.getElementById("submitInsertCourse");
var fic = document.getElementById("formInsertCourse");
var fic_m = document.getElementById("fic_message");
var fic_d = document.getElementById("fic_data");

// add event functions to buttons
bic.onclick = function () {
  mic.style.display = "block";
}
cip.onclick = function () {
  mic.style.display = "none";
}
sic.onclick = function () {
    event.preventDefault();
    submitInsertCourse();
}

function submitInsertCourse(){
    var formularIds = ["fic_legalName", "fic_facultyName", "fic_targetName", "fic_name", "fic_newEnrollments", "fic_totalEnrollments"];
    var formularDataM = new FormularDataManager(formularIds, fic, fic_m, fic_d);
    var validInput =
    	formularDataM.checkRequiredFields(["legalName", "facultyName", "targetName", "name", "newEnrollments", "totalEnrollments"], "Bitte alle Felder ausfüllen.");
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "InsertCourse",
            "ein Studiengang soll eingefügt werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
