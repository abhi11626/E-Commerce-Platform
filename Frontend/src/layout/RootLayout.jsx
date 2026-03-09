import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />

      <div className="bg-gray-950 text-white min-h-screen">
        {navigation.state === "loading" && <Loader />}
        <Outlet />
      </div>
    </>
  );
}
