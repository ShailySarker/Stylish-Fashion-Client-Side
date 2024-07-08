import React, { Suspense } from "react";
import LazyLoaderComponent from "../../components/LazyLoaderComponent";
const FAQs = React.lazy(() => import("../../components/FAQs"));
const Newsletter = React.lazy(() => import("../../components/Newsletter"));
const WomenProducts = React.lazy(() => import("./Components/WomenProducts"));

const WomenFashion = () => {
    return (
        <>
            <Suspense fallback={<LazyLoaderComponent />}>
                <WomenProducts />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <Newsletter />
            </Suspense>
            <Suspense fallback={<LazyLoaderComponent />}>
                <FAQs />
            </Suspense>
        </>
    );
};

export default WomenFashion;