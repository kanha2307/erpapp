const twilio = require('twilio')
const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER} = process.env

const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)

let otps = {}
const generateOTP = ()=>{
    return Math.floor(100000 + Math.random()*900000).toString()
}

const sendSMS = async(to ,message)=>{
 
    
    const otp = generateOTP()
    otps[to] = otp
    console.log(otps);
    
    try {
        const resposnse = await client.messages.create({
            body:`${message}: ${otp}`,
            from:TWILIO_PHONE_NUMBER,
            to,
        })
        return resposnse.sid
        
    } catch (error) {
        throw new Error("Failed to send sms")
    }
}
const verifyOTP = async (req,res)=>{
    const {phone,otp}  = req.body
    
    
    console.log(`Verifying OTP for phone: ${phone} and otp ${otp}`); // Log phone and received OTP
    const storedOtp = otps[phone];
    console.log(`Stored OTP for ${phone}: ${storedOtp}`);
    
    if(!storedOtp){
        return res.status(400).json({message:'No Otp generated from this user'})
    }

    if(otps[phone] === otp){
        delete otps[phone]
        return res.status(200).json({message:'Otp verified successfully'})
    }else{
        return res.status(400).json({error:'Invalid Otp'})
    }


  }
  
module.exports = {sendSMS,verifyOTP}