import BestSellers from "../components/landing/BestSellers";
import Categories from "../components/landing/Categories";
import HeroSection from "../components/landing/HeroSection";
import NewArrivals from "../components/landing/NewArrivals";
import Testimonials from "../components/landing/Testimonials";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <NewArrivals />
      <BestSellers />
      <Testimonials />
    </>
  );
};

export default Landing;
