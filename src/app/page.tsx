import Nav from "@/components/Nav";
import MorphHero from "@/components/MorphHero";
import { About, Contact, Footer, Services, Stats, Tourists } from "@/components/Sections";
import { BeforeAfter, Faq, LifeStages, Team, Technology, WhyUs } from "@/components/MoreSections";

export default function Home() {
  return (
    <main>
      <Nav />
      <MorphHero />
      <Stats />
      <About />
      <Team />
      <WhyUs />
      <Tourists />
      <LifeStages />
      <Services />
      <Technology />
      <BeforeAfter />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
