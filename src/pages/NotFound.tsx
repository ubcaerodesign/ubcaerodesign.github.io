import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './../components/Buttons';
import { MarginWrapper, Reveal } from './../components/Sections';

export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Page Not Found – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f] relative overflow-hidden flex items-center justify-center pt-32 pb-24">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aero-mid-blue/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-aero-yellow/5 blur-[120px] rounded-full pointer-events-none" />

      <MarginWrapper className="relative z-10 text-center">
        {/* The big "4 [plane] 4" — decorative, the heading below carries the meaning */}
        <Reveal direction="up" delay={0.1}>
          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-3 md:gap-6 mb-10 select-none"
          >
            <span className="font-titillium font-semibold text-[8rem] md:text-[14rem] leading-none text-white text-glow">
              4
            </span>

            <div className="w-[6.5rem] h-[6.5rem] md:w-[11rem] md:h-[11rem] rounded-full border-[6px] md:border-[10px] border-aero-yellow flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.08)]">
              <div className="animate-float">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12 md:w-24 md:h-24 text-white rotate-45"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
            </div>

            <span className="font-titillium font-semibold text-[8rem] md:text-[14rem] leading-none text-white text-glow">
              4
            </span>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h1 className="font-titillium font-semibold text-4xl md:text-6xl text-white leading-tight mb-6 tracking-wide uppercase">
            Page not found
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="font-lato text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed mb-6">
            We couldn't find this page. It may have moved, or the link may be mistyped.
          </p>
          <p className="inline-block max-w-full break-all font-lato text-sm text-aero-yellow bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-12">
            {pathname}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="flex flex-wrap justify-center gap-5">
            <Button destination="/" value="Back to home" variant="primary" />
            <Button destination="/contact" value="Contact us" variant="outline" />
          </div>
        </Reveal>
      </MarginWrapper>
    </div>
  );
}
