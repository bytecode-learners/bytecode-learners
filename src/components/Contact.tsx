import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Send, Mail, Terminal, Shield, AlertTriangle } from 'lucide-react';

interface SocialLinkProps {
  icon: React.ElementType;
  label?: string;
  href: string;
}

const Contact = () => {
  const [status, setStatus] = useState('IDLE');
  const [formData, setFormData] = useState({
    identifier: '',
    channel: '',
    payload: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SENDING');

    try {
      // Using an environment variable strictly to keep the script URL private
      const scriptURL = (import.meta as any).env.APPS_SCRIPT_URL;

      const response = await fetch(scriptURL, {
        method: 'POST',
        // Using text/plain to avoid CORS preflight issues with Google Apps Script
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: formData.identifier,
          email: formData.channel,
          message: formData.payload
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ identifier: '', channel: '', payload: '' });
        setTimeout(() => setStatus('IDLE'), 4000);
      } else {
        throw new Error(result.message || 'UPLINK_CRITICAL_FAILURE');
      }
    } catch (err) {
      console.error('CONTACT_ERROR:', err);
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 4000);
    }
  };

  const DesktopSocialLink = ({ icon: Icon, label, href }: SocialLinkProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 group p-3 rounded-lg border border-white/5 bg-white/2 hover:bg-primary/5 hover:border-primary/20 transition-all"
    >
      <div className="p-2 bg-zinc-900 rounded border border-white/10 group-hover:text-primary transition-colors">
        <Icon size={18} />
      </div>
      <span className="text-xs font-mono tracking-widest text-zinc-400 group-hover:text-white uppercase">
        {label}
      </span>
    </a>
  );

  const MobileSocialCircle = ({ icon: Icon, href }: SocialLinkProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-11 h-11 rounded-full border border-primary/20 bg-zinc-900 text-zinc-400 hover:text-primary hover:border-primary transition-all"
    >
      <Icon size={18} />
    </a>
  );

  return (
    <section
      id="contact"
      className="relative min-h-screen pt-32 pb-20 bg-surface overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield size={16} className="text-primary animate-pulse" />
                <span className="text-primary font-mono tracking-[0.3em] text-[10px] uppercase">
                  Establish_Secure_Uplink
                </span>
              </div>
              <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase leading-none">
                Get In <br />{' '}
                <span className="text-primary text-glow">Touch.</span>
              </h2>
              <p className="hidden md:block mt-6 text-zinc-400 max-w-md leading-relaxed border-l-2 border-primary/20 pl-6 italic">
                "Whether you're looking to collaborate on decentralized
                infrastructure or just want to ping our core, the gates are
                open. Initialize communication."
              </p>
            </div>

            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DesktopSocialLink
                icon={Mail}
                label="Email"
                href="mailto:bytecodelearners.club@gmail.com"
              />
              <DesktopSocialLink
                icon={FaGithub}
                label="Github"
                href="https://github.com/bytecode-learners"
              />
              <DesktopSocialLink icon={FaLinkedin} label="LinkedIn" href="https://www.linkedin.com/company/bytecode-learners/" />
              <DesktopSocialLink
                icon={FaInstagram}
                label="Instagram"
                href="https://www.instagram.com/bytecode_learners/"
              />
            </div>

            <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl font-mono text-[10px] space-y-2 opacity-60">
              <p className="text-primary flex gap-2">
                <span className="opacity-50">
                  [{new Date().toLocaleTimeString()}]
                </span>{' '}
                SYSTEM_NODE: UP
              </p>
              <p className="text-white/40 flex gap-2">
                <span className="opacity-50">
                  [{new Date().toLocaleTimeString()}]
                </span>{' '}
                LOCATION: REMOTE_SERVER_ALPHA
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="bg-zinc-800/80 backdrop-blur-md rounded-t-xl px-5 py-3 flex items-center justify-between border-x border-t border-white/10 shadow-2xl">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                COMMS_PROTOCOL_v4.2
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-black/40 backdrop-blur-sm p-8 rounded-b-xl border border-white/10 space-y-6 shadow-2xl transition-all group-hover:border-primary/20"
            >
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-primary uppercase tracking-[0.2em] ml-1">
                  Entity_Identifier
                </label>
                <input
                  required
                  type="text"
                  placeholder="NAME // ALIAS"
                  value={formData.identifier}
                  onChange={(e) =>
                    setFormData({ ...formData, identifier: e.target.value })
                  }
                  className="w-full bg-zinc-900/80 border border-white/5 rounded-lg px-4 py-3.5 text-white placeholder:text-zinc-700 font-mono text-sm focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-primary uppercase tracking-[0.2em] ml-1">
                  Uplink_Channel
                </label>
                <input
                  required
                  type="email"
                  placeholder="EMAIL@ADDRESS.COM"
                  value={formData.channel}
                  onChange={(e) =>
                    setFormData({ ...formData, channel: e.target.value })
                  }
                  className="w-full bg-zinc-900/80 border border-white/5 rounded-lg px-4 py-3.5 text-white placeholder:text-zinc-700 font-mono text-sm focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-primary uppercase tracking-[0.2em] ml-1">
                  Data_Payload
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="TYPE_MESSAGE_HERE..."
                  value={formData.payload}
                  onChange={(e) =>
                    setFormData({ ...formData, payload: e.target.value })
                  }
                  className="w-full bg-zinc-900/80 border border-white/5 rounded-lg px-4 py-3.5 text-white placeholder:text-zinc-700 font-mono text-sm focus:ring-1 focus:ring-primary/50 transition-all outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'SENDING'}
                className={`w-full py-4 font-black font-headline text-xs tracking-[0.3em] uppercase rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                  status === 'ERROR'
                    ? 'bg-red-500 text-white'
                    : 'bg-primary text-black hover:shadow-[0_0_30px_rgba(80,255,105,0.4)]'
                }`}
              >
                {status === 'SENDING' ? (
                  <Terminal size={18} className="animate-spin" />
                ) : status === 'ERROR' ? (
                  <AlertTriangle size={18} />
                ) : (
                  <Send size={18} />
                )}
                {status === 'SENDING'
                  ? 'EXECUTING_SEND...'
                  : status === 'SUCCESS'
                    ? 'UPLINK_SUCCESS'
                    : status === 'ERROR'
                      ? 'UPLINK_FAILED'
                      : 'EXECUTE_SEND'}
              </button>

              <div className="flex md:hidden justify-center items-center gap-5 mt-6 pt-6 border-t border-white/5">
                <MobileSocialCircle
                  icon={Mail}
                  href="mailto:bytecodelearners.club@gmail.com"
                />
                <MobileSocialCircle
                  icon={FaGithub}
                  href="https://github.com/bytecode-learners/bytecode-learners"
                />
                <MobileSocialCircle
                  icon={FaLinkedin}
                  href="https://www.linkedin.com/company/bytecode-learners/"
                />
                <MobileSocialCircle icon={FaInstagram} href="https://www.instagram.com/bytecode_learners/" />
              </div>

              {status === 'SUCCESS' && (
                <div className="text-[10px] font-mono text-primary text-center animate-pulse mt-4">
                  &gt; PACKET_RECEIVED: We will respond shortly.
                </div>
              )}
              {status === 'ERROR' && (
                <div className="text-[10px] font-mono text-red-500 text-center animate-pulse mt-4">
                  &gt; ERROR: Primary relay offline. Check console.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
