import { memo } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface RoleCardProps {
  person: any;
  icon: any;
  color?: 'primary' | 'secondary' | 'tier3';
}

const RoleCard = memo(({ person, icon: Icon, color = 'primary' }: RoleCardProps) => {
  if (!person) return null;

  const themes: Record<string, { glow: string; text: string; bg: string }> = {
    primary: {
      glow: 'shadow-[0_0_20px_rgba(80,255,105,0.3)]',
      text: 'text-primary drop-shadow-[0_0_8px_#50ff69]',
      bg: 'bg-primary/10',
    },
    secondary: {
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      text: 'text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]',
      bg: 'bg-cyan-500/10',
    },
    tier3: {
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      text: 'text-purple-400 drop-shadow-[0_0_8px_#a855f7]',
      bg: 'bg-purple-500/10',
    },
  };

  const theme = themes[color as string] || themes.primary;

  return (
    <div className="group relative text-center w-full transition-transform duration-300 will-change-transform">
      <div className="relative w-28 h-28 md:w-40 md:h-40 mx-auto mb-4">
        <div
          className={`absolute inset-0 opacity-20 rounded-full scale-110 blur-xl ${theme.bg}`}
        ></div>
        <img
          src={person.img || 'https://via.placeholder.com/150'}
          alt={person.name}
          loading="lazy"
          className={`relative w-full h-full object-cover rounded-full border-2 border-white/10 transition-all duration-500 ${theme.glow}`}
        />
        <div
          className={`absolute -bottom-2 -right-2 bg-zinc-900 p-2 rounded-full border border-white/10 ${theme.text}`}
        >
          <Icon size={16} className="md:w-4.5 md:h-4.5" />
        </div>
      </div>

      <h3 className="font-headline text-base md:text-lg font-bold text-white uppercase tracking-tighter">
        {person.name}
      </h3>

      <p
        className={`font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-1 ${theme.text}`}
      >
        {person.role}
      </p>

      {/* Social Links - Removed 'opacity-0' and 'group-hover' to stay visible */}
      <div className="flex justify-center gap-4 mt-3 transition-opacity duration-300">
        {person.socialLinks?.github && (
          <a
            href={person.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white"
          >
            <FaGithub size={18} />
          </a>
        )}
        {person.socialLinks?.linkedin && (
          <a
            href={person.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white"
          >
            <FaLinkedin size={18} />
          </a>
        )}
      </div>
    </div>
  );
});

export default RoleCard;
