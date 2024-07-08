import React, { Suspense } from "react";
import LazyLoaderComponent from "../../components/LazyLoaderComponent";
const FAQs = React.lazy(() => import("../../components/FAQs"));
const Newsletter = React.lazy(() => import("../../components/Newsletter"));
const Banner = React.lazy(() => import("./Components/Banner"));
const Category = React.lazy(() => import("./Components/Category"));
const ClientsReview = React.lazy(() => import("./Components/ClientsReview"));
const FeaturedAttributes = React.lazy(() => import("./Components/FeaturedAttributes"));
const FeaturedBrands = React.lazy(() => import("./Components/FeaturedBrands"));
const OurProducts = React.lazy(() => import("./Components/OurProducts"));
const WhyChooseUs = React.lazy(() => import("./Components/WhyChooseUs"));

const Home = () => {
    return (
        <>
            <Suspense fallback={<LazyLoaderComponent />}>
                <Banner />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <FeaturedAttributes />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <Category />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <FeaturedBrands />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <OurProducts />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <WhyChooseUs />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <Newsletter />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <ClientsReview />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <FAQs />
            </Suspense>
        </>
    );
};

export default Home;