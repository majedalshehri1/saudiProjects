//Validation forms

// Selection
const form = document.querySelector("#form")
const msgError = document.querySelector("#msg-error")

// Event Listener
form.addEventListener('submit', e=>{
    
    let messages = []

    // new list meassages after definded in fun
    // Email Checked
    messages = isFilled("#email-reg", messages, "الايميل غير صحيِح!")
    // messages = isEmail("#email-reg", messages, "تنسيق البريد الإلكتروني خاطئ!")
    // Password Checked
    messages = isFilled("#password-reg", messages, "الرقم السري غير صحيح!")
    
    // fname & lname 
    messages = isFilled("#fname", messages, "تحقق من الأسم الأول!")
    messages = isFilled("#lname", messages, "تحقق من الأسم الأخير!")

    // mobile 
    messages = isFilled("#mobile", messages, "تحقق من رقم الجوال!")
    messages = isMobile("#mobile", messages, "تحقق من ادخال ارقام في رقم الجوال!")
    console.log(messages);
   
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

function isMobile(selector, messages, msgError){
    const element = document.querySelector(selector).value.trim(); //fun trim(), delete anay spaces

    // Method match() > use reqular expretion
    if (!element.match("[0-9]{9}")) {
        // False, print message
        messages.push(msgError)

    }
    return messages

}



