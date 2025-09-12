import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom'

interface ButtonProps {
  destination: string;
  target?: string;
  value: string;
  color: string;
}

export function SolidButton({destination, target="", value, color}: ButtonProps) {
  return (
    <Link to={destination} target={target} className={clsx("px-7 py-1.25 rounded-[20px] text-white text-base/5 font-normal whitespace-nowrap", color)}>
      {value}
    </Link>
  );
} 

export function PillButton({destination, target="", value, color}: ButtonProps) {
  return (
    <Link to={destination} target={target} className={clsx("px-7 py-1.25 border-[1.75px] rounded-[20px] text-base/5 font-normal whitespace-nowrap", color)}>
      {value}
    </Link>
  );
} 