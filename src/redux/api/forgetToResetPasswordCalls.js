import { publicRequest } from "../../helpers/axios/requestMethod";

// Get user email info
export async function getUser({ email }) {
    try {
        const { data } = await publicRequest.get(`/auth/login/${email}`);
        console.log(data)
        return { data };
    } catch (error) {
        return { error: "User not found!" };
    }
}

// Forget password for generating OTP
export async function generateOTP(email) {
    try {
        // Make a GET request to the backend to generate OTP
        const response = await publicRequest.get(`/auth/generateOTP?email=${encodeURIComponent(email)}`);

        // Handle successful response
        if (response.status === 201) {
            const data = response?.data;
            console.log('OTP generated:', data?.code);

            // Get user information and send OTP email
            const { data: userData } = await getUser({ email });
            const text = `Your Password Recovery OTP is ${data?.code}. Verify and recover your password.`;
            const mailSending = await publicRequest.post("/mailSending", {
                username: userData?.username,
                email: email,
                text,
                subject: "Password Recovery OTP"
            });

            console.log('Email sent:', mailSending?.data?.message);
            alert(`OTP sent to your email: ${email}`);

        } else {
            console.error('Error:', response?.data?.message);
            alert(`Error: ${response?.data?.message}`);
        }

    } catch (error) {
        console.error('Error during OTP generation:', error);
        alert('An error occurred while generating the OTP. Please try again.');
    }
}

// otp check
export async function handleOTPVerify(email, otpCode) {
    try {
        // Make a GET request to verify the OTP
        const response = await publicRequest.get(`/verifyOTP?email=${email}&code=${otpCode}`);

        // Handle the response
        if (response?.status === 200) {
            console.log('OTP verified successfully:', response?.data?.message);
            alert('OTP verified successfully! Proceed to reset your password.');
            // Proceed to the reset password page or enable the password reset functionality
        } else {
            console.error('OTP verification failed:', response?.data?.message);
            alert(`Error: ${response?.data?.message}`);
        }
    } catch (error) {
        console.error('Error during OTP verification:', error?.response || error?.message || error);
        alert('An error occurred while verifying the OTP. Please try again.');
    }
}


// reset password
export async function handleResetPassword(email, password) {
    try {
        // Make a GET request to verify the OTP
        const response = await publicRequest.get("/resetPassword");

        // Handle the response
        if (response?.status === 200) {
            console.log('OTP verified successfully:', response?.data?.message);
            alert('OTP verified successfully! Proceed to reset your password.');
            // Proceed to the reset password page or enable the password reset functionality
        } else {
            console.error('OTP verification failed:', response?.data?.message);
            alert(`Error: ${response?.data?.message}`);
        }
    } catch (error) {
        console.error('Error during OTP verification:', error?.response || error?.message || error);
        alert('An error occurred while verifying the OTP. Please try again.');
    }
}


