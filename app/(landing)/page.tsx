import { Button } from "@/components/ui/button";
import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <HomePage />
        <AboutPage />
      </main>
    </>
  );
};

export default Home;
