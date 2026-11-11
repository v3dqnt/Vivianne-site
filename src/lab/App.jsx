import { useEffect, useState } from 'react';
import Gate from './components/Gate';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { Contact, Footer, Manifesto, Product, Research } from './components/Sections';

export default function App() {
  const [entered, setEntered] = useState(false);

  // Hold the page still until the visitor is through the gate.
  useEffect(() => {
    document.documentElement.classList.toggle('locked', !entered);
  }, [entered]);

  return (
    <>
      {!entered && <Gate onEnter={() => setEntered(true)} />}
      <div className={`site${entered ? ' site--live' : ''}`} inert={!entered}>
        <Nav />
        <main>
          <Hero live={entered} />
          <Manifesto />
          <Research />
          <Product />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
