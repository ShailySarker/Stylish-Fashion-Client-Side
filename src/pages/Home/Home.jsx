import Banner from "./Components/Banner";
import Category from "./Components/Category";
import FAQs from "./Components/FAQs";
import Newsletter from "./Components/Newsletter";
import OurProducts from "./Components/OurProducts";

const Home = () => {
    return (
        <>
            <Banner />
            <Category />
            <OurProducts />
            <Newsletter />
            <FAQs />
        </>
    );
};

export default Home;