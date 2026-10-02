import { useEffect, useState, useRef } from 'react';
import {
  Code,
  Layers,
  Terminal,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';


  

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchProjects = () => {
    setLoading(true);
    setError(false);
    try {
      const files = import.meta.glob('../../content/projects/*.json', { eager: true });
      const projects = Object.values(files).map((module: any) => module.default || module);
      if (projects.length > 0) {
        setProjectData(projects);
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
    fetchProjects();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexStr = entry.target.getAttribute('data-index');
            const index = parseInt(indexStr || '0');
            setActiveIndex(index);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.6 }
    );

    const cards = scrollRef.current?.querySelectorAll('.project-card');
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [projectData, loading]);

  return (
    <section
      id="projects"
      className="py-24 px-4 md:px-8 bg-surface-container-low/50 border-t border-outline-variant/10 relative overflow-hidden"
    >
      {/* Aligned Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Aligned with Events */}
        <div className="flex justify-between items-end mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers
                size={16}
                className={`text-primary ${loading ? 'animate-spin' : ''}`}
              />
              <span className="text-primary font-mono tracking-[0.3em] text-[10px] uppercase">
                {loading ? 'Scanning_Repos...' : 'Repository_Explorer_v2.0'}
              </span>
            </div>
            <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface mb-2 uppercase">
              Projects
            </h2>
            <div className="h-1 w-24 bg-primary shadow-[0_0_15px_rgba(80,255,105,0.5)]"></div>
          </div>

          {/* Desktop Navigation */}
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
                Unable to sync with project nodes.
              </p>
              <button
                onClick={fetchProjects}
                className="px-6 py-2 border border-primary text-green-600 text-xs font-bold uppercase rounded hover:text-green-100 transition-all active:scale-95"
              >
                Retry_Sync
              </button>
            </div>
          ) : (
            <div className="w-full relative">
              {/* Horizontal Project Slider */}
              <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {projectData.map((project, index) => (
                  <div
                    key={project._id || index}
                    data-index={index}
                    className="project-card group relative flex-none w-[85vw] md:w-[calc(33.333%-1rem)] snap-center bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/10 transition-all duration-500 hover:border-primary/30"
                  >
                    <div className="p-8 flex flex-col h-full">
                      {/* Version & Status Badges */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-2">
                          <span className="bg-primary/10 text-primary text-[9px] font-mono px-2 py-0.5 rounded border border-primary/20 uppercase">
                            {project.version || 'v1.0.0'}
                          </span>
                          <span className="bg-surface-container-highest text-on-surface-variant text-[9px] font-mono px-2 py-0.5 rounded border border-outline-variant/20 uppercase">
                            {project.status || 'Active'}
                          </span>
                        </div>
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary/40 hover:text-primary transition-colors p-1"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>

                      <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300 uppercase mb-4">
                        {project.title}
                      </h3>

                      <p className="text-sm text-on-surface-variant leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity mb-8 line-clamp-4">
                        "{project.desc}"
                      </p>

                      <div className="mt-auto space-y-6">
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {(project.tech || []).map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono text-on-surface-variant bg-surface-container-low px-2 py-1 rounded border border-outline-variant/10 uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Button */}
                        <a
                          href={project.repo || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-primary/5 border border-primary/20 rounded-lg text-primary font-mono font-bold text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-primary hover:text-black hover:shadow-[0_0_15px_rgba(80,255,105,0.4)] active:scale-95"
                        >
                          <Code size={14} />
                          <span>View_Source_Code</span>
                        </a>
                      </div>
                    </div>

                    {/* Digital CRT Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(80,255,105,0.01),rgba(80,255,105,0.02))] z-20 bg-size-[100%_2px,3px_100%] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              {/* Slider Progress Indicators */}
              <div className="flex justify-center items-center gap-3 mt-4">
                {projectData.map((_, idx) => (
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
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes greenGlow {
          0%, 100% { shadow: [0_0_20px_rgba(80,255,105,0.15)]; }
          50% { shadow: [0_0_35px_rgba(80,255,105,0.3)]; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
