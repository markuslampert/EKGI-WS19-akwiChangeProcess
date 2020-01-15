
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var muf = document.getElementById("modalUpdateFaculty");
var buf = document.getElementById("btnUpdateFaculty");
var cuf = document.getElementById("closeUpdateFaculty");
var suf = document.getElementById("submitUpdateFaculty");
var fuf = document.getElementById("formUpdateFaculty");
var fuf_m = document.getElementById("fuf_message");
var fuf_d = document.getElementById("fuf_data");

// add event functions to buttons
buf.onclick = function () {
  muf.style.display = "block";
}
cuf.onclick = function () {
  muf.style.display = "none";
}
suf.onclick = function () {
    event.preventDefault();
    submitUpdateFaculty();
}

function submitUpdateFaculty(){
    var formularIds = ["fuf_id_legalName", "fuf_id_name", "fuf_name"];           
    var formularDataM = new FormularDataManager(formularIds, fuf, fuf_m, fuf_d);
    var validInput =
        formularDataM.checkRequiredFields(["id_legalName","id_name"])
        &&
        formularDataM.checkAtLeastOneFieldFilled(
            ["name"],
            "Bitte mindestens ein zu änderndes Feld ausfüllen."
        );
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "UpdateDepartmentOrFaculty",
            "die Daten bezüglich einer Fakultät sollen geändert werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
