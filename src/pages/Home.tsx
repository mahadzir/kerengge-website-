import Hero from '../sections/Hero';
import About from '../sections/About';
import Gallery from '../sections/Gallery';
import Flipbook from '../sections/Flipbook';
import Works from '../sections/Works';
import Awards from '../sections/Awards';
import Video from '../sections/Video';
import CTA from '../sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Flipbook />
      <Works />
      <Awards />
      <Video />
      <CTA />
    </>
  );
}
