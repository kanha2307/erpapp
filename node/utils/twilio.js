const twilio = require('twilio')
const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER} = process.env

const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)

const sendSMS = async(to ,message)=>{
    try {
        const resposnse = await client.messages.create({
            body:message,
            from:TWILIO_PHONE_NUMBER,
            to,
        })
        console.log("SMS sent successfully",resposnse.sid);
        return resposnse.sid
        
    } catch (error) {
        throw new Error("Failed to send sms")
    }
}

module.exports = {sendSMS}