// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
    t = event.target;
    switch(t){
        case mdc: mdc.style.display = "none"; break;
        case muc: muc.style.display = "none"; break;
    }
}
