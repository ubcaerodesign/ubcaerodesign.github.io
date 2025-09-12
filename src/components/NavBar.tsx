import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SolidButton } from './Buttons';
import clsx from "clsx";
import Logo from "./../assets/images/UBC AeroDesign 2023 Logo_Dark Blue Horizontal.svg";
import { MarginWrapper } from './Sections';

interface NavLinkProps {
  destination: string;
  value: string;
}

export function NavLink({destination, value}: NavLinkProps) {
  const { pathname } = useLocation();
  
  return (
    <Link to={destination} 
    className={clsx("py-1.25 text-aero-dark-blue text-base/5 tracking-[0.25px] whitespace-nowrap",
              destination===pathname && "font-bold underline")} // Active
    >{value}</Link>
  );
} 

export default function NavBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {setOpen(false);}, [pathname]);

  return (
    <MarginWrapper>
      <div className="flex flex-row items-center justify-between">
        <Link to="/" className="z-200">
          <img src={Logo} alt="Logo" className="max-w-full w-[150px]" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex flex-row justify-between items-center gap-5 z-200 ml-2">
          <NavLink destination="/" value="HOME" />
          <NavLink destination="/about" value="ABOUT" />
          <NavLink destination="/what-we-do" value="WHAT WE DO" />
          <NavLink destination="/recruitment" value="RECRUITMENT" />
          <NavLink destination="/sponsor" value="SPONSOR" />
          <NavLink destination="/contact" value="CONTACT" />
          <SolidButton destination="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" target="_blank" value="SUPPORT US" color="bg-aero-mid-blue" />
        </div>

        {/* Burger */}
        <button
          className={clsx("inline-flex items-center lg:hidden p-2 z-200 cursor-pointer rounded-[10px] transition-colors ease-in-out duration-500",
            open && "bg-aero-light-blue",
            !open && "bg-transparent")}
          aria-label="Toggle menu"
          onClick={() => setOpen((val) => !val)}
        >
          <div className="w-6">
            <div className="h-[2px] w-full bg-aero-dark-blue mb-[6px]" />
            <div className="h-[2px] w-full bg-aero-dark-blue mb-[6px]" />
            <div className="h-[2px] w-full bg-aero-dark-blue" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx("absolute w-full lg:hidden flex flex-col justify-between items-center gap-2 left-0 -top-2 z-100 ml-auto mr-auto pb-2 pt-20 transition ease-in-out duration-500 bg-white/45 backdrop-blur-xs",
          open && "translate-y-0",
          !open && "-translate-y-150")}
      >
        <NavLink destination="/" value="HOME" />
        <NavLink destination="/about" value="ABOUT" />
        <NavLink destination="/what-we-do" value="WHAT WE DO" />
        <NavLink destination="/recruitment" value="RECRUITMENT" />
        <NavLink destination="/sponsor" value="SPONSOR" />
        <NavLink destination="/contact" value="CONTACT" />
        <SolidButton destination="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" target="_blank" value="SUPPORT US" color="bg-aero-mid-blue" />
      </div>
    </MarginWrapper>
  );
}
