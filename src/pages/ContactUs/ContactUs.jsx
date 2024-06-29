import { FaRegEnvelope, FaRegPaperPlane, FaRegUser } from "react-icons/fa";
// import banner from "../../assets/ContactUs/ContactUs_banner.jpg";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";
import { FaLocationDot, FaPhone } from "react-icons/fa6";

const ContactUs = () => {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSending(true);

        const templateParams = {
            user_name: name,
            user_email: email,
            message: message,
        };
        try {
            const response = await emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, templateParams, import.meta.env.VITE_PUBLIC_KEY);
            console.log(response);
            if (response) {
                setEmail("");
                setName("");
                setMessage("");
                console.log("Success");

                setIsSending(false);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Your message sent successfully!',
                    showConfirmButton: false,
                    timer: 3000
                });
                form.current.reset();
            }
        } catch (error) {
            console.error(error);

            setIsSending(false);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong !',
                text: 'Try Again',

            })
        }
    };

    return (
        <div>
            <div className='bg-purple-800 lg:py-48 md:py-28 py-20'>
                <h1 className='lg:text-9xl md:text-8xl text-6xl text-white font-semibold text-center'>Contact Us</h1>
            </div>
            <div className="lg:px-28 md:px-12 px-6 lg:pt-20 md:pt-[74px] pt-10 grid md:grid-cols-2 grid-cols-1 lg:gap-0 md:gap-10 gap-7 items-center">
                <div className="lg:mb-10 md:mb-8 mb-6">
                    <h2 className="font-bold lg:text-4xl md:text-3xl text-2xl lg:mb-10 md:mb-6 mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">General Information</h2>
                    <div className='flex flex-col lg:gap-4 md:gap-3 gap-2 font-semibold'>
                        <p className='flex items-center gap-3'>
                            <span><FaPhone className="text-black lg:text-xl md:text-lg text-base " /></span>
                            <span className="lg:text-xl md:text-lg text-base">+880 0000000000</span>
                        </p>
                        <p className='flex items-center gap-3'>
                            <span><FaRegEnvelope className="text-black lg:text-xl md:text-lg text-base" /></span>
                            <span className="lg:text-xl md:text-lg text-base">stylefashion@gmail.com</span>
                        </p>
                    </div>
                </div>
                <div className='lg:flex justify-end'>
                    {/* <h2 className='font-semibold md:text-3xl text-2xl md:mb-10 mb-6 text-black'>Contact Us</h2> */}
                    <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-3 lg:w-5/6 '>
                        <div className='flex items-center'>
                            <FaRegUser className='relative text-black left-8 -ml-4' />
                            <input onChange={(e) => setName(e.target.value)} className='border-2 rounded-xl px-10 lg:py-3 md:py-[10px] py-2 placeholder-black border-purple-800 w-full text-black' type="text" name="name" id="" value={name} placeholder='Name' />
                        </div>
                        <div className='flex items-center'>
                            <FaRegEnvelope className='relative text-black left-8 -ml-4' />
                            <input onChange={(e) => setEmail(e.target.value)} className='border-2 rounded-xl px-10 lg:py-3 md:py-[10px] py-2 placeholder-black border-purple-800 w-full text-black' type="email" name="email" id="" value={email} placeholder='Email' />
                        </div>
                        <div className='flex'>
                            <FaRegPaperPlane className='relative text-black left-8 -ml-4 top-5 -mb-5' />
                            <textarea
                                // onChange={}
                                required
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                name="message"
                                type="text"
                                placeholder="Leave your message"
                                className="textarea h-32 w-full text-black border-2 focus-visible:border-purple-800 rounded-xl px-10 py-3 placeholder-black border-purple-800"
                            />
                        </div>
                        <div className='lg:mt-10 md:mt-9 mt-7 flex items-center'>
                            <input
                                value={isSending ? "Sending..." : "Send Now !"}
                                disabled={isSending}
                                className='bg-gradient-to-r from-blue-600 to-purple-800 lg:py-3 py-[10px] text-xl font-semibold rounded-xl text-white lg:w-1/2 w-2/3 mx-auto'
                                type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;