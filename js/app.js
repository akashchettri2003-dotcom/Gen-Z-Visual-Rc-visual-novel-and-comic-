function toggleMenu(){

    const menu =
        document.getElementById("mobileMenu");

    if(!menu) return;

    if(
        menu.style.display === "block"
    ){

        menu.style.display = "none";

    }else{

        menu.style.display = "block";

    }

}
