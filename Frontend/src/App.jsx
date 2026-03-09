import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/router";

import { CartContextProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}
