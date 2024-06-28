import Banner from "./Components/Banner";
import Category from "./Components/Category";
import ClientReview from "./Components/ClientsReview";
import FAQs from "./Components/FAQs";
import FeaturedAttributes from "./Components/FeaturedAttributes";
import FeaturedBrands from "./Components/FeaturedBrands";
import Newsletter from "./Components/Newsletter";
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