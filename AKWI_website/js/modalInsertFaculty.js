
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mif = document.getElementById("modalInsertFaculty");
var bif = document.getElementById("btnInsertFaculty");
var cif = document.getElementById("closeInsertFaculty");
var sif = document.getElementById("submitInsertFaculty");
var fif = document.getElementById("formInsertFaculty");
var fif_m = document.getElementById("fif_message");
var fif_d = document.getElementById("fif_data");

// add event functions to buttons
bif.onclick = function () {
  mif.style.display = "block";
}
cif.onclick = function () {
  mif.style.display = "none";
}
sif.onclick = function () {
    event.preventDefault();
    submitInsertFaculty();
}

function submitInsertFaculty(){
    var formularIds = ["fif_legalName", "fif_name"];           
    var formularDataM = new FormularDataManager(formularIds, fif, fif_m, fif_d);
    var validInput =
        formularDataM.checkRequiredFields(["legalName","name"], "Bitte alle Felder ausfüllen.");
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "InsertDepartmentOrFaculty",
            "eine Fakultät soll eingefügt werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
