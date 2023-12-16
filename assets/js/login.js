//Validation forms

// Selection
const form = document.querySelector("#form")
const msgError = document.querySelector("#msg-error")

// Event Listener
form.addEventListener('submit', e=>{

    let messages = []

    // new list meassages after definded in fun
    // Email Checked
    messages = isFilled("#email-login", messages, "الايميل غير صحيِح!")
    messages = isEmail("#email-login", messages, "تنسيق البريد الإلكتروني خاطئ!")
    // Password Checked
    messages = isFilled("#password-login", messages, "الرقم السري غير صحيح!")
    

    // check messages is add 
    if (messages.length > 0) {
        // there is error

        msgError.innerHTML =" المشكلات التي تم العثور عليها [ "+ messages.length+" ]"+"  :  " +messages.join(", ") //fun join() add frist message with second message
        // prevent submit
        e.preventDefault();
    }
})

function isFilled(selector, messages, msgError){

    const element = document.querySelector(selector).value.trim(); //fun trim(), delete anay spaces 
    if (element.length < 1) {
        messages.push(msgError)
    }
    return messages
}
function isEmail(selector, messages, msgError){
    const element = document.querySelector(selector).value.trim(); //fun trim(), delete anay spaces

    // Method match() > use reqular expretion
    if (!element.match("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")) {
        // False, print message
        messages.push(msgError)

    }
    return messages
}




