import React, { useEffect } from "react";
import Nav from "../components/Nav";

import { Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { otpFailure, otpSuccess } from "../redux/userSlice";

const OTPverify = () => {
  const [Otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30); // Set initial countdown (e.g., 30 seconds)
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState()
  const phone = useSelector((state) => state.user?.user.phone);
  const dispatch = useDispatch()


  useEffect(() => {
    // Start the countdown
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval); 
    } else {
      setCanResend(true); // Enable resend button when timer reaches zero
    }
  }, [timer]);

  const handleResend =async (e)=>{
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/resendotp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone}),
    });
    
  }
  const handleOtp = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/api/verifyotp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, otp:Otp }),
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      console.log(response)
      dispatch(otpFailure(errorData.error))
      return; // Stop further execution
    }


    const data = await res.json();
    dispatch(otpSuccess())
    if(data?.user?.user.role){
      navigate(`/${data?.user?.user.role}`)
    }
    
    

    
    console.log("OTP verification response:", data);
  };

  return (
    <div className="h-screen relative w-full flex flex-col justify-center items-center p-4">
      <Nav />

      <div className="w-full md:w-[25%] font-[Urbanthin] flex flex-col gap-1 rounded-md bg-slate-100 p-4 md:p-10">
        <h1 className="text-3xl font-[Urban] mb-2 text-center">Verify OTP</h1>
        <p className="text-center text-sm text-gray-700 mb-3 font-normal">
          Enter the OTP send to your mobile number
        </p>
        <form onSubmit={handleOtp} className="flex flex-col ">
          <input 
            value={Otp}
            onChange={(e)=>setOtp(e.target.value)}
            type="text"
          />
          <button
            className="w-full rounded-md mt-4 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button 
        onClick={handleResend}
        disabled ={ !canResend}
        className={`text-end text-md mt-2 text-blue-700 mb-3 font-normal${canResend ? "" : "opacity-50 cursor-not-allowed"}`}>
           {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
        </button>

        {error && <p className='text-red-500 text-center'>{error}</p>}
      </div>
    </div>
  );
};

export default OTPverify;
