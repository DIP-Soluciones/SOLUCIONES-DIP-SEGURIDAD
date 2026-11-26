import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Solutions from "@/components/sections/Solutions";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Projects from "@/components/sections/Projects";
import SpecializedServices from "@/components/sections/SpecializedServices";
import Banner from "@/components/sections/Banner";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Brands />
      <Solutions />
      <FeaturedProducts />
      <Projects />
      <SpecializedServices />
      <Banner />
      <Process />
      <Stats />
      <Clients />
      <Testimonials />
      <Contact />
    </main>
  );
}