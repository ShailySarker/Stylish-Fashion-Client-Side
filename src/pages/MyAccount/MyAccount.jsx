import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { userRequest } from "../../../helpers/axios/requestMethod";


const MyAccount = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [username, setUsername] = useState(currentUser?.username || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [mobile, setMobile] = useState(currentUser?.mobile || '');
    const [address, setAddress] = useState(currentUser?.address || '');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleImageChange = (e) => {
        if (e?.target?.files && e?.target?.files[0]) {
            setProfilePhoto(e.target.files[0]);
        }
    };

    const handleUpdateAccountInfo = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('address', address);
        if (profilePhoto) {
            formData.append('profilePhoto', profilePhoto);
        }

        try {
            const response = await userRequest.put(`/users/${currentUser?._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('User information updated successfully:', response?.data);
            // Optionally, show a success message or handle the updated data
        } catch (error) {
            console.error('Failed to update user information:', error);
            // Optionally, show an error message
        }
    };

    // useEffect(() => {
    //     if (currentUser) {
    //         Swal.fire({
    //             position: "center",
    //             icon: "success",
    //             title: "Login is successful!",
    //             showConfirmButton: false,
    //             timer: 3000,
    //         });
    //     } else {
    //         Swal.fire({
    //             position: "center",
    //             icon: "error",
    //             title: "Login failed!",
    //             text: loginError,
    //             showConfirmButton: true,
    //         });
    //     }
    // }, [currentUser]);

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Account</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Selecting Product</h1> */}
                {/* <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-48 md:my-40 my-32 text-black text-center font-semibold">Coming Soon!</p> */}
            </div>
            <div className="lg:mt-8 md:mt-5 mt-6">
                <form onSubmit={handleUpdateAccountInfo} className="flex md:flex-row flex-col md:items-start items-center lg:gap-16 md:gap-10 gap-8">
                    <div className="flex flex-col items-center">
                        {profilePhoto ?
                            <div className="lg:mt-0 md:mt-12 border-2 border-purple-800 rounded-lg">
                                <img src={profilePhoto} alt="Uploaded preview" className="lg:w-64 lg:h-72 md:w-52 md:h-60 w-44 h-52 rounded-lg shadow-md" />
                            </div> :
                            <div className="lg:mt-0 md:mt-12 border-2 border-purple-800 rounded-lg lg:w-64 lg:h-72 md:w-52 md:h-60 w-44 h-52 flex justify-center items-center">
                                <label className="block mb-2 text-lg font-semibold text-gray-700">
                                    Upload Image
                                </label>
                            </div>
                        }
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="lg:mt-4 md:mt-3 mt-4 block lg:w-64 md:w-52 w-44 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" required
                        />
                    </div>
                    <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full">
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">UserName<span className="text-[#E41414]">*</span></h4>
                            <input
                                className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required readOnly />
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Email<span className="text-[#E41414]">*</span></h4>
                            <input
                                className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required readOnly />
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Mobile<span className="text-[#E41414]">*</span></h4>
                            <input
                                className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                placeholder="Enter your mobile number.."
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required />
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Address<span className="text-[#E41414]">*</span></h4>
                            <input
                                className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                placeholder="Enter your address.."
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required />
                        </div>
                        {/* <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
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
                        </div> */}
                        <div className="flex justify-center">
                            <button type="submit" className="lg:mt-14 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-64 md:w-52 w-48 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg">Update Account Info</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default MyAccount;