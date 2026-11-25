import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Solutions from "@/components/sections/Solutions";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Projects from "@/components/sections/Projects";
import Banner from "@/components/sections/Banner";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
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
      <Banner />
      <Process />
      <Stats />
      <Testimonials />
      <Contact />
    </main>
  );
}