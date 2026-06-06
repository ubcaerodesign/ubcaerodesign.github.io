import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import WhiteLogo from './../assets/images/UBC AeroDesign 2023 Logo_White Horizontal.svg';

interface NavLinkProps {
  destination: string;
  value: string;
  onClick?: () => void;
}

export function NavLink({ destination, value, onClick }: NavLinkProps) {
  const { pathname } = useLocation();
  const isActive = destination === pathname;

  return (
    <Link
      to={destination}
      onClick={onClick}
      className={clsx(
        'font-titillium text-sm tracking-[0.15em] transition-all duration-300 uppercase py-2 relative group',
        isActive ? 'text-white font-bold' : 'text-white/70 hover:text-white'
      )}
    >
      {value}
      <span className={clsx(
        'absolute -bottom-1 left-0 h-[2px] bg-aero-yellow transition-all duration-300',
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      )}></span>
    </Link>
  );
}

export default function NavBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className={clsx(
        'fixed top-0 left-0 right-0 z-[1000] transition-all duration-500',
        scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
      )}>
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <Link to="/" className="z-[1001] transition-transform hover:scale-105 duration-300">
            <img src={WhiteLogo} alt="UBC AeroDesign" className="w-[160px] md:w-[180px]" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <NavLink destination="/" value="Home" />
            <NavLink destination="/about" value="About" />
            <NavLink destination="/projects" value="Projects" />
            <NavLink destination="/team" value="Team" />
            <NavLink destination="/sponsor" value="Sponsor" />
            
            <Link
              to="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 font-titillium font-bold text-xs tracking-widest text-aero-navy bg-aero-yellow px-6 py-2.5 hover:bg-white hover:shadow-[0_0_15px_rgba(107,158,200,0.5)] transition-all duration-300"
            >
              SUPPORT US
            </Link>
          </div>

          <button
            className="lg:hidden relative w-8 h-6 z-[1001] flex flex-col justify-between group"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={clsx('w-full h-[2px] bg-white transition-all duration-300', open && 'rotate-45 translate-y-[11px]')} />
            <span className={clsx('w-full h-[2px] bg-white transition-all duration-300', open && 'opacity-0')} />
            <span className={clsx('w-full h-[2px] bg-white transition-all duration-300', open && '-rotate-45 -translate-y-[11px]')} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={clsx(
        'fixed inset-0 z-[999] bg-aero-navy/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <div className="flex flex-col items-center gap-6 text-xl">
          <NavLink destination="/" value="Home" onClick={() => setOpen(false)} />
          <NavLink destination="/about" value="About" onClick={() => setOpen(false)} />
          <NavLink destination="/projects" value="Projects" onClick={() => setOpen(false)} />
          <NavLink destination="/team" value="Team" onClick={() => setOpen(false)} />
          <NavLink destination="/sponsor" value="Sponsor" onClick={() => setOpen(false)} />
          
          <Link
            to="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 font-titillium font-bold text-sm tracking-widest text-aero-navy bg-aero-yellow px-8 py-3"
          >
            SUPPORT US
          </Link>
        </div>
      </div>
    </>
  );
}
