import { LightboxProvider } from "@/components/lightbox-provider";
import { Navbar } from "@/components/sections/Navbar";
import { ScrollChrome } from "@/components/sections/ScrollChrome";
import { Hero } from "@/components/sections/Hero";
import { Historia } from "@/components/sections/Historia";
import { Galeria } from "@/components/sections/Galeria";
import { Programacao } from "@/components/sections/Programacao";
import { Ilhabela } from "@/components/sections/Ilhabela";
import { CasaMaritacas } from "@/components/sections/CasaMaritacas";
import { Presentes } from "@/components/sections/Presentes";
import { NossasMaes } from "@/components/sections/NossasMaes";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <LightboxProvider>
      <ScrollChrome />
      <Navbar />
      <Hero />
      <Historia />
      <NossasMaes />
      <Galeria />
      <Programacao />
      <Ilhabela />
      <CasaMaritacas />
      <Presentes />
      <Footer />
    </LightboxProvider>
  );
}
