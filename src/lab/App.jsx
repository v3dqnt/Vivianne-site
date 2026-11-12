import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { Contact, Footer, Manifesto, Product, Research } from './components/Sections';

export default function App() {
  const [entered, setEntered] = useState(false);

  // Hold the page still while the loader counts up.
  useEffect(() => {
    document.documentElement.classList.toggle('locked', !entered);
  }, [entered]);

  return (
    <>
      {!entered && <Loader onDone={() => setEntered(true)} />}
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
