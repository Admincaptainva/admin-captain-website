interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-white font-bold text-xl tracking-tight font-display">
        Admin<span className="text-gradient-gold">Captain</span>VA<span className="text-sky-400">.</span>
      </span>
    </div>
  );
}
