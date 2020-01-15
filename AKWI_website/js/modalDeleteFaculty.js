
// get Elemets: modal, button to open modal, button to close modal, form in the modal, hidden input elements message and data of the formular
var mdf = document.getElementById("modalDeleteFaculty");
var bdf = document.getElementById("btnDeleteFaculty");
var cdf = document.getElementById("closeDeleteFaculty");
var sdf = document.getElementById("submitDeleteFaculty");
var fdf = document.getElementById("formDeleteFaculty");
var fdf_m = document.getElementById("fdf_message");
var fdf_d = document.getElementById("fdf_data");

// add event functions to buttons
bdf.onclick = function () {
  mdf.style.display = "block";
}
cdf.onclick = function () {
  mdf.style.display = "none";
}
sdf.onclick = function () {
    event.preventDefault();
    submitDeleteFaculty();
}

function submitDeleteFaculty(){
    var formularIds = ["fdf_legalName", "fdf_name"];           
    var formularDataM = new FormularDataManager(formularIds, fdf, fdf_m, fdf_d);
    var validInput =
        formularDataM.checkRequiredFields(["legalName","name"]);
    if (validInput){
        //generate json string
        formularDataM.generateEMailContent(
            "DeleteDepartmentOrFaculty",
            "die Daten bezüglich einer Fakultät sollen gelöscht werden."
        );
        //send Mail
        formularDataM.sendEmail();
    }
}
