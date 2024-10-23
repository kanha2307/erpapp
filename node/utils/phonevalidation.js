const { parsePhoneNumberFromString} = require('libphonenumber-js')

const phonevalidation = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone)
    console.log(phoneNumber);
    
    if(!phoneNumber || !phoneNumber.isValid()){
        throw new Error("Invalid Phone number");
        
    }
    console.log(phoneNumber.format('E.164'))
    return phoneNumber.format('E.164')
}

module.exports = {phonevalidation}