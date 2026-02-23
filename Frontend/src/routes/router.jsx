import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import LazyBoundary from "../components/LazyBoundary";

import { getProducts, getProductById } from "../api/prodcutApi";

// Lazy load all page components for code splitting
const HomePage = lazy(() => import("../components/HomePage"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Checkout = lazy(() => import("../pages/Checkout"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Signup = lazy(() => import("../pages/Signup"));
const Success = lazy(() => import("../pages/Success"));
const Cancel = lazy(() => import("../pages/Cancel"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <LazyBoundary>
            <HomePage />
          </LazyBoundary>
        ),
      },
      {
        path: "products",
        element: (
          <LazyBoundary>
            <Products />
          </LazyBoundary>
        ),
        loader: getProducts,
      },
      {
        path: "products/:id",
        element: (
          <LazyBoundary>
            <ProductDetails />
          </LazyBoundary>
        ),
        loader: ({ params }) => getProductById(params.id),
      },
      {
        path: "checkout",
        element: (
          <LazyBoundary>
            <Checkout />
          </LazyBoundary>
        ),
      },
      {
        path: "contact-us",
        element: (
          <LazyBoundary>
            <ContactUs />
          </LazyBoundary>
        ),
      },
      {
        path: "signup",
        element: (
          <LazyBoundary>
            <Signup />
          </LazyBoundary>
        ),
      },
      {
        path: "success",
        element: (
          <LazyBoundary>
            <Success />
          </LazyBoundary>
        ),
      },
      {
        path: "cancel",
        element: (
          <LazyBoundary>
            <Cancel />
          </LazyBoundary>
        ),
      },
    ],
  },
]);
