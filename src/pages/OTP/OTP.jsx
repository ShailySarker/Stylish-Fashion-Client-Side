import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const OTP = () => {
    const dispatch = useDispatch();

    const [otpDigits, setOtpDigits] = useState(["", "", "", "", ""]);
    const inputRefs = Array.from({ length: otpDigits.length }, () => useRef(null));

    const handleOTPVerify = () => {

    }
    const handleOtpDigitChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
          const newOtpDigits = [...otpDigits];
          newOtpDigits[index] = value;
          setOtpDigits(newOtpDigits);
          if (index < otpDigits.length - 1 && value.length === 1) {
            inputRefs[index + 1].current.focus();
          }
          if (index > 0 && value.length === 0) {
            inputRefs[index - 1].current.focus();
          }
        }
      };
    return (
        <div className="lg:mt-44 md:mt-36 mt-24 lg:mx-36 md:mx-28 mx-8">
            <div>
                <h2 className="text-black font-semibold lg:text-3xl md:text-2xl text-xl text-center">
                    Please enter the OTP for verifying your gmail account
                </h2>
                <p className="text-medium lg:text-xl md:text-lg text-base text-[#444444] mt-5 text-center">
                    {/* A One-Time Password has been sent {contactNumber} */}
                </p>
            </div>

            <div className="flex justify-center lg:mt-32 md:mt-28 mt-20">
                {otpDigits?.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className={`lg:w-14 md:w-12 w-10 h-10 lg:h-14 md:h-12 mx-2 text-center border-b-4 ${digit ? "border-[#EE6225] text-[#EE6225]" : "border-black"
                            } md:text-2xl text-xl font-semibold`}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(index, e?.target?.value)}
                        ref={inputRefs[index]}
                    />
                ))}
            </div>

            <div className="flex justify-center lg:mt-28 md:mt-20 mt-14">
                <Link to="">
                    <button
                        className="bg-gradient-to-r from-blue-600 to-purple-800 text-white px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg lg:w-96 md:w-72 w-56"
                        onClick={() => handleOTPVerify()}
                    >
                        VERIFY
                    </button>
                </Link>
            </div>

            <p className="my-2 text-center text-red-500">
                {/* {otpError ? otpError : ""} */}
            </p>

            <div className="text-center mt-5">
                <p className="lg:text-xl md:text-lg">
                    <span className="text-[#777777]">Didn’t get the OTP? </span>
                    <span className="text-[#0044CC] font-semibold border-b-[3px] border-[#0044CC]">
                        <button>
                            Resend OTP
                        </button>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default OTP;