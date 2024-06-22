import React, { useState } from 'react';
const dataOfFAQs = [
    {
        id: 1,
        question: 'What types of clothing does Stylish Fashion offer?',
        answer: 'Stylish Fashion offers a wide range of clothing for men, women, and kids. Our collection includes casual wear, formal attire, active wear, and accessories to suit every occasion and style.',
    },
    {
        id: 2,
        question: 'How can I find the right size?',
        answer: 'We provide detailed size charts for men, women, and kids on each product page. You can use these charts to find the best fit for your measurements. If you’re still unsure, our customer service team is happy to assist you.',
    },
    {
        id: 3,
        question: 'How do I sign up for the Stylish Fashion newsletter?',
        answer: "You can sign up for our newsletter by entering your email address in the subscription box found at the bottom of our website. As a subscriber, you’ll receive updates on new arrivals, exclusive offers, and fashion tips."
    },
    {
        id: 4,
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods, including credit/debit cards, PayPal, and other secure payment options. All transactions are encrypted to ensure your payment information is safe.',
    },
    {
        id: 5,
        question: 'Can I change or cancel my order after placing it?',
        answer: "If you need to change or cancel your order, please contact our customer service team as soon as possible. We will do our best to accommodate your request if the order has not yet been processed or shipped.",
    },
    {
        id: 6,
        question: 'How can I contact customer service?',
        answer: "You can reach our customer service team via email at support@stylishfashion.com or by calling our toll-free number. Our team is available to assist you with any questions or concerns.",
    },
];

const FaqItem = ({ question, answer, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-2 rounded-xl border-purple-800 shadow-lg">
            <button
                className="flex items-center justify-between w-full lg:p-6 md:p-5 px-3 py-4 text-left focus:outline-none"
                onClick={toggleAccordion}>
                <span className="w-[93%] lg:text-xl text-lg font-semibold"><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800">Question 0{id}: </span>{question}</span>
                <span className='w-[5%] flex justify-end'>
                    <svg
                        className={`lg:w-5 md:w-4 w-3 lg:h-5 md:h-4 h-3 ${isOpen ? 'transform rotate-180' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a1 1 0 01-.707-.293l-8-8a1 1 0 111.414-1.414L10 15.586l7.293-7.293a1 1 0 111.414 1.414l-8 8A1 1 0 0110 18z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <div className="lg:p-6 md:p-5 px-3 py-4 bg-gradient-to-r from-pink-100 to-purple-200 rounded-xl">
                    <p className="text-black lg:text-xl font-medium "><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 border-b-2 border-purple-800">Answer:</span> {answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQs = () => {
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">Frequently Asked Questions</h1>
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Explore our frequently asked questions for comprehensive information!</p>
            </div>
            <div className="lg:mt-12 md:mt-10 mt-8 flex flex-col gap-3 ">
                {dataOfFAQs?.map((faq) => (
                    <FaqItem key={faq?.id} question={faq?.question} answer={faq?.answer} id={faq?.id} />
                ))}
            </div>
        </div>
    );
};

export default FAQs;