import { Link, useNavigate } from "react-router-dom";
import companyLogo from "../../assets/Images/SignUp/logo.jpg";
import banner from "../../assets/Images/SignUp/SignUp_banner.png";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const SignUp = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // password showing toggle
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };
    // handleSignUp form handler
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const userName = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            alert("Email is not in the correct format!");
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            alert('Please add at least two uppercase letters');
            return;
        }
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            alert('Please add at least two numbers');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            alert('Please add a special character');
            return;
        }
        if (password.length < 8) {
            alert('Password must be 8 characters long');
            return;
        }

        if (password === confirmPassword) {
            // If all validations pass
            if (firstName && lastName && userName && email && password && password && confirmPassword) {
                console.log(firstName, lastName, userName, email, password, confirmPassword);
                form.reset();
                alert('User SignUp Successfully !!!');
                navigate('/login');
                // Add your sign-up logic here (e.g., sending data to the server)
            }
        } else{
            alert("Confirm Password is not same as Password")
        }

    };
    return (
        <div className="flex justify-between items-center lg:gap-0 bg-[#b7b0b00a] bg-opacity-75 backdrop-filter backdrop-blur-lg md:h-screen lg:px-20 md:px-9 px-6 lg:py-2 md:py-7 py-5">
            <div className="lg:w-[57%] md:w-2/3 w-11/12 lg:mx-0 mx-auto">
                <Link to="/">
                    <img className="lg:w-36 md:w-32 w-28 md:h-auto" src={companyLogo} alt="Stylish Fashion" />
                </Link>
                <div className="text-center w-[100%]">
                    <h2 className="lg:text-3xl md:text-2xl text-xl/normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-900 lg:mt-3 md:mt-2 mt-0">SignUp</h2>
                    <form onSubmit={handleSignUp} className="lg:mt-12 md:mt-8 mt-3">
                        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 md:gap-5 gap-3 w-full lg:mx-0 mx-auto">
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">First Name<span className="text-[#E41414]">*</span></h4>
                                <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="text" name="firstName" id="" required />
                            </div>
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">Last Name<span className="text-[#E41414]">*</span></h4>
                                <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="text" name="lastName" id="" required />
                            </div>
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">UserName<span className="text-[#E41414]">*</span></h4>
                                <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="text" name="userName" id="" required />
                            </div>
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">Email<span className="text-[#E41414]">*</span></h4>
                                <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="email" name="email" id="" required />
                            </div>
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">Password<span className="text-[#E41414]">*</span></h4>
                                <div className="relative w-full">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" name="password" id="" required
                                    />
                                    <button
                                        type="button"
                                        className="absolute md:right-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg font-semibold text-black">Confirm Password<span className="text-[#E41414]">*</span></h4>
                                <div className="relative w-full">
                                    <input
                                        className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        name="confirmPassword" id="" required
                                    />
                                    <button
                                        type="button"
                                        className="absolute md:right-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={toggleConfirmPasswordVisibility}>
                                        {confirmPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-800 lg:mt-7 md:mt-5 mt-3 lg:text-base md:text-base text-sm md:font-medium text-justify">Yes, I agree to the processing of my personal data in according with the <span className="text-purple-800 lg:font-extrabold font-bold border-b-2 border-purple-800"><Link to="/privacyPolicy">Privacy Policy</Link></span> for creating an account.</p>

                        <button type="submit" className="lg:mt-8 md:mt-12 mt-5 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-52 md:w-44 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto">SignUp</button>
                    </form>
                    <p className="lg:w-[400px] md:w-[500px] text-gray-800 lg:mt-4 md:mt-3 mt-2 lg:text-base md:text-base text-sm mx-auto md:font-medium">Already have an account? <span className="text-purple-800 lg:font-extrabold font-bold border-b-2 border-purple-800"><Link to="/signIn">Login</Link></span> now!</p>
                </div>
            </div>
            <div className="lg:w-[38%] lg:block hidden">
                <img className="w-full" src={banner} alt="banner" />
            </div>
        </div>
    );
};

export default SignUp;