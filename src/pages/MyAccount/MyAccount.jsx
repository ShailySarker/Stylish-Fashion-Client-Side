import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const MyAccount = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const { currentUser, isFetching, loginError } = useSelector((state) => state?.user);
    // const cartInfo = useSelector((state) => state?.cart);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const handleUpdateAccountInfo = async (event) => {
        event?.preventDefault();
        const form = event?.target;
        const username = form?.username?.value;
        const password = form?.password?.value;

        // await login(dispatch, { username, password });
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
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Login failed!",
                text: loginError,
                showConfirmButton: true,
            });
        }
    }, [currentUser]);

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Account</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Selecting Product</h1> */}
                {/* <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-48 md:my-40 my-32 text-black text-center font-semibold">Coming Soon!</p> */}
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleUpdateAccountInfo} className="lg:mt-8 md:mt-5 mt-6 w-[50%] flex flex-col items-center">
                    <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full">
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">UserName<span className="text-[#E41414]">*</span></h4>
                            <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="text" name="username" id="username" value={currentUser?.username} required />
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Email<span className="text-[#E41414]">*</span></h4>
                            <input className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" type="email" name="email" id="" value={currentUser?.email} required />
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Password<span className="text-[#E41414]">*</span></h4>
                            <div className="relative w-full">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800" name="password" id="password" value={currentUser?.password} required
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

                    <button type="submit" className="lg:mt-14 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-64 md:w-44 w-36 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg">Update Account Info</button>
                </form>
            </div>
        </div>
    );
};

export default MyAccount;