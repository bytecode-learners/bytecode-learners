import { MapPin, Terminal, Shield, Zap } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const SocialCircle = ({
    icon: Icon,
    href,
    label,
  }: {
    icon: any;
    href: string;
    label: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-zinc-900 text-zinc-400 hover:text-primary hover:border-primary transition-all duration-300"
    >
      <Icon size={16} />
    </a>
  );

  return (
    <footer className="relative bg-zinc-950 pt-12 md:pt-20 pb-8 md:pb-10 border-t border-primary/10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-48 bg-primary/10 blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="lg:col-span-4 space-y-4 md:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 group">
              <div className="p-2 bg-black border border-primary/40 rounded-sm">
                <Terminal
                  size={20}
                  className="text-primary animate-pulse md:w-6 md:h-6"
                />
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-black text-white tracking-tighter uppercase font-headline">
                  BYTECODE_LEARNERS
                </span>
                <span className="block text-[8px] md:text-[9px] font-mono text-primary/60 tracking-[0.4em] -mt-1 uppercase">
                  Execution_Unit_v4.0
                </span>
              </div>
            </div>
            <p className="text-zinc-400 text-[11px] md:text-xs font-mono leading-relaxed max-w-xs mx-auto lg:mx-0 opacity-80">
              <span className="text-primary font-bold">{">"}</span>{" "}
              Transitioning from academic syntax to industrial-grade execution.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4 md:space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Shield size={12} className="text-primary" />
              <h4 className="text-[9px] font-mono text-primary uppercase tracking-[0.3em] font-bold">
                Station_Coordinates
              </h4>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="group">
                <p className="text-primary font-headline text-lg md:text-xl font-bold tracking-tight uppercase">
                  Bytecode Learners Club
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-1 text-zinc-400 font-mono text-[10px] md:text-[11px] uppercase tracking-wider">
                  <Zap size={10} className="text-primary/50" />
                  Dept. of Computer Science & Engineering
                </div>
              </div>
              <div className="flex items-start justify-center lg:justify-start gap-3 text-zinc-400 group">
                <MapPin
                  size={18}
                  className="mt-1 text-primary shrink-0 transition-transform group-hover:scale-110"
                />
                <div className="text-left text-[11px] md:text-xs font-medium leading-relaxed font-body">
                  <p className="text-white font-bold opacity-90">
                    Central University of Haryana
                  </p>
                  <p className="opacity-70 italic">
                    Mahendergarh, Haryana, India - 123031
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col items-center lg:items-end space-y-4 md:space-y-6">
            <h4 className="text-[9px] font-mono text-primary uppercase tracking-[0.4em] font-bold">
              Uplink_Channels
            </h4>

            <div className="hidden md:flex gap-4">
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/bytecode-learners/bytecode-learners",
                },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/company/bytecode-learners/",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/bytecode_learners/",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-900 border border-white/5 rounded-lg text-zinc-400 hover:text-primary transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <div className="flex md:hidden gap-4 justify-center">
              <SocialCircle
                icon={FaGithub}
                href="https://github.com/bytecode-learners/bytecode-learners"
                label="Github"
              />
              <SocialCircle
                icon={FaLinkedin}
                href="https://www.linkedin.com/company/bytecode-learners/"
                label="Linkedin"
              />
              <SocialCircle
                icon={FaInstagram}
                href="https://www.instagram.com/bytecode_learners/"
                label="Instagram"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col items-center md:flex-row md:justify-between gap-4 md:gap-6 text-center">
          <div className="group flex items-center gap-2 px-4 py-1.5 bg-zinc-900/50 border border-white/5 rounded-full transition-all hover:border-primary/30">
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
              Dev:
            </span>
            <a
              href="https://linkedin.com/in/vikasingh0897"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-bold text-white group-hover:text-primary transition-colors font-mono"
            >
              Vikas Singh <span className="text-primary/50 ml-0.5">//</span>{" "}
              vikasingh0897
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-[8px] md:text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              System_Status: Optimal
            </span>
            <span className="hidden md:inline text-primary/30">|</span>
            <span className="text-xs">© {currentYear} BYTECODE_LEARNERS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
