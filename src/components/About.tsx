import { useState, useEffect } from "react";
import { Terminal, CodeXml, Zap, ShieldCheck, Cpu } from "lucide-react";

import statsDataJSON from "../../content/stats/index.json";

const About = () => {
  const [statsData, setStatsData] = useState({
    lines: "10K+",
    learners: "400+",
    events: 12,
    achievements: 18,
  });

  useEffect(() => {
    if (statsDataJSON) {
      setStatsData({
        lines: statsDataJSON.lines_committed || "1K+",
        learners: statsDataJSON.active_learners || "600+",
        events: statsDataJSON.live_events || 12,
        achievements: statsDataJSON.kernel_achievements || 18,
      });
    }
  }, []);

  const stats = [
    {
      label: "Lines_Committed",
      value: statsData.lines,
      icon: <CodeXml className="w-10 h-10 md:w-12 md:h-12" />,
    },
    {
      label: "Active_Learners",
      value: statsData.learners,
      icon: <Cpu className="w-10 h-10 md:w-12 md:h-12" />,
      extraClass: "lg:mt-8",
    },
    {
      label: "Live_Events",
      value: statsData.events,
      icon: <Zap className="w-10 h-10 md:w-12 md:h-12" />,
    },
    {
      label: "Achievements",
      value: statsData.achievements,
      icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12" />,
      extraClass: "lg:mt-8",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-24 md:pt-20 pb-12 overflow-hidden bg-surface"
    >
      {/* Background Ambient Glows - Reduced size for mobile */}
      <div className="absolute top-1/4 -left-20 w-48 h-48 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-48 h-48 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center z-10">
        {/* Left Content - Center aligned on mobile, left on desktop */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
          {/* Status Badge with Pulsing Dot */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <Terminal size={14} className="opacity-80" />
            System_Status:{" "}
            <span className="text-white ml-1">Live_Execution</span>
          </div>

          {/* Headline with dynamic spacing */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-headline text-on-surface leading-[0.95] tracking-tighter">
            OPTIMIZE YOUR <br />
            <span className="text-primary text-glow animate-pulse">
              BASE_CODE
            </span>
          </h1>

          {/* Paragraph with improved hierarchy */}
          <p className="text-on-surface-variant max-w-lg mx-auto lg:mx-0 leading-relaxed font-body text-sm md:text-base border-l-2 border-primary/10 pl-4">
            The lecture hall is a{" "}
            <span className="bg-red-500/10 text-red-400 px-1 rounded">
              bottleneck
            </span>
            . We are the hotfix. At{" "}
            <span className="text-primary font-mono font-bold italic">
              ByteCode Learners
            </span>
            , we transition from academic syntax to industrial-grade execution.
          </p>

          {/* Buttons with Hover Glows */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            {/* GAIN_ROOT_ACCESS - Redirects to Contact Form */}
            <a
              href="#contact"
              className="group relative overflow-hidden w-full sm:w-auto px-10 py-4 bg-primary text-black font-black font-headline uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center"
            >
              <span className="relative z-10">GAIN_ROOT_ACCESS</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>

            {/* View_Source - Redirects to GitHub */}
            <a
              href="https://github.com/bytecode-learners/bytecode-learners"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border border-white/10 text-on-surface font-black font-headline uppercase tracking-wider hover:bg-white/5 hover:border-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <span className="opacity-50 font-mono italic">02.</span>
              View_Source
            </a>
          </div>
        </div>

        {/* Right Content - Stats Grid - Top on mobile for visual impact */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 relative order-1 lg:order-2 px-2 md:px-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-5 md:p-8 bg-surface-container-low border border-outline-variant/10 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 ${stat.extraClass || ""}`}
            >
              {/* Background Icon Decoration - Hidden on very small screens to save space */}
              <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 text-primary">
                {stat.icon}
              </div>

              <div className="relative z-10">
                <div className="text-2xl md:text-4xl font-black font-headline text-primary mb-1 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.15em] md:tracking-[0.2em] text-on-surface-variant font-bold leading-none">
                  {stat.label.replace("_", " ")}
                </div>
              </div>

              <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
