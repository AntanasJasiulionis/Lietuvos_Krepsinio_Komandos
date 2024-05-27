var inputName;
var inputLastName;
//logos-navbar hover effect
if(document.querySelectorAll(".logos")){
    //glow when mouse enters
    for(var i=0; i<document.querySelectorAll(".logos").length; i++){
        document.querySelectorAll(".logos")[i].addEventListener("mouseenter", function() {
            this.querySelector(".glow").classList.add("glow-hover");
        });
    };
    //dont glow when mouse leaves
    for(var i=0; i<document.querySelectorAll(".logos").length; i++){
        document.querySelectorAll(".logos")[i].addEventListener("mouseleave", function() {
            this.querySelector(".glow").classList.remove("glow-hover");
        });
    };
    //glow-click when clicks
    for(var i=0; i<document.querySelectorAll(".logos").length; i++){
        document.querySelectorAll(".logos")[i].addEventListener("click", function () {
            this.querySelector(".glow").classList.remove("glow-hover");
            this.querySelector(".glow").classList.add("glow-click");
        });
    };
};
//Search icon displays search options when clicked
if(document.querySelector(".search-container .search-icon")){
    document.querySelector(".search-container .search-icon").addEventListener("click", function() {
        document.querySelector(".search-container .search-icon").classList.add("hidden");
        document.querySelector("#search-options").classList.remove("hidden");
        document.querySelector("#search-options").classList.add("show");
    });
};
//Search options display
if(document.querySelector(".search-container")){
    document.querySelector("#search-options").addEventListener("change", (option) => {
        if(option.target.value === "position"){
            document.querySelector("#search-position").classList.remove("hidden");
            document.querySelector("#search-position").classList.add("show");
            document.querySelector("#search-name-lastname").classList.remove("show");
            document.querySelector("#search-name-lastname").classList.add("hidden");
            document.querySelector("#user-input").textContent = "";
        }
        if(option.target.value === "name-lastname"){
            // document.querySelector("#search-name-lastname").style.display = "block"
            // document.querySelector("#search-position").style.display = "none";
            document.querySelector("#search-position").classList.remove("show");
            document.querySelector("#search-position").classList.add("hidden");
            document.querySelector("#search-name-lastname").classList.remove("hidden");
            document.querySelector("#search-name-lastname").classList.add("show");
            if(inputName || inputLastName){
            document.querySelector("#user-input").textContent = `${inputName} ${inputLastName}`;
            }
        }
    });
};
//Show User-input
if(document.querySelectorAll(`#search-name-lastname input[type="text"]`)){
    for(var i=0; i<document.querySelectorAll(`#search-name-lastname input[type="text"]`).length; i++){
        document.querySelectorAll(`#search-name-lastname input[type="text"]`)[i].addEventListener("input", function() {
            //Restrict input only to letters
            let regex = /[^a-ząčęėįšųū]/gi;
            this.value = this.value.replace(regex, "");
            //display input on the screen
            inputName = document.querySelector(`#search-name-lastname input[name="name"]`).value;
            inputLastName = document.querySelector(`#search-name-lastname input[name="lastname"]`).value;
            document.querySelector("#user-input").textContent = `${inputName} ${inputLastName}`;
        });
    };
};
//show phone-menu-navbar
if(document.querySelector(".phone-tablet-menu-icon")){
    document.querySelector(".phone-tablet-menu-icon").addEventListener("click", function() {
        document.querySelector(".phone-tablet-menu-icon").classList.toggle("phone-tablet-cancel-icon")
        if(document.querySelector(".phone-tablet-menu-icon").classList.contains("phone-tablet-cancel-icon")){
            document.querySelector(".phone-tablet-menu-navbar").classList.add("phone-tablet-menu-show");
        } else {
            document.querySelector(".phone-tablet-menu-navbar").classList.remove("phone-tablet-menu-show");
        }
    });
};