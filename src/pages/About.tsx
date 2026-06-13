import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import HistoryImg from './../assets/images/history.jpg';
import TeamPhoto from './../assets/images/2024 Team Photo.jpg';
import HeroAboutUs from './../assets/images/hero_aboutus-Picsart-AiImageEnhancer.jpg';

function CountUp({ target, suffix = '', duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      let rafId: number;
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'About – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f]">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HeroAboutUs} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-[#06121f]/50 to-[#06121f]/10" />
        </div>

        <MarginWrapper className="relative z-10 pb-20">
          <Reveal direction="up" delay={0.1}>
            <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-aero-yellow" /> Since 1992
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h1 className="font-poppins font-semibold text-6xl md:text-8xl lg:text-9xl text-white leading-none text-glow mb-6">
              ABOUT US
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-urbanist text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
              Over three decades of engineering, competing, and pushing the boundaries of student-built aerospace.
            </p>
          </Reveal>
        </MarginWrapper>

        <div className="absolute bottom-10 right-12 hidden lg:flex flex-col items-center gap-2 opacity-30">
          <span className="font-urbanist text-xs tracking-widest uppercase text-white">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ═══════════════ IMPACT STATS ═══════════════ */}
      <section className="py-16 border-b border-white/5">
        <MarginWrapper>
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { target: 30, suffix: '+', label: 'Years Active',  color: 'text-white' },
              { target: 3,  suffix: '',  label: 'Divisions',     color: 'text-aero-yellow' },
              { target: 14, suffix: '',  label: 'Subteams',      color: 'text-aero-light-blue' },
            ].map(({ target, suffix, label, color }, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#06121f] py-10 px-8 text-center group hover:bg-aero-dark-blue transition-colors duration-300">
                  <div className={`font-poppins font-semibold text-5xl md:text-6xl ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <CountUp target={target} suffix={suffix} />
                  </div>
                  <div className="font-urbanist text-xs text-white/40 tracking-[0.2em] uppercase">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </MarginWrapper>
      </section>

      {/* ═══════════════ OUR STORY ═══════════════ */}
      <Section id="history">
        <MarginWrapper>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            <Reveal direction="left" className="lg:w-1/2">
              <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-aero-yellow" /> Our History
              </p>
              <h2 className="font-poppins font-semibold text-4xl md:text-5xl text-white leading-tight mb-8">
                THREE DECADES<br />OF INNOVATION
              </h2>
              <div className="space-y-5">
                <p className="font-urbanist text-lg text-white/65 leading-relaxed">
                  UBC AeroDesign — formerly UBC Heavy Lift — was founded in 1992 by a group of engineering
                  students determined to put their classroom knowledge to the test in the real world.
                  Every year since, the team has designed, built, and flown radio-controlled, fixed-wing
                  aircraft to compete at the SAE Aero Design Series.
                </p>
                <p className="font-urbanist text-lg text-white/65 leading-relaxed">
                  The SAE competition challenges university teams worldwide to design aircraft capable of
                  fulfilling complex mission profiles — pushing students to balance aerodynamics, structures,
                  propulsion, and autonomy under real competition pressure.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-aero-mid-blue/40 to-aero-light-blue/10 rounded-2xl blur-xl" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={HistoryImg}
                    alt="UBC AeroDesign History"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06121f]/50 to-transparent" />
                </div>
              </div>
            </Reveal>

          </div>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ TEAM PHOTO ═══════════════ */}
      <section className="relative overflow-hidden">
        <Reveal>
          <div className="relative w-full h-[65vh] group overflow-hidden">
            <img
              src={TeamPhoto}
              alt="2024 Team Photo"
              className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-transparent to-[#06121f]/40" />
            <div className="absolute bottom-10 left-0 w-full">
              <MarginWrapper>
                <p className="font-poppins font-semibold text-2xl md:text-3xl text-white">2024 Competition Team</p>
                <p className="font-urbanist text-sm text-white/50 mt-1 tracking-widest uppercase">University of British Columbia</p>
              </MarginWrapper>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
