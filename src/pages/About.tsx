import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import HistoryImg from './../assets/images/team/history.jpg';
import TeamPhoto2026 from './../assets/images/team/2026 Team Photo.jpg';
import HeroAboutUs from './../assets/images/backgrounds/abouthero.jpg';
import IndustryTour from './../assets/images/projects/industry tour.jpg';
import WindTunnel from './../assets/images/projects/windtunnel.jpg';

const LEARNING_SLIDES = [
  {
    src: IndustryTour,
    title: 'INDUSTRY TOURS',
    description: 'Through sponsors, member internships and co-ops, and other connections, we have been invited to tour facilities of leaders in engineering.',
    objectPosition: 'center top',
  },
  {
    src: WindTunnel,
    title: 'WIND TUNNEL TESTING',
    description: 'Wind tunnel testing places airfoil models in controlled airflow to simulate real flight conditions — a crucial step in assessing aerodynamic behavior and refining designs before actual flights.',
    objectPosition: 'center center',
  },
];

function LearningCarousel() {
  const [current, setCurrent] = useState(0);
  const total = LEARNING_SLIDES.length;
  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const next = () => setCurrent((i) => (i + 1) % total);
  const slide = LEARNING_SLIDES[current];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10">
      <div className="relative h-[300px] md:h-[420px]">
        {LEARNING_SLIDES.map((s, i) => (
          <div
            key={i}
            className={clsx(
              'absolute inset-0 transition-opacity duration-700',
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <img
              src={s.src}
              alt={s.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: s.objectPosition ?? 'center center' }}
            />
          </div>
        ))}

        {/* Left arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 md:left-[calc(50%-9rem)] -translate-x-1/2 z-20 flex gap-1.5">
          {LEARNING_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={clsx(
                'cursor-pointer h-1.5 rounded-full transition-all duration-300',
                i === current ? 'bg-white w-6' : 'bg-white/40 w-1.5 hover:bg-white/70'
              )}
            />
          ))}
        </div>
      </div>

      {/* Info panel */}
      <div className="md:absolute md:right-0 md:top-0 md:h-full md:w-72 lg:w-80 bg-aero-mid-blue/90 backdrop-blur-sm z-20 flex flex-col justify-center px-6 py-8 md:px-8 md:py-10">
        <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-3">Beyond Competition</p>
        <h3 className="font-titillium font-semibold text-xl text-white tracking-wide mb-4 leading-snug">{slide.title}</h3>
        <p className="font-lato text-white/65 text-sm leading-relaxed">{slide.description}</p>
      </div>
    </div>
  );
}

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
  useEffect(() => {
    document.title = 'About – UBC AeroDesign';
  }, []);

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
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-aero-yellow" /> Since 1992
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h1 className="font-titillium font-semibold text-6xl md:text-8xl lg:text-9xl text-white leading-none text-glow mb-6">
              ABOUT US
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-lato text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
              Over three decades of engineering, competing, and pushing the boundaries of student-built aerospace.
            </p>
          </Reveal>
        </MarginWrapper>
      </section>

      {/* ═══════════════ IMPACT STATS ═══════════════ */}
      <section className="py-16 border-b border-white/5">
        <MarginWrapper>
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { target: 30, suffix: '+', label: 'Years Active',  color: 'text-white' },
              { target: 4,  suffix: '',  label: 'Divisions',     color: 'text-aero-yellow' },
              { target: 14, suffix: '',  label: 'Subteams',      color: 'text-aero-light-blue' },
            ].map(({ target, suffix, label, color }, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#06121f] py-10 px-8 text-center group hover:bg-aero-dark-blue transition-colors duration-300">
                  <div className={`font-titillium font-semibold text-5xl md:text-6xl ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <CountUp target={target} suffix={suffix} />
                  </div>
                  <div className="font-lato text-xs text-white/40 tracking-[0.2em] uppercase">{label}</div>
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
              <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-aero-yellow" /> Our History
              </p>
              <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-8">
                THREE DECADES<br />OF INNOVATION
              </h2>
              <div className="space-y-5">
                <p className="font-lato text-lg text-white/65 leading-relaxed">
                  UBC AeroDesign — formerly UBC Heavy Lift — was founded in 1992 by a group of engineering
                  students determined to put their classroom knowledge to the test in the real world.
                  Every year since, the team has designed, built, and flown radio-controlled, fixed-wing
                  aircraft to compete at the SAE Aero Design Series.
                </p>
                <p className="font-lato text-lg text-white/65 leading-relaxed">
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

      {/* ═══════════════ LEARNING ENDEAVORS ═══════════════ */}
      <Section id="learning-endeavors">
        <MarginWrapper>
          <Reveal className="mb-10">
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Beyond Competition
            </p>
            <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-4">
              LEARNING ENDEAVORS
            </h2>
            <p className="font-lato text-white/55 text-lg leading-relaxed max-w-2xl">
              There are many opportunities for members to gain experience — whether through their subteam, facility access, industry tours, networking events, or personal projects.
            </p>
          </Reveal>
        </MarginWrapper>
        <MarginWrapper>
          <LearningCarousel />
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ TEAM PHOTO ═══════════════ */}
      <section className="relative overflow-hidden">
        <Reveal>
          <div className="relative w-full h-[65vh] group overflow-hidden">
            <img
              src={TeamPhoto2026}
              alt="2025 Team Photo"
              className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-transparent to-[#06121f]/40" />
            <div className="absolute bottom-10 left-0 w-full">
              <MarginWrapper>
                <p className="font-titillium font-semibold text-2xl md:text-3xl text-white">2026/27 Team</p>
                <p className="font-lato text-sm text-white/50 mt-1 tracking-widest uppercase">University of British Columbia</p>
              </MarginWrapper>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}