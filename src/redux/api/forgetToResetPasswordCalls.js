import { publicRequest } from "../../helpers/axios/requestMethod";

// Get user email info
export async function getUser({ email }) {
    try {
        const { data } = await publicRequest.get(`/auth/login/${email}`);
        // console.log(data);

        // Store user data into local storage
        localStorage.setItem('userData', JSON.stringify(data));

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
        if (response?.status === 201) {
            const data = response?.data;
            // console.log('OTP generated:', data?.code);

            // Get user information and send OTP email
            const { data: userData } = await getUser({ email });
            const text = `Your Password Recovery OTP is ${data?.code}. Verify and recover your password.`;
            const mailSending = await publicRequest.post("/mailSending", {
                username: userData?.username,
                email: email,
                text,
                subject: "Password Recovery OTP"
            });

            // console.log('Email sent:', mailSending?.data?.message);
            alert(`OTP sent to your email: ${email}`);

        } else {
            // console.error('Error:', response?.data?.message);
            alert(`Error: ${response?.data?.message}`);
        }

    } catch (error) {
        console.error('Error during OTP generation:', error);
        alert('An error occurred while generating the OTP. Please try again.');
    }
}

// otp check
export async function verifyOTP(otpCode) {
    try {
        const response = await publicRequest.get(`/auth/verifyOTP?code=${otpCode}`);

        if (response?.status === 200) {
            // console.log('OTP verified successfully:', response?.data?.message);
            alert('OTP verified successfully! Proceed to reset your password.');
            return true; // Indicate success
        } else if (response?.status === 400) {
            // console.log('Invalid OTP:', response?.data?.message);
            alert(response?.data?.message);
            return false; // Indicate failure
        } else {
            // console.error('OTP verification failed:', response?.data?.message);
            alert(`Error: ${response?.data?.message}`);
            return false; // Indicate failure
        }

    } catch (error) {
        // console.error('Error during OTP verification:', error?.response);
        // alert('Error during OTP verification:', error?.response?.data?.message);
        alert(error?.response?.data?.message);
        // alert('An error occurred while verifying the OTP. Please try again.');
        return false; // Indicate failure
    }
}


// reset password
export async function resetPassword(email, password) {
    try {
        const response = await publicRequest.put("/auth/resetPassword", { email, password });

        if (response?.status === 201) {
            alert("Password updated successfully!");
            // Redirect user to the login page or another page if needed
        } else {
            alert("Failed to reset password. Please try again.");
        }
    } catch (error) {
        console.error("Error during password reset:", error?.response || error?.message || error);
        alert("An error occurred while resetting the password. Please try again.");
    }
}


