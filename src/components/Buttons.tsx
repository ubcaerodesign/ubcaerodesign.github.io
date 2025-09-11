import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom'

interface ButtonProps {
  destination?: string;
  external?: string;
  value: string;
  color: string;
}

export function SolidButton({destination = "", external = "", value, color}: ButtonProps) {
  const { pathname } = useLocation();
  if (destination) {
    return (
      <Link to={destination} className={clsx("rounded-[20px] px-7 py-1.25 text-white text-base/5 font-normal whitespace-nowrap", color)}>
        {value}
      </Link>
    );
  }
  if (external) {
    return (
      <a href={external} target="_blank" className={clsx("px-7 py-1.25 rounded-[20px] text-white text-base/5 font-normal whitespace-nowrap", color)}>
        {value}
      </a>
    );
  }
} 

export function PillButton({destination = "", external = "", value, color}: ButtonProps) {
  const { pathname } = useLocation();
  if (destination) {
    return (
      <Link to={destination} className={clsx("px-7 py-1.25 border-[1.75px] rounded-[20px] text-base/5 font-normal whitespace-nowrap", color)}>
        {value}
      </Link>
    );
  }
  if (external) {
    return (
      <a href={external} target="_blank" className={clsx("px-7 py-1.25 border-[1.75px] rounded-[20px] text-base/5 font-normal whitespace-nowrap", color)}>
        {value}
      </a>
    );
  }
} 