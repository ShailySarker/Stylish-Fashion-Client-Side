/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import banner from "../../assets/Images/Login/fashion-model-kids-free-photo-removebg-preview.png";
import companyLogo from "../../assets/Images/Login/logo.jpg";
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaX, FaRobot, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/api/apiCalls";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import {
  generateOTP,
  resetPassword,
  verifyOTP,
} from "../../redux/api/forgetToResetPasswordCalls";
import { fetchWishlist } from "../../redux/api/wishlistCalls";
import { fetchCart } from "../../redux/api/cartCalls";
import { fetchOrders } from "../../redux/api/orderCalls";

// ─── Demo credentials (update these to match your actual test accounts) ───────
const DEMO_CREDENTIALS = {
  admin: {
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  },
  user: {
    email: import.meta.env.VITE_USER_EMAIL,
    password: import.meta.env.VITE_USER_PASSWORD,
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const { currentUser, isFetching, loginError } = useSelector(
    (state) => state?.user,
  );

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", ""]);
  // Use a single ref-array instead of calling useRef inside a loop (Rules of Hooks)
  const inputRefs = useRef([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [forgetPasswordWindow, setForgetPasswordWindow] = useState(false);
  const [otpWindow, setOtpWindow] = useState(false);
  const [resetPasswordWindow, setResetPasswordWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoFilling, setIsDemoFilling] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => setPasswordVisible((p) => !p);
  const toggleNewPasswordVisibility = () => setNewPasswordVisible((p) => !p);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible((p) => !p);

  // ── Fill demo credentials into the visible form inputs ────────────────────
  const fillDemoCredentials = (role) => {
    setIsDemoFilling(true);
    const creds = DEMO_CREDENTIALS[role];
    if (emailRef.current) emailRef.current.value = creds.email;
    if (passwordRef.current) passwordRef.current.value = creds.password;
    setTimeout(() => setIsDemoFilling(false), 600);
  };

  // ── Main login handler ────────────────────────────────────────────────────
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    const email = form?.email?.value;
    const password = form?.password?.value;

    if (!gmailRegex.test(email)) {
      alert("Email is not in the correct format!");
      return;
    }

    const result = await login(dispatch, { email, password });

    if (result && result?.accessToken) {
      // Store token
      localStorage.setItem("token", result.accessToken);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login is successful!",
        showConfirmButton: false,
        timer: 2000,
      });

      if (result.isAdmin) {
        // Admin → redirect to new unified admin dashboard
        navigate("/admin/dashboard", { replace: true });
      } else {
        // Regular user → fetch their personal data then navigate
        try {
          await Promise.all([
            dispatch(fetchWishlist(result._id)),
            dispatch(fetchCart(result._id)),
            dispatch(fetchOrders(result._id)),
          ]);
        } catch (err) {
          console.error("Failed to load user data:", err);
        }
        navigate(from, { replace: true });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed!",
        text: typeof result === "string" ? result : loginError,
        showConfirmButton: true,
      });
    }
  };

  // ── Forget-password flow handlers ─────────────────────────────────────────
  const handleForgetPasswordWindowOpen = () => setForgetPasswordWindow(true);

  const handleCloseModal = () => {
    setForgetPasswordWindow(false);
    setOtpWindow(false);
    setResetPasswordWindow(false);
  };

  const handleForgetPasswordWindow = async (e) => {
    e.preventDefault();
    const email = e?.target?.email?.value;
    if (!email) {
      alert("Kindly enter your email address!");
      return;
    }
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      alert("Email is not in the correct format!");
      return;
    }
    setIsLoading(true);
    try {
      await generateOTP(email);
      setForgetPasswordWindow(false);
      setOtpWindow(true);
    } catch {
      alert("An error occurred while generating the OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (event) => {
    event.preventDefault();
    const otpCode = otpDigits.join("");
    if (otpCode?.length !== 5) {
      alert("Please enter the full 5-digit OTP");
      return;
    }
    const isVerified = await verifyOTP(otpCode);
    if (isVerified) {
      setOtpDigits(["", "", "", "", ""]);
      setOtpWindow(false);
      setResetPasswordWindow(true);
      event?.target?.reset();
    }
  };

  const handleOtpDigitChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
      if (index < otpDigits.length - 1 && value.length === 1)
        inputRefs.current[index + 1]?.focus();
      if (index > 0 && value.length === 0)
        inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    setOtpDigits(["", "", "", "", ""]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData?.email) {
      alert("User data not found. Please try again.");
      return;
    }
    await generateOTP(userData.email);
  };

  const handleResetPasswordWindow = async (e) => {
    e.preventDefault();
    const form = e?.target;
    const newPassword = form?.newPassword?.value;
    const confirmPassword = form?.confirmPassword?.value;
    if (!/(?=.*[A-Z].*[A-Z])/.test(newPassword)) {
      alert("Please add at least two uppercase letters.");
      return;
    }
    if (!/(?=.*[0-9].*[0-9])/.test(newPassword)) {
      alert("Please add at least two numbers.");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(newPassword)) {
      alert("Please add a special character.");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password does not match with confirm password!");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData?.email) {
      alert("User data not found. Please try again.");
      return;
    }
    await resetPassword(userData.email, newPassword);
    localStorage.removeItem("userData");
    setResetPasswordWindow(false);
  };

  return (
    <div className="relative flex justify-between items-center bg-[#b7b0b00a] bg-opacity-75 backdrop-filter backdrop-blur-lg h-screen lg:px-28 md:px-9 px-6 lg:py-2 md:py-7 py-5">
      {isFetching && <Loader />}
      <div className="lg:w-[45%] md:w-2/3 w-11/12 lg:mx-0 mx-auto">
        <Link to="/">
          <img
            className="lg:w-36 md:w-32 w-24 md:h-auto"
            src={companyLogo}
            alt="Stylish Fashion"
          />
        </Link>
        <div className="text-center w-[100%]">
          <h2 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800 lg:mt-3 md:mt-2 mt-6">
            Login
          </h2>

          {/* ── Demo Login Buttons ── */}
          <div className="lg:mt-5 md:mt-4 mt-3">
            <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
              Quick Demo Login
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <button
                type="button"
                id="demo-admin-login-btn"
                onClick={() => fillDemoCredentials("admin")}
                className="flex items-center gap-2 px-4 py-[7px] rounded-xl border-2 border-purple-800 text-purple-800 font-semibold text-sm hover:bg-purple-800 hover:text-white transition-all duration-200 shadow"
              >
                <FaRobot className="text-base" />
                Login as Admin
              </button>
              <button
                type="button"
                id="demo-user-login-btn"
                onClick={() => fillDemoCredentials("user")}
                className="flex items-center gap-2 px-4 py-[7px] rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200 shadow"
              >
                <FaUser className="text-base" />
                Login as User
              </button>
            </div>
            {isDemoFilling && (
              <p className="text-xs text-green-600 font-medium mt-1 animate-pulse">
                ✓ Demo credentials filled — click Login!
              </p>
            )}
          </div>

          <form onSubmit={handleLogin} className="lg:mt-6 md:mt-5 mt-4">
            <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full lg:mx-0 mx-auto">
              <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                <h4 className="lg:text-lg md:text-lg font-semibold text-black">
                  Email<span className="text-[#E41414]">*</span>
                </h4>
                <input
                  ref={emailRef}
                  className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                  type="email"
                  name="email"
                  id="login-email"
                  required
                />
              </div>
              <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                <h4 className="lg:text-lg md:text-lg font-semibold text-black">
                  Password<span className="text-[#E41414]">*</span>
                </h4>
                <div className="relative w-full">
                  <input
                    ref={passwordRef}
                    type={passwordVisible ? "text" : "password"}
                    className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                    name="password"
                    id="login-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute md:right-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
            </div>
            <p
              onClick={handleForgetPasswordWindowOpen}
              className="lg:mt-5 md:mt-5 mt-3 lg:text-base md:text-base text-sm md:font-bold font-semibold text-purple-800 text-right cursor-pointer"
            >
              Forget password?
            </p>
            <button
              type="submit"
              id="login-submit-btn"
              className="lg:mt-8 md:mt-8 mt-6 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-52 md:w-44 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto block"
            >
              Login
            </button>
          </form>
          <p className="lg:w-[400px] md:w-[500px] text-gray-800 lg:mt-4 md:mt-3 mt-2 lg:text-base md:text-base text-sm mx-auto md:font-medium lg:mb-10">
            Are you new here?{" "}
            <span className="text-purple-800 lg:font-extrabold font-bold border-b-2 border-purple-800">
              <Link to="/signUp"> SignUp</Link>
            </span>{" "}
            now!
          </p>
        </div>
      </div>
      <div className="lg:w-[38%] lg:block hidden">
        <img className="w-full" src={banner} alt="banner" />
      </div>

      {/* ── Forget Password Modal ── */}
      {forgetPasswordWindow && (
        <div className="fixed inset-0 bg-[#ecf0f1bf] bg-opacity-75 overflow-y-auto flex items-center justify-center z-50">
          <div className="relative lg:px-10 lg:py-8 md:px-10 md:py-7 px-4 py-5 rounded-xl bg-white md:w-[560px] w-11/12 mx-auto shadow-lg">
            <div className="flex justify-between">
              <div className="w-[12%]"></div>
              <h2 className="w-[76%] text-center lg:text-3xl/normal md:text-2xl text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">
                Forget Password?
              </h2>
              <div className="w-[12%] flex justify-end">
                <FaX
                  onClick={handleCloseModal}
                  className="bg-purple-800 text-white p-1 md:w-7 md:h-7 w-5 h-5 rounded-full cursor-pointer"
                />
              </div>
            </div>
            <p className="text-center lg:text-lg md:text-base text-sm font-medium text-black">
              Kindly enter your gmail address to get the OTP
            </p>
            <form
              onSubmit={handleForgetPasswordWindow}
              className="lg:mt-16 md:mt-10 mt-8"
            >
              <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full">
                <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                  <h4 className="lg:text-lg md:text-lg font-semibold text-black">
                    Email<span className="text-[#E41414]">*</span>
                  </h4>
                  <input
                    className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                    type="email"
                    name="email"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="lg:mt-14 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-44 md:w-40 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto flex justify-center"
              >
                Submit
              </button>
            </form>
            {isLoading && (
              <p className="text-center font-semibold mt-5">Loading...</p>
            )}
          </div>
        </div>
      )}

      {/* ── OTP Modal ── */}
      {otpWindow && (
        <div className="fixed inset-0 bg-[#ecf0f1bf] bg-opacity-75 overflow-y-auto flex items-center justify-center z-50">
          <div className="relative lg:px-10 lg:py-8 md:px-10 md:py-7 px-4 py-5 rounded-xl bg-white md:w-[560px] w-11/12 mx-auto shadow-lg">
            <div className="flex justify-between">
              <div className="w-[12%]"></div>
              <h2 className="w-[76%] text-center lg:text-3xl/normal md:text-2xl text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">
                OTP
              </h2>
              <div className="w-[12%] flex justify-end">
                <FaX
                  onClick={() => setOtpWindow(false)}
                  className="bg-purple-800 text-white p-1 md:w-7 md:h-7 w-5 h-5 rounded-full cursor-pointer"
                />
              </div>
            </div>
            <p className="text-center lg:text-lg md:text-base text-sm font-medium text-black">
              Kindly enter OTP digits which you got from Gmail
            </p>
            <form onSubmit={handleOTPVerify} className="lg:mt-16 md:mt-10 mt-8">
              <div className="flex justify-center">
                {otpDigits?.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className={`lg:w-14 md:w-12 w-10 h-10 lg:h-14 md:h-12 mx-2 text-center border-[3px] rounded-lg ${digit ? "border-purple-800 text-purple-800" : "border-black"} md:text-2xl text-xl font-semibold`}
                    value={digit}
                    onChange={(e) =>
                      handleOtpDigitChange(index, e?.target?.value)
                    }
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="lg:mt-14 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-44 md:w-40 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto flex justify-center"
              >
                VERIFY
              </button>
            </form>
            <div className="text-center mt-5">
              <p className="lg:text-lg md:text-base text-sm font-medium">
                <span className="text-gray-400">Didn't get the OTP? </span>
                <span className="text-[#0044CC] font-semibold border-b-[3px] border-[#0044CC]">
                  <button onClick={handleResendOTP}>Resend OTP</button>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Reset Password Modal ── */}
      {resetPasswordWindow && (
        <div className="fixed inset-0 bg-[#ecf0f1bf] bg-opacity-75 overflow-y-auto flex items-center justify-center z-50">
          <div className="relative lg:px-10 lg:py-8 md:px-10 md:py-7 px-4 py-5 rounded-xl bg-white md:w-[560px] w-11/12 mx-auto shadow-lg">
            <div className="flex justify-between">
              <div className="w-[12%]"></div>
              <h2 className="w-[76%] text-center lg:text-3xl/normal md:text-2xl text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">
                Reset Password
              </h2>
              <div className="w-[12%] flex justify-end">
                <FaX
                  onClick={handleCloseModal}
                  className="bg-purple-800 text-white p-1 md:w-7 md:h-7 w-5 h-5 rounded-full cursor-pointer"
                />
              </div>
            </div>
            <p className="text-center lg:text-lg md:text-base text-sm font-medium text-black">
              Kindly set your new password
            </p>
            <form
              onSubmit={handleResetPasswordWindow}
              className="lg:mt-16 md:mt-10 mt-8"
            >
              <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full">
                <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                  <h4 className="lg:text-lg md:text-lg font-semibold text-black">
                    New Password<span className="text-[#E41414]">*</span>
                  </h4>
                  <div className="relative w-full">
                    <input
                      type={newPasswordVisible ? "text" : "password"}
                      className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                      name="newPassword"
                      required
                    />
                    <button
                      type="button"
                      className="absolute md:right-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={toggleNewPasswordVisibility}
                    >
                      {newPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                  <h4 className="lg:text-lg md:text-lg font-semibold text-black">
                    Confirm Password<span className="text-[#E41414]">*</span>
                  </h4>
                  <div className="relative w-full">
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                      name="confirmPassword"
                      required
                    />
                    <button
                      type="button"
                      className="absolute md:right-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {confirmPasswordVisible ? (
                        <FaRegEyeSlash />
                      ) : (
                        <FaRegEye />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="lg:mt-14 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-44 md:w-40 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg mx-auto flex justify-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
