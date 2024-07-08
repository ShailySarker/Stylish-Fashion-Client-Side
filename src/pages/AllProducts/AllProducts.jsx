import React, { Suspense } from "react";
import LazyLoaderComponent from "../../components/LazyLoaderComponent";
const FAQs = React.lazy(() => import("../../components/FAQs"));
const Newsletter = React.lazy(() => import("../../components/Newsletter"));
const Products = React.lazy(() => import("./Components/Products"));

const AllProducts = () => {
    return (
        <>
        <Suspense fallback={<LazyLoaderComponent />}>
                <Products />
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

export default AllProducts;