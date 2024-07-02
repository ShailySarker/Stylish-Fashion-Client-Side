import FAQs from "../../components/FAQs";
import Newsletter from "../../components/Newsletter";
import Banner from "./Components/Banner";
import Category from "./Components/Category";
import ClientReview from "./Components/ClientsReview";
import FeaturedAttributes from "./Components/FeaturedAttributes";
import FeaturedBrands from "./Components/FeaturedBrands";
import OurProducts from "./Components/OurProducts";
import WhyChooseUs from "./Components/WhyChooseUs";

const Home = () => {
    return (
        <>
            <Banner />
            <FeaturedAttributes />
            <Category />
            <FeaturedBrands />
            <OurProducts />
            <WhyChooseUs />
            <Newsletter />
            <ClientReview />
            <FAQs />
        </>
    );
};

export default Home;