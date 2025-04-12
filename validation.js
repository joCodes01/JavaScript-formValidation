let errorModal = document.querySelector("#error-modal");
let errorMessage = document.querySelector("#error-message");
let closeModalButton = document.querySelector("#close-modal");

let cabinform = document.querySelector("#cabinform");
cabinform.addEventListener("submit", validateform);

function validateform(event) {
    event.preventDefault();

//CABIN ID VALIDATION

    let cabinid = cabinform.cabinid.value.trim();

    // if not a number convert to uppercase
    if (isNaN(cabinid)) {
        cabinid = cabinid.toUpperCase();
        console.log(cabinid);
    }

    //check for 3 digit number 
    if ( !isNaN(cabinid) && cabinid.length !== 3 ) {
        showError("Enter a 3 digit ID number or NEW ");
        return;
    }
    //check string is NEW if NaN
    if ( isNaN(cabinid) && !cabinid.includes("NEW") ){
        showError("Enter a 3 digit ID number or NEW ");
        return;
    }

//CABIN TYPE VALIDATION

    let cabintype = cabinform.cabintype.value;
    // if value is empty alert!
    if (cabintype == "" ) {
        showError("Select cabin type");
        return;
    }

//CABIN IMAGE VALIDATION
    cabinimage = document.querySelector("#cabinimage");
     
    
    // check if file exists
    if (cabinimage.files.length > 0){
        let image = cabinimage.files[0];
        let mimeType = image.type;
        let maxFileSize = 5 * 1024 * 1024; 

            // check if file content starts with image MIME sequence 
            if ( !mimeType.startsWith("image/")) {
                showError("Image file types allowed are: .png, .jpg, .jpeg");
                return;
            }
            // check not larger than 5mb alert!
            if (image.size > maxFileSize) {
                showError("file must not be larger than 5mb");
                return;
            }
    }
  

// DESCRIPTION VALIDATION

    let description = document.querySelector("#description");
    // check not longer than 250 chars 
    if (description.value.length > 250) {
        showError("250 characters allowed");
        return;
    }
    // check for special characters 
    if (!description.value.match(/^[a-zA-Z0-9., ]*$/)) {
        showError("no special characters allowed");
        return;
    }

    // replace special characters with html alternatives
    function escapeSpecialChars(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        }
    
    let descriptionText = description.value;
    let escapedDescription = escapeSpecialChars(descriptionText);
    

// PRICE PER NIGHT VALIDATION

    let nightprice = document.querySelector("#nightprice");
    let pernight = parseFloat(nightprice.value);

   // check for empty value 
    if (nightprice.value == ""){
        showError("Enter the price per night");
        return;
    }

// PRICE PER WEEK VALIDATION

    let weekprice = document.querySelector("#weekprice");
    let perweek = parseFloat(weekprice.value);

    //check for empty value
    if (weekprice.value == ""){
        showError("Enter the price per week");
        return;
    }
    // check week price is not more than 5 times night price
    if (weekprice.value > (5 * pernight) ) {
        showError("week price can not be more than the cost of five nights");
        return;
    }

    cabinform.submit();

 }

 function showError(message){

    errorMessage.textContent = message;
    errorModal.showModal();
 }

 closeModalButton.addEventListener("click", () => {
    errorModal.close();
    console.log("hello World");
 });


console.log(closeModalButton);





