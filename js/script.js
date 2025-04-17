// -----------------Save color to local Storage--------------------------------

let mainColors = localStorage.getItem("color_option");
if(mainColors !== null){
    // console.log('local storage is not empty you can set it now');
    // console.log(localStorage.getItem("color_option"));
    document.documentElement.style.setProperty("--main-color" , mainColors);
    // Remove  active class from all colors list items
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
    // Add active class on element with data-color === local storage item
    if(element.dataset.color === mainColors){
        // Add active class to this li 
        element.classList.add("active");
    };
    });
};

// random BG option 
let backgroundOption = true;
// variable to control the bg interval 
let theBgInterval ;

// check if there is local storage random background item 
let backgorundLocalItem  = localStorage.getItem("backgroundOption");
// check if it is not empty 
if(backgorundLocalItem !== null){
    // backgorundLocalItem typeOf is a string
    if(backgorundLocalItem == 'true'){
        backgroundOption = true ;
    }else {
        backgroundOption = false;
    }
}

// Remove active class from all Spans

document.querySelectorAll(".rback span").forEach(element => {
    element.classList.remove("active");
});
if(backgorundLocalItem == 'true'){
    document.querySelector(".rback .yes").classList.add('active');
}else{
    document.querySelector(".rback .no").classList.add('active');
}

// -----------------Settings list---------------------------------

document.querySelector(".setting-icon").onclick = function (){
    // to make Gear icon rotate 
    this.classList.toggle("fa-spin");
    // to open setting box and close it 
    document.querySelector(".settings-box").classList.toggle("open");
};

// -----------------Toggle switch color----------------------------------

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        // set root color 
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color);
        //set color for local storage
        localStorage.setItem("color_option" , e.target.dataset.color);
        handleActive(e);
    });
});

// -----------------------------Random Background option----------------------------------

const randBackElement = document.querySelectorAll(".rback span");
// loop on all spans 
randBackElement.forEach(span =>{
    span.addEventListener("click" , (e) => {
        handleActive(e);
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true ;
            // randomizeImgs() ;
            randomizeImgs();
            localStorage.setItem("backgroundOption" , true );
        }else{
            backgroundOption = false ;
            // clearInterval(theBgInterval);
            clearInterval(theBgInterval);
            localStorage.setItem("backgroundOption" , false );
        };
    });
});

// -----------------Landing Image Background Changing ---------------------------

// select landing page background 
let landingPage = document.querySelector(".landing-page");
// Array of images
let imgArray = ["landing-1.jpg" , "landing-2.jpg" , "landing-3.jpg" ,"landing-4.jpg","landing-5.jpg"];
// Random BG function
function randomizeImgs() {
    if(backgroundOption === true ){
        theBgInterval  = setInterval ( () => {
            let randomNum = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage = 'url("../imgs/'+ imgArray[randomNum] +'")';
        },15000);
    }
}
randomizeImgs();

// -----------------Skills  animation---------------------------
let ourSkills = document.querySelector('.skills');
window.onscroll = function (){
    // skills offset top 
    let skillsOffsetTop = ourSkills.offsetTop;
    //  978px the sections above our skills section 
    // skills outer height 
    let skillsOuterHeight = ourSkills.offsetHeight ;
    // 635 px the height of our skills including padding and margin
    // window height
    let windowHeight = this.innerHeight;
    //window height 625px when display is 100%
    // window scroll top 
    let windowScrollTop = this.pageYOffset ;
    //988px the part of all page that scrolled
    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) ){
         let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
         allSkills.forEach(skill => {
             skill.style.width = skill.dataset.progress ;
             
             // Change span background color due to the precentage
             let prsg = skill.style.width ;
             if(prsg > "90%"){
                 skill.style.backgroundColor = "#70d770";
             }else if (prsg > "65%"){
                skill.style.backgroundColor = "#6b6bb7";
             }else{
                skill.style.backgroundColor = "#ff5454"; 
             };
         });
        };
    };
    // if we want get the start of skills section 
    /*
   const ourSkills = document.querySelector(".skills");
   window.addEventListener("scroll" , () =>{
       const skillsTop = ourSkills.getBoundingClientRect().top;
       const windowHeight= window.innerHeight;
       if(skillsTop <= windowHeight && skillsTop > 0){
           console.log("you have reached");
       }
   }); 
   */
// -----------------Gallery Section / popup---------------------------
// create popup with images 
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click" ,(e) => {
        //create overlay Element
        let overlay = document.createElement("div");
        //Add class to this overlay
        overlay.className = "popup-overlay";
        //Append overlay to body
        document.body.appendChild(overlay);


        //create the popup
        let popupBox = document.createElement("div");
        //add class to popup box
        popupBox.className = "popup-box";

        if(img.alt !== null){
            //Create Heading
            let imgHeading = document.createElement("h3");
            //Create text for heading
            let imgText = document.createTextNode(img.alt);
            //append the text to the heading
            imgHeading.appendChild(imgText);
            //append the heading to popup box
            popupBox.appendChild(imgHeading);
        }

        //create the image
        let popupImage = document.createElement("img");
        //set image source
        popupImage.src = img.src ;
        //add image to popup box
        popupBox.appendChild(popupImage);
        //append the popup box to body
        document.body.appendChild(popupBox);

        //Create the close element
        let closeButton = document.createElement("span");
        //Create Close Button Text
        let closeButtonText = document.createTextNode("X");
        //append text to clse button
        closeButton.appendChild(closeButtonText);
        //add class to close button
        closeButton.className = 'close-button';
        //add close button to popupbox
        popupBox.appendChild(closeButton);
    });
});
//close popup
document.addEventListener("click" , (e) => {
    if(e.target.className == "close-button"){
        //Remove the current popup
        // Note : you can remove element in both two next methods
        e.target.parentNode.remove() ;
        //Remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// -----------------Select All Bullets---------------------------
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// -----------------Select All Links-----------------------------
const allLinks =document.querySelectorAll(".links a");

function scrollToPressedSection(elements){
    elements.forEach(element => {
        element.addEventListener("click" , (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};
scrollToPressedSection(allBullets);
scrollToPressedSection(allLinks);

// -----------------Handle active status ---------------------------

function handleActive(event){
        event.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        event.target.classList.add("active");
};

// -----------------Show and hide bullets ---------------------------
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocal = localStorage.getItem("bullets_option");
if (bulletLocal !== null){
    bulletsSpan.forEach(span =>{
        span.classList.remove("active");
    })
    if(bulletLocal == "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");    
    }else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active"); 
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) =>{
        if(span.dataset.display == "show"){
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets_option", 'block');
        }else{
        bulletsContainer.style.display = "none";
        localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});
// -----------------Settings Reset Button ---------------------------
document.querySelector(".reset-options").onclick= function (){
    // localStorage.clear(); 
    // Not recommended cause it may delete other important data  
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("backgroundOption");
    // reload Window 
    window.location.reload();
};
// -----------------Toggle Button For menu---------------------------
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function(e){
    //stop propagation
    e.stopPropagation();
    //add classess
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};
//click anywhere outside to close menu
document.addEventListener("click" , (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        // check menu if open
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        };
    };
});
//stop propagation on menu 
tLinks.onclick = function(e) {
    e.stopPropagation();
};