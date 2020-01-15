// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
    t = event.target;
    switch(t){
        case mdp: mdp.style.display = "none"; break;
        case mup: mup.style.display = "none"; break;
    }
}
