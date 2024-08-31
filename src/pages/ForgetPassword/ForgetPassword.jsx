import React from 'react';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../helpers/axios/requestMethod';
import Swal from 'sweetalert2';
import axios from 'axios';

const ForgetPassword = () => {
    const navigate = useNavigate();

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        const email = e?.target?.email?.value;
        console.log(email);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
            console.log(response?.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Password reset email sent!",
                showConfirmButton: false,
                timer: 3000,
            });
            navigate("/otp");
        } catch (error) {
            console.log(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to send reset email",
                text: error.response?.data?.message || 'An error occurred',
                showConfirmButton: true,
            });
        }
    }
    return (
        <div className="text-center w-[100%] lg:px-28 md:px-9 px-6 lg:py-2 md:py-7 py-5">
            <h2 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800 lg:mt-3 md:mt-2 mt-6">Forget Password</h2>
            <form onSubmit={handleForgetPassword} className="lg:mt-8 md:mt-5 mt-6">
                <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full lg:mx-0 mx-auto">
                    <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                        <h4 className="lg:text-lg md:text-lg font-semibold text-black">Email<span className="text-[#E41414]">*</span></h4>
                        <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="email" name="email" id="" required />
                    </div>
                </div>
                <button type="submit" className="lg:mt-10 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-52 md:w-48 w-44 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto">Forget Password</button>
            </form>
        </div>
    );
};

export default ForgetPassword;