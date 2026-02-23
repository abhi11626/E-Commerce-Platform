import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/router";

import { CartContextProvider } from "./context/CartContext";

export default function App() {
  return (
    <>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </>
  );
}
