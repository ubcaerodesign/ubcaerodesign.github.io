import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Sponsor() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Sponsor – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f] flex items-center justify-center">
      <p className="font-poppins font-semibold text-white/10 text-[12rem] leading-none select-none">
        404
      </p>
    </div>
  );
}
