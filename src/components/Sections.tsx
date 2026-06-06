import clsx from "clsx";

interface MarginWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export function MarginWrapper({ children, className }: MarginWrapperProps) {
  return (
    <div className={clsx("w-full max-w-[1400px] mx-auto px-6 md:px-12", className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children?: React.ReactNode;
  alt?: boolean;
  className?: string;
  id?: string;
}

export function Section({ children, alt = false, className, id }: SectionProps) {
  return (
    <section id={id} className={clsx("py-24 relative", alt && "bg-white/5", className)}>
      {children}
    </section>
  );
}

export function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
}

interface RevealProps {
  children?: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface SideBySideSectionProps {
  title: string;
  subtitle?: string;
  image: string;
  reversed?: boolean;
  children?: React.ReactNode;
}

export function SideBySideSection({ title, subtitle, image, reversed = false, children }: SideBySideSectionProps) {
  return (
    <div className={clsx("flex flex-col lg:flex-row items-center gap-12 lg:gap-24", reversed && "lg:flex-row-reverse")}>
      <Reveal direction={reversed ? 'right' : 'left'} className="flex-1 w-full">
        {subtitle && <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4">{subtitle}</p>}
        <h2 className="font-poppins font-semibold text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
          {title}
        </h2>
        {children}
      </Reveal>
      
      <Reveal direction={reversed ? 'left' : 'right'} className="flex-1 w-full">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-aero-mid-blue to-aero-light-blue rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>
          <img 
            src={image} 
            alt={title} 
            className="relative w-full rounded-2xl object-cover shadow-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500" 
          />
        </div>
      </Reveal>
    </div>
  );
}
