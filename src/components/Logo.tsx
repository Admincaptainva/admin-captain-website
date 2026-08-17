interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-white font-bold text-xl tracking-tight">
        Admin<span className="text-[#FFA800]">Captain</span>VA<span className="text-[#99daff]">.</span>
      </span>
    </div>
  );
}
