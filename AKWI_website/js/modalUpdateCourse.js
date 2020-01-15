
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var muc = document.getElementById("modalUpdateCourse");
var buc = document.getElementById("btnUpdateCourse");
var cuc = document.getElementById("closeUpdateCourse");
var suc = document.getElementById("submitUpdateCourse");
var fuc = document.getElementById("formUpdateCourse");
var fuc_m = document.getElementById("fuc_message");
var fuc_d = document.getElementById("fuc_data");

// add event functions to buttons
buc.onclick = function () {
  muc.style.display = "block";
}
cuc.onclick = function () {
  muc.style.display = "none";
}
suc.onclick = function () {
    event.preventDefault();
    submitUpdateCourse();
}

function submitUpdateCourse(){
    var formularIds = ["fuc_id_legalName","fuc_id_name","fuc_id_targetName","fuc_name","fuc_newEnrollments","fuc_totalEnrollments"];
    var formularDataM = new FormularDataManager(formularIds, fuc, fuc_m, fuc_d);
    var validInput =
        formularDataM.checkRequiredFields(["id_legalName","id_name","id_targetName"])
        &&
        formularDataM.checkAtLeastOneFieldFilled(
            ["name","newEnrollments","totalEnrollments"],
            "Bitte mindestens ein zu änderndes Feld ausfüllen."
        );
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "UpdateCourse",
            "die Daten bezüglich eines Studiengangs sollen geändert werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
