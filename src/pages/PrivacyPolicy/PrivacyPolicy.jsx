const PrivacyPolicy = () => {
    return (
        <div>
            <div className='bg-purple-800 lg:py-48 md:py-28 py-20'>
                <h1 className='lg:text-8xl/relaxed md:text-7xl/normal text-4xl/relaxed text-white font-semibold text-center'>Privacy Policy</h1>
            </div>
            <div className="lg:px-28 md:px-12 px-6 lg:pt-20 md:pt-14 pt-10 text-justify">
                <div className="lg:pb-4 md:pb-2 pb-1">
                    <div className="text-black flex flex-col lg:gap-10 md:gap-7 gap-5">
                        <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-purple-800 text-left">Privacy Policy</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">At <span className="font-semibold">Stylish Fashion</span>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">1. Information We Collect</h3>
                        <div>
                            <ul className='flex flex-col gap-[10px] list-disc lg:pl-16 md:pl-10 pl-7 lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed'>
                                <li className=''><span className="font-semibold">Personal Information: </span>We may collect personal information such as your name, email address, mailing address, phone number, and payment information when you make a purchase, create an account, or subscribe to our newsletter.</li>
                                <li className=''><span className="font-semibold">Non-Personal Information: </span>We may collect non-personal information such as your browser type, device type, pages visited, and the time and date of your visit.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">2. How We Use Your Information</h3>
                        <div>
                            <ul className='flex flex-col gap-[10px] list-disc lg:pl-16 md:pl-10 pl-7 lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed'>
                                <li className=''><span className="font-semibold">To Process Transactions: </span>We use your personal information to process your orders and payments, and to deliver the products you purchase.</li>
                                <li className=''><span className="font-semibold">To Communicate with You: </span>We use your email address to send you order confirmations, updates, newsletters, and promotional materials. You can opt out of receiving these communications at any time.</li>
                                <li className=''><span className="font-semibold">To Improve Our Services: </span>We use non-personal information to analyze website traffic and usage patterns to improve our website and services.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">3. Data Security</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">We use various security measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">4. Cookies and Tracking Technologies</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">We use cookies and similar tracking technologies to enhance your browsing experience and gather information about your use of our website. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our website.</p>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">5. Changes to This Privacy Policy</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on our website. Your continued use of the website after any changes indicates your acceptance of the updated policy.</p>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">6. Contact Us</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">For any questions or concerns regarding these terms and conditions, please contact our customer support team at stylishfashion@gmail.com </p>
                    </div>
                    <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-12 md:mt-10 mt-8 text-black ">By using our website, you acknowledge that you have read, understood, and agree to this Privacy Policy. Thank you for choosing <span className="font-semibold">Stylish Fashion</span>.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;