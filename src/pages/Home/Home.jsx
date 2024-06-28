import Banner from "./Components/Banner";
import Category from "./Components/Category";
import FAQs from "./Components/FAQs";
import Newsletter from "./Components/Newsletter";
import OurProducts from "./Components/OurProducts";
import WhyChooseUs from "./Components/WhyChooseUs";

const Home = () => {
    return (
        <>
            <Banner />
            <Category />
            <OurProducts />
            <WhyChooseUs />
            <Newsletter />
            <FAQs />
        </>
    );
};

export default Home;