import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SolidButton } from './Buttons';
import clsx from "clsx";
import NavLogo from "./../assets/images/UBC AeroDesign 2023 Logo_Dark Blue Horizontal.svg";

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
    <header className="w-full max-w-[1200px] ml-auto mr-auto px-11.25 py-2.5 font-lato font-normal"> {/* Margin Wrapper */}
      <div className="w-full">
        <div className="flex flex-row items-center justify-between">
          <Link to="/" className="z-200">
            <img src={NavLogo} alt="Logo" className="max-w-full w-[150px]"/>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden lg:flex flex-row justify-between items-center gap-9 z-200">
            <NavLink destination="/" value="HOME"/>
            <NavLink destination="/about" value="ABOUT"/>
            <NavLink destination="/what-we-do" value="WHAT WE DO"/>
            <NavLink destination="/recruitment" value="RECRUITMENT"/>
            <NavLink destination="/sponsor" value="SPONSOR"/>
            <NavLink destination="/contact" value="CONTACT"/>
            <SolidButton external="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" value="SUPPORT US" color="bg-aero-mid-blue"/>
          </nav>

          {/* Burger */}
          <button
              className={clsx("inline-flex items-center lg:hidden p-2 rounded-[10px] cursor-pointer transition-colors ease-in-out duration-500 z-200",
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
        <nav 
          className={clsx("w-full absolute left-0 ml-auto mr-auto lg:hidden flex flex-col justify-between items-center gap-3 transition ease-in-out duration-500 bg-white/30 z-100",
            open && "translate-y-0",
            !open && "-translate-y-150")}
          >
          <NavLink destination="/" value="HOME"/>
          <NavLink destination="/about" value="ABOUT"/>
          <NavLink destination="/what-we-do" value="WHAT WE DO"/>
          <NavLink destination="/recruitment" value="RECRUITMENT"/>
          <NavLink destination="/sponsor" value="SPONSOR"/>
          <NavLink destination="/contact" value="CONTACT"/>
          <SolidButton external="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" value="SUPPORT US" color="bg-aero-mid-blue"/>
        </nav>
      </div>
    </header>
  );
}
