import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-white font-sans selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Main Canvas */}
      <main className="relative grow flex flex-col items-center justify-center p-4 md:p-8">
        {/* Background Layers */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,rgba(80,255,105,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(80,255,105,0.05)_1px,transparent_1px)] bg-size-[30px_30px] md:bg-size-[50px_50px]"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none [background:linear-gradient(to_bottom,transparent_50%,rgba(80,255,105,0.02)_51%,transparent_100%)] bg-size-[100%_3px] md:bg-size-[100%_4px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-lg h-64 md:h-128 bg-primary/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

        {/* Terminal Container - Max width increases on desktop */}
        <div className="relative w-full max-w-sm md:max-w-2xl lg:max-w-3xl z-10">
          <div className="bg-black border border-primary/20 rounded-md overflow-hidden shadow-[0_0_50px_rgba(80,255,105,0.15)] transition-all duration-500">
            {/* Terminal Header - Slightly taller on desktop */}
            <div className="bg-[#131a15] px-3 md:px-5 py-2 md:py-3 flex items-center justify-between border-b border-primary/20">
              <div className="flex gap-1.5 md:gap-2.5">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/40"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/40"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/40"></div>
              </div>
              <div className="font-mono text-[9px] md:text-xs text-primary/60 tracking-[0.2em] uppercase font-bold">
                BYTECODE_ERR_V4.04
              </div>
              <div className="w-8 md:w-12"></div>
            </div>

            {/* Terminal Content - Responsive Padding & Font */}
            <div className="p-5 md:p-12 lg:p-16 font-mono text-xs md:text-base lg:text-lg leading-relaxed">
              {/* Big Red 404 - Scales up significantly */}
              <div className="text-center mb-6 md:mb-10">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-red-600 drop-shadow-[0_0_12px_rgba(220,38,38,0.5)] tracking-tighter transition-all">
                  404
                </h1>
                <p className="text-[10px] md:text-sm text-on-surface-variant tracking-[0.3em] uppercase mt-2">
                  NOT_FOUND
                </p>
              </div>

              <div className="space-y-4 md:space-y-8 mb-8 md:mb-12">
                {/* User Prompt */}
                <div className="flex items-start gap-2 md:gap-4">
                  <span className="text-primary font-bold shrink-0">
                    root@bytecode:~$
                  </span>
                  <span className="text-white/90 break-all underline decoration-primary/30 underline-offset-4">
                    locate /requested
                  </span>
                </div>

                {/* Diagnostics - Green Bytecode Theme */}
                <div className="pl-3 md:pl-6 border-l-2 border-primary/30 py-1 space-y-3 md:space-y-5">
                  <p className="text-red-500 font-bold text-[11px] md:text-lg animate-pulse">
                    [!] Error: Resource_Does_Not_Exist
                  </p>
                  <p className="text-primary/80 text-[10px] md:text-sm lg:text-base leading-tight italic">
                    The requested address could not be found.
                  </p>
                </div>

                {/* System Status */}
                <div className="pt-2 text-[9px] md:text-xs text-red-500 space-y-1 md:space-y-2 uppercase tracking-[0.15em]">
                  <p>&gt; SEARCHING... [FAILED]</p>
                  <p>&gt; PINGING... [TIMEOUT]</p>
                  <p className="text-primary/60">
                    &gt; TARGET_LINK:{' '}
                    <span className="underline">bytecodelearner.tech</span>
                  </p>
                </div>
              </div>

              {/* Action Button - Larger touch/click target on desktop */}
              <div className="mt-2">
                <Link
                  to="/"
                  className="group relative flex items-center justify-center w-full px-4 md:px-8 py-3 md:py-5 bg-primary/5 border border-primary/40 rounded-sm overflow-hidden transition-all duration-300 hover:bg-primary hover:text-[#004b13] active:scale-95 shadow-[0_0_20px_rgba(80,255,105,0.05)]"
                >
                  <span className="relative z-10 font-bold text-[11px] md:text-sm lg:text-base tracking-[0.25em] uppercase">
                    Return to Root
                  </span>
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info - Scales for desktop */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full text-center opacity-30 font-mono text-[8px] md:text-xs tracking-[0.4em] text-primary uppercase">
          SYSTEM_STATE: RECOVERY // SESSION: TERMINATED
        </div>
      </main>
    </div>
  );
};

export default NotFound;
