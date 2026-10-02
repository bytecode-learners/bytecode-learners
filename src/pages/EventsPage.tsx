import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Monitor, Cpu } from 'lucide-react';

const EventsPage = () => {
  const [eventData, setEventData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  useEffect(() => {
    try {
      const files = (import.meta as any).glob('../../content/events/*.json', { eager: true });
      const events = Object.values(files).map((module: any) => module.default || module);
      setEventData(events);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalPages = Math.ceil(eventData.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventData.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header />
      <main className="grow pt-32 pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={16} className="text-primary" />
            <span className="text-primary font-mono tracking-[0.3em] text-[10px] uppercase">
              Event_Registry_v4.2 // Full_Logs
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-2 uppercase">
            All Events
          </h1>
          <div className="h-1 w-24 bg-primary shadow-[0_0_15px_rgba(80,255,105,0.5)] mb-12"></div>

          {loading ? (
            <div className="text-primary font-mono text-center py-20 animate-pulse">
              LOADING_EVENTS...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentEvents.map((event: any, index: number) => (
                  <div key={index} className="event-card group relative bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/10 transition-all duration-500 hover:border-primary/30 flex flex-col">
                    <div className="relative aspect-4/3 w-full overflow-hidden border-b border-outline-variant/5">
                      <img
                        alt={event.title}
                        src={event.img}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      />
                      <span className="absolute top-4 left-4 bg-primary text-black text-[10px] font-black px-2 py-1 rounded flex items-center gap-1.5 tracking-widest uppercase z-30 shadow-lg">
                        <Monitor size={12} /> {event.tag || 'Activity'}
                      </span>
                    </div>
                    <div className="p-8 grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-center border-r border-outline-variant/30 pr-4">
                          <span className="block text-2xl font-headline font-bold text-primary">
                            {event.date?.split(' ')[0] || '??'}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-mono">
                            {event.date?.split(' ')[1] || 'LOG'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant font-mono mt-1">
                            <Calendar size={12} className="text-primary/60" />
                            LOCATION: {event.location || 'REMOTE'}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                        "{event.desc}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-16 font-mono text-sm">
                  <button 
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-primary/50 text-primary rounded disabled:opacity-30 hover:bg-primary/10 transition-colors uppercase"
                  >
                    Prev
                  </button>
                  <span className="text-on-surface">
                    Page <span className="text-primary font-bold">{currentPage}</span> of {totalPages}
                  </span>
                  <button 
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-primary/50 text-primary rounded disabled:opacity-30 hover:bg-primary/10 transition-colors uppercase"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
