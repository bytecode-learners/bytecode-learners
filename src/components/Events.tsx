import { useEffect, useState, useRef } from 'react';
import {
  Terminal,
  Calendar,
  Cpu,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from 'lucide-react';


  

const Events = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchEvents = () => {
    setLoading(true);
    setError(false);
    try {
      const files = (import.meta as any).glob('../../content/events/*.json', { eager: true });
      const events = Object.values(files).map((module: any) => module.default || module);
      if (events.length > 0) {
        setEventData(events);
      } else {
        throw new Error('NO_DATA');
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Intersection Observer for mobile dots navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(parseInt(entry.target.getAttribute('data-index') || '0'));
          }
        });
      },
      { root: scrollRef.current, threshold: 0.6 }
    );

    const cards = scrollRef.current?.querySelectorAll('.event-card');
    cards?.forEach((card: Element) => observer.observe(card));
    return () => observer.disconnect();
  }, [eventData, loading]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="events"
      className="py-24 px-4 md:px-8 bg-surface-container-low/50 border-t border-outline-variant/10 relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu
                size={16}
                className={`text-primary ${loading ? 'animate-spin' : ''}`}
              />
              <span className="text-primary font-mono tracking-[0.3em] text-[10px] uppercase">
                {loading ? 'Fetching_Packets...' : 'Event_Registry_v4.2'}
              </span>
            </div>
            <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-2 uppercase">
              Events
            </h2>
            <div className="h-1 w-24 bg-primary shadow-[0_0_15px_rgba(80,255,105,0.5)]"></div>
          </div>

          {/* Desktop Slide Navigation */}
          {!loading && !error && (
            <div className="hidden md:flex gap-4">
              <button
                onClick={() => scroll('left')}
                className="p-3 border border-outline-variant/30 rounded-lg hover:border-primary text-on-surface-variant hover:text-primary transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-3 border border-outline-variant/30 rounded-lg hover:border-primary text-on-surface-variant hover:text-primary transition-all active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Content Display */}
        <div className="min-h-100 flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-4 font-mono text-xs text-primary animate-pulse">
              <Terminal size={32} />
              <span>INITIALIZING_DATA_UPLINK...</span>
            </div>
          ) : error ? (
            <div className="bg-surface-container-high border border-primary rounded-xl p-10 text-center max-w-md shadow-[0_0_30px_rgba(80,255,105,0.15)] transition-all duration-300">
              <AlertTriangle
                size={40}
                className="text-red-600 mx-auto mb-4 animate-pulse rounded-full"
              />
              <h3 className="font-headline text-xl text-on-surface mb-2 uppercase">
                SYSTEM_ERROR
              </h3>
              <p className="text-on-surface-variant text-sm mb-6 font-body">
                Unable to sync with event nodes.
              </p>
              <button
                onClick={fetchEvents} // Changed from fetchProjects to fetchEvents
                className="px-6 py-2 border border-primary text-green-600 text-xs font-bold uppercase rounded hover:text-green-100 transition-all active:scale-95"
              >
                Retry_Sync
              </button>
            </div>
          ) : (
            <div className="w-full relative">
              {/* Horizontal Event Slider */}
              <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {eventData.slice(0, 6).map((event, index) => (
                  <div
                    key={event._id || index}
                    data-index={index}
                    className="event-card group relative flex-none w-[85vw] md:w-[calc(33.333%-1rem)] snap-center bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/10 transition-all duration-500 hover:border-primary/30"
                  >
                    {/* Image Area - 4:3 Aspect Ratio & No Fade */}
                    <div className="relative aspect-4/3 w-full overflow-hidden border-b border-outline-variant/5">
                      <img
                        alt={event.title}
                        src={event.img}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                      />

                      {/* Tag Overlay */}
                      <span className="absolute top-4 left-4 bg-primary text-black text-[10px] font-black px-2 py-1 rounded flex items-center gap-1.5 tracking-widest uppercase z-30 shadow-lg">
                        <Monitor size={12} /> {event.tag || 'Activity'}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="p-8">
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

                    {/* Digital CRT Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-20 bg-size-[100%_2px,3px_100%]"></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-3 mt-4">
                {eventData.slice(0, 6).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 transition-all duration-500 rounded-full ${
                      activeIndex === idx
                        ? 'w-10 bg-primary shadow-[0_0_10px_#50ff69]'
                        : 'w-2 bg-outline-variant/30'
                    }`}
                  />
                ))}
              </div>
              
              {eventData.length > 6 && (
                <div className="mt-12 flex justify-center">
                  <a
                    href="/events"
                    className="px-8 py-3 border border-primary text-primary text-xs font-bold uppercase tracking-widest rounded hover:bg-primary hover:text-black transition-all active:scale-95 flex items-center gap-2"
                  >
                    View All Events <ChevronRight size={16} />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default Events;
