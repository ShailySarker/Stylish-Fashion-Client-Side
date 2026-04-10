/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaLock, FaKey, FaShieldHalved } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { changePassword } from "../../redux/api/apiCalls";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const oldPassword = form.oldPassword.value;
        const newPassword = form.newPassword.value;
        const confirmPassword = form.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Passwords do not match",
                text: "New password and confirm password must be the same.",
            });
            return;
        }

        // Validation (mirroring server-side Joi)
        if (!/(?=.*[A-Z].*[A-Z])/.test(newPassword)) {
            Swal.fire({ icon: "error", title: "Wait!", text: "Please add at least two uppercase letters in new password.", });
            return;
        }
        if (!/(?=.*[0-9].*[0-9])/.test(newPassword)) {
            Swal.fire({ icon: "error", title: "Wait!", text: "Please add at least two numbers in new password.", });
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(newPassword)) {
            Swal.fire({ icon: "error", title: "Wait!", text: "Please add a special character in new password.", });
            return;
        }
        if (newPassword.length < 8) {
            Swal.fire({ icon: "error", title: "Wait!", text: "Password must be at least 8 characters long.", });
            return;
        }

        setIsLoading(true);
        try {
            const data = {
                email: currentUser.email,
                oldPassword,
                newPassword
            };
            const result = await changePassword(data);
            if (result.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Password changed successfully!",
                    timer: 2000,
                    showConfirmButton: false
                });
                form.reset();
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error || "Something went wrong!",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {isLoading && <Loader />}
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 hover:shadow-purple-100">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-blue-600 to-purple-800 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <FaShieldHalved className="text-white text-3xl" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800">
                        Security Settings
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Update your password to keep your account secure
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Old Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <FaLock className="h-4 w-4" />
                                </span>
                                <input
                                    name="oldPassword"
                                    type={showOldPassword ? "text" : "password"}
                                    required
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent sm:text-sm transition-all duration-200"
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                    {showOldPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <FaKey className="h-4 w-4" />
                                </span>
                                <input
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    required
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent sm:text-sm transition-all duration-200"
                                    placeholder="Minimum 8 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                    {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <FaKey className="h-4 w-4" />
                                </span>
                                <input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent sm:text-sm transition-all duration-200"
                                    placeholder="Retype new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-800 hover:from-blue-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg transform transition-all duration-200 active:scale-95"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
