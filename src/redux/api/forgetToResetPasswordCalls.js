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
            const text = `Your Password Recovery OTP is ${data.code}. Verify and recover your password.`;
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
