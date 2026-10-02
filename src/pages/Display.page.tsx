import Header from '../components/Header';
import About from '../components/About';
import Events from '../components/Events';
import Projects from '../components/Projects';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const DisplayPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <About />
        <Events />
        <Projects />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default DisplayPage;
