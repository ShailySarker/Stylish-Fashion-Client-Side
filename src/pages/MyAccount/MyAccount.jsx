import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { userRequest } from "../../helpers/axios/requestMethod";
import app from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateUser } from "../../redux/userRedux";

const MyAccount = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state?.user);

    // State variables
    const [username, setUsername] = useState(currentUser?.username || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [mobile, setMobile] = useState(currentUser?.mobile ? currentUser?.mobile.slice(4) : '');
    const [address, setAddress] = useState(currentUser?.address || '');
    const [profilePhoto, setProfilePhoto] = useState(currentUser?.profilePhoto || '');
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (e) => {
        if (e?.target?.files && e?.target?.files[0]) {
            const image = e.target.files[0];
            if (image) {
                try {
                    setUploading(true);
                    const storage = getStorage(app);
                    const storageRef = ref(storage, "images/" + image.name);
                    await uploadBytes(storageRef, image);
                    const downloadURL = await getDownloadURL(storageRef);
                    setProfilePhoto(downloadURL);
                } catch (error) {
                    console.log(error);
                } finally {
                    setUploading(false);
                }
            }
        }
    };

    // handling user info updating
    const handleUpdateAccountInfo = async (e) => {
        e.preventDefault();
        if (/^\d{10}$/.test(mobile)) {
            if (username && email && profilePhoto && mobile && address) {
                const updatedAccountInfo = {
                    username,
                    email,
                    profilePhoto,
                    mobile: `+880${mobile}`,
                    address,
                };
                try {
                    const response = await userRequest.put(`/users/${currentUser?._id}`, updatedAccountInfo);
                    // Update the Redux state with the new user information
                    dispatch(updateUser(response?.data));

                    // Update local storage with the new user information
                    localStorage.setItem('user', JSON.stringify(response?.data));

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User info updated successfully!",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                } catch (error) {
                    console.error('Failed to update user information:', error);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "User info update failed!",
                        text: error.message,
                        showConfirmButton: true,
                    });
                }
            }
        } else {
            alert("Mobile number must be exactly 10 digits after the country code!");
        }
    };

    useEffect(() => {
        if (currentUser) {
            setProfilePhoto(currentUser?.profilePhoto || '');
            setUsername(currentUser?.username || '');
            setEmail(currentUser?.email || '');
            setMobile(currentUser?.mobile ? currentUser?.mobile?.slice(4) : '');
            setAddress(currentUser?.address || '');
        }
    }, [currentUser]);

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Account</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Selecting Product</h1> */}
                {/* <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-48 md:my-40 my-32 text-black text-center font-semibold">Coming Soon!</p> */}
            </div>
            <div className="lg:mt-8 md:mt-5 mt-6 lg:w-2/3 mx-auto flex md:flex-row flex-col md:items-start items-center justify-center lg:gap-16 md:gap-10 gap-8">
                <div className="flex flex-col items-center lg:mt-10 md:mt-7 mt-0 ">
                    {uploading ? (
                        <div className="lg:mt-0 md:mt-12 border-2 border-purple-800 rounded-lg lg:w-64 lg:h-72 md:w-52 md:h-60 w-44 h-52 flex justify-center items-center">
                            <svg
                                className="animate-spin h-10 w-10 text-purple-800"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                            </svg>
                        </div>
                    ) : profilePhoto ? (
                        <div className="lg:mt-0 md:mt-12 border-2 border-purple-800 rounded-lg">
                            <img
                                src={profilePhoto}
                                alt="Uploaded preview"
                                className="lg:w-64 lg:h-72 md:w-52 md:h-60 w-44 h-52 rounded-lg shadow-md"
                            />
                        </div>
                    ) : (
                        <div className="lg:mt-0 md:mt-12 border-2 border-purple-800 rounded-lg lg:w-64 lg:h-72 md:w-52 md:h-60 w-44 h-52 flex justify-center items-center">
                            <label className="block mb-2 text-lg font-semibold text-gray-700">
                                Upload Image
                            </label>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="lg:mt-4 md:mt-3 mt-4 block lg:w-64 md:w-52 w-44 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        required
                    />
                </div>

                <form onSubmit={handleUpdateAccountInfo} className="w-full">
                    <div className="flex flex-col lg:gap-6 md:gap-5 gap-4 w-full">
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">UserName<span className="text-[#E41414]">*</span></h4>
                            <input
                                className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e?.target?.value)}
                                required readOnly />
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Email<span className="text-[#E41414]">*</span></h4>
                            <input
                                className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e?.target?.value)}
                                required readOnly />
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Mobile<span className="text-[#E41414]">*</span></h4>
                            <div className="flex items-center w-full">
                                <span className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 bg-gray-200 rounded-l-xl text-black lg:text-lg font-medium shadow-lg border-y-2 border-l-2 border-purple-800">
                                    +880
                                </span>
                                <input
                                    className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-r-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                    placeholder="Enter your mobile number.."
                                    type="text"
                                    value={mobile}
                                    onChange={(e) => setMobile(e?.target?.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start lg:gap-2 gap-1 w-full">
                            <h4 className="lg:text-lg md:text-lg font-semibold text-black">Address<span className="text-[#E41414]">*</span></h4>
                            <input
                                className="md:py-2 py-[6px] lg:px-5 md:px-4 px-3 rounded-xl w-full lg:text-lg shadow-lg border-2 border-purple-800"
                                placeholder="Enter your address.."
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e?.target?.value)}
                                required />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="lg:mt-14 md:mt-12 mt-8 bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-64 md:w-52 w-48 px-4 lg:py-[10px] py-2 rounded-xl lg:text-xl md:text-lg text-base font-semibold shadow-lg">Update User Info</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyAccount;