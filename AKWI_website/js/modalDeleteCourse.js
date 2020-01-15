
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mdc = document.getElementById("modalDeleteCourse");
var bdc = document.getElementById("btnDeleteCourse");
var cdc = document.getElementById("closeDeleteCourse");
var sdc = document.getElementById("submitDeleteCourse");
var fdc = document.getElementById("formDeleteCourse");
var fdc_m = document.getElementById("fdc_message");
var fdc_d = document.getElementById("fdc_data");

// add event functions to buttons
bdc.onclick = function () {
  mdc.style.display = "block";
}
cdc.onclick = function () {
  mdc.style.display = "none";
}
sdc.onclick = function () {
    event.preventDefault();
    submitDeleteCourse();
}

function submitDeleteCourse(){
    var formularIds = ["fdc_legalName","fdc_name","fdc_targetName"];
    var formularDataM = new FormularDataManager(formularIds, fdc, fdc_m, fdc_d);
    var validInput =
        formularDataM.checkRequiredFields(["legalName","name","targetName"]);
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "DeleteCourse",
            "die Daten bezüglich eines Studiengangs sollen gelöscht werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
