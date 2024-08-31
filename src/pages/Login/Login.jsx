import { Link, useLocation, useNavigate } from "react-router-dom";
import banner from "../../assets/Images/Login/fashion-model-kids-free-photo-removebg-preview.png";
import companyLogo from "../../assets/Images/Login/logo.jpg";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/api/apiCalls";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { generateOTP } from "../../redux/api/forgetToResetPasswordCalls";

const Login = () => {
    const dispatch = useDispatch();
    const { currentUser, isFetching, loginError } = useSelector((state) => state?.user);
    // const cartInfo = useSelector((state) => state?.cart);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [forgetPasswordWindow, setForgetPasswordWindow] = useState(false);
    const [otpWindow, setOtpWindow] = useState(true);
    const [resetPasswordWindow, setResetPasswordWindow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleLogin = async (event) => {
        event?.preventDefault();
        const form = event?.target;
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        // const username = form?.username?.value;
        const email = form?.email?.value;
        const password = form?.password?.value;

        if (!gmailRegex.test(email)) {
            alert("Email is not in the correct format!");
            return;
        }
        await login(dispatch, { email, password });
    };

    useEffect(() => {
        if (currentUser) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login is successful!",
                showConfirmButton: false,
                timer: 3000,
            });
            navigate(from, { replace: true });
            // navigate('/');
        } else if (loginError) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login failed!",
                text: loginError,
                showConfirmButton: true,
            });
        }
    }, [currentUser, loginError, from, navigate]);

    const handleForgetPasswordWindowOpen = () => {
        setForgetPasswordWindow(true);
    }

    const handleCloseModal = () => {
        setForgetPasswordWindow(false);
        setOtpWindow(false);
        setResetPasswordWindow(false);
    }

    // handling generate OTP window
    const handleForgetPasswordWindow = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const email = e?.target?.email?.value;

        if (email) {
            const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
            if (!gmailRegex.test(email)) {
                alert("Email is not in the correct format!");
                return;
            } else {
                await generateOTP(email);
                setForgetPasswordWindow(false);
                setOtpWindow(true);

            }
        } else {
            alert("Kindly enter your email address!");
        }
    }

    return (
        <div className="relative flex justify-between items-center bg-[#b7b0b00a] bg-opacity-75 backdrop-filter backdrop-blur-lg h-screen lg:px-28 md:px-9 px-6 lg:py-2 md:py-7 py-5">
            {isFetching && <Loader />} {/* Show loader when fetching */}
            <div className="lg:w-[45%] md:w-2/3 w-11/12 lg:mx-0 mx-auto">
                <Link to="/">
                    <img className="lg:w-36 md:w-32 w-24 md:h-auto" src={companyLogo} alt="Stylish Fashion" />
                </Link>
                <div className="text-center w-[100%]">
                    <h2 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800 lg:mt-3 md:mt-2 mt-6">Login</h2>
                    <form onSubmit={handleLogin} className="lg:mt-8 md:mt-5 mt-6">
                        <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full lg:mx-0 mx-auto">
                            {/* <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">UserName<span className="text-[#E41414]">*</span></h4>
                                <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="text" name="username" id="username" required />
                            </div> */}
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">Email<span className="text-[#E41414]">*</span></h4>
                                <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="email" name="email" id="" required />
                            </div>
                            <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                <h4 className="lg:text-lg md:text-lg font-semibold text-black">Password<span className="text-[#E41414]">*</span></h4>
                                <div className="relative w-full">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" name="password" id="password" required
                                    />
                                    <button
                                        type="button"
                                        className="absolute md:right-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p onClick={handleForgetPasswordWindowOpen} className="lg:mt-6 md:mt-5 mt-3 lg:text-base md:text-base text-sm md:font-bold font-semibold text-purple-800 text-right">Forget password?</p>

                        <button type="submit" className="lg:mt-10 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-52 md:w-44 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto">Login</button>
                    </form>
                    <p className="lg:w-[400px] md:w-[500px] text-gray-800 lg:mt-4 md:mt-3 mt-2 lg:text-base md:text-base text-sm mx-auto md:font-medium lg:mb-10">Are you new here? <span className="text-purple-800 lg:font-extrabold font-bold border-b-2 border-purple-800"><Link to="/signUp"> SignUp</Link></span> now!</p>
                </div>
            </div>
            <div className="lg:w-[38%] lg:block hidden">
                <img className="w-full" src={banner} alt="banner" />
            </div>

            {/* forget password window */}
            {
                forgetPasswordWindow && (
                    <div className="fixed inset-0 bg-[#ecf0f1bf] bg-opacity-75 overflow-y-auto flex items-center justify-center z-50">
                        <div className="relative lg:px-10 lg:py-8 md:px-10 md:py-7 px-3 py-5 m-10 rounded-xl bg-white md:w-[560px] w-11/12 mx-auto shadow-lg">
                            <div className="flex justify-between">
                                <div className="w-[12%]"></div>
                                <h2 className="w-[76%] text-center lg:text-3xl/normal md:text-2xl text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Forget Password?</h2>
                                <div className="w-[12%] flex justify-end">
                                    <FaX onClick={handleCloseModal} className=" bg-purple-800 text-white p-1 md:w-7 md:h-7 w-5 h-5 rounded-full " />
                                </div>
                            </div>
                            <p className="text-center lg:text-lg md:text-base text-sm font-medium text-black">Kindly enter your gmail address to get the OTP</p>
                            <form onSubmit={handleForgetPasswordWindow} className="lg:mt-16 md:mt-5 mt-6">
                                <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full lg:mx-0 mx-auto">
                                    <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                                        <h4 className="lg:text-lg md:text-lg font-semibold text-black">Email<span className="text-[#E41414]">*</span></h4>
                                        <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="email" name="email" id="" required />
                                    </div>
                                </div>
                                <button type="submit" className="lg:mt-14 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-44 md:w-40 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto flex justify-center">Submit</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Login;