import Navbar from "./components/navbar";
import HomePage from "./pages/home";
import FeaturesPage from "./pages/features";
import ContactPage from "./pages/contact";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <HomePage />
        <FeaturesPage />
        <ContactPage />
      </main>
    </>
  );
};

export default Home;
