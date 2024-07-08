import React, { Suspense } from "react";
import LazyLoaderComponent from "../../components/LazyLoaderComponent";
const FAQs = React.lazy(() => import("../../components/FAQs"));
const Newsletter = React.lazy(() => import("../../components/Newsletter"));
const KidsProducts = React.lazy(() => import("./Components/KidsProducts"));

const KidsFashion = () => {
    return (
        <>
            <Suspense fallback={<LazyLoaderComponent />}>
                <KidsProducts />
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

export default KidsFashion;