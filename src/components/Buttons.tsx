import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ButtonProps {
  destination: string;
  target?: string;
  value: string;
  variant?: 'primary' | 'outline' | 'yellow';
  className?: string;
}

export function Button({ destination, target = '', value, variant = 'primary', className }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-titillium font-bold tracking-widest text-sm px-8 py-3.5 uppercase transition-all duration-300 backdrop-blur-sm whitespace-nowrap";
  
  const variants = {
    primary: "bg-aero-mid-blue/80 text-white border border-aero-light-blue/20 hover:bg-aero-mid-blue hover:scale-105 hover:shadow-[0_0_20px_rgba(0,53,101,0.6)]",
    outline: "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10 hover:scale-105",
    yellow: "bg-aero-yellow text-aero-navy border border-aero-yellow hover:bg-white hover:border-white hover:scale-105 hover:shadow-[0_0_20px_rgba(107,158,200,0.4)]",
  };

  return (
    <Link
      to={destination}
      target={target || undefined}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {value}
    </Link>
  );
}

// Keep legacy exports pointing to new button
export function SolidButton({ destination, target = '', value }: { destination: string; target?: string; value: string; color?: string }) {
  return <Button destination={destination} target={target} value={value} variant="primary" />;
}

export function PillButton({ destination, target = '', value, color = '' }: { destination: string; target?: string; value: string; color?: string }) {
  const variant = color.includes('yellow') ? 'yellow' : 'outline';
  return <Button destination={destination} target={target} value={value} variant={variant} />;
}