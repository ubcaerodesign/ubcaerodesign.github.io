import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MarginWrapper, Reveal } from './../components/Sections';

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${title} – UBC AeroDesign`;
  }, [title]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aero-mid-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <MarginWrapper className="relative z-10 text-center">
        <Reveal direction="up">
          <div className="text-6xl mb-8 animate-float">🚀</div>
          <h1 className="font-titillium font-bold text-5xl md:text-7xl text-white mb-6 text-glow tracking-wide uppercase">
            {title}
          </h1>
          <p className="font-lato text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            This section is currently under development. <br /> Check back soon for exciting updates!
          </p>
        </Reveal>
      </MarginWrapper>
    </div>
  );
}
