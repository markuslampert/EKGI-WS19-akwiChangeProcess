// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
    t = event.target;
    switch(t){
        case mdu: mdu.style.display = "none"; break;
        case muu: muu.style.display = "none"; break;
        case mip: mip.style.display = "none"; break;
        case mic: mic.style.display = "none"; break;
        case mif: mif.style.display = "none"; break;
    }
}
