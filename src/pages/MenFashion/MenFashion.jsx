import React, { Suspense } from "react";
import LazyLoaderComponent from "../../components/LazyLoaderComponent";
const FAQs = React.lazy(() => import("../../components/FAQs"));
const Newsletter = React.lazy(() => import("../../components/Newsletter"));
const MenProducts = React.lazy(() => import("./Components/MenProducts"));

const MenFashion = () => {
    return (
        <>
            <Suspense fallback={<LazyLoaderComponent />}>
                <MenProducts />
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

export default MenFashion;