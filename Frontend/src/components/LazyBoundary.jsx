import { Suspense } from "react";
import Loader from "./Loader";

export default function LazyBoundary({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
