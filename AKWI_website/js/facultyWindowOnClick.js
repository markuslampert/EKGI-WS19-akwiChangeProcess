// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
    t = event.target;
    switch(t){
        case mdf: mdf.style.display = "none"; break;
        case muf: muf.style.display = "none"; break;
    }
}
