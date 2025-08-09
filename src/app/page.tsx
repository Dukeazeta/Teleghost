import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Brief from "@/components/Brief";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      <NavBar />
      <main>
        <Hero />
        <Brief />
        <Problem />
        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
