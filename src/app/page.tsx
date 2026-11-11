import Nav from "@/components/Nav";
import MorphHero from "@/components/MorphHero";
import { About, Contact, Footer, Services, Stats } from "@/components/Sections";
import { Awards, BeforeAfter, Faq, LifeStages, Team, Technology, WhyUs } from "@/components/MoreSections";

export default function Home() {
  return (
    <main>
      <Nav />
      <MorphHero />
      <Stats />
      <About />
      <WhyUs />
      <LifeStages />
      <Services />
      <Technology />
      <Team />
      <Awards />
      <BeforeAfter />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
