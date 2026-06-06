import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import Workspace from './../assets/images/Workspace.png';
import TeamPhoto from './../assets/images/2024 Team Photo.png';
import TeamImage from './../assets/images/UBC AeroDesign 2025 Competition Team.png';
import HeroAboutUs from './../assets/images/hero_aboutus.jpg';
import FlyingPlane from './../assets/images/25 Adv Plane in Flight.png';
import MicroClass from './../assets/images/microclass.jpg';
import AdvanceClass from './../assets/images/advance class.jpg';
import OurComp from './../assets/images/ourcomp.jpg';

const LEARNING_SLIDES = [
  {
    src: OurComp,
    title: 'INDUSTRY TOURS',
    description: 'Through sponsors, member internships and co-ops, and other connections, we have been invited to tour facilities of leaders in engineering.',
  },
  {
    src: Workspace,
    title: 'WIND TUNNEL TESTING',
    description: 'Wind tunnel testing places airfoil models in controlled airflow to simulate real flight conditions — a crucial step in assessing aerodynamic behavior and refining designs before actual flights.',
  },
];

function LearningCarousel() {
  const [current, setCurrent] = useState(0);
  const total = LEARNING_SLIDES.length;
  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);
  const slide = LEARNING_SLIDES[current];

  return (
    <div className="relative w-full h-[420px] overflow-hidden">
      {LEARNING_SLIDES.map((s, i) => (
        <div
          key={i}
          className={clsx(
            'absolute inset-0 transition-opacity duration-700',
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Info panel — right side */}
      <div className="absolute right-0 top-0 h-full w-72 lg:w-80 bg-aero-mid-blue/90 backdrop-blur-sm z-20 flex flex-col justify-center px-8 py-10">
        <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-3">Beyond Competition</p>
        <h3 className="font-titillium font-bold text-xl text-white tracking-wide mb-4 leading-snug">{slide.title}</h3>
        <p className="font-lato text-white/65 text-sm leading-relaxed">{slide.description}</p>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dot indicators — centered in the image area (left of panel) */}
      <div className="absolute bottom-4 z-20 flex gap-1.5" style={{ left: 'calc(50% - 5rem)' }}>
        {LEARNING_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={clsx(
              'h-1.5 rounded-full transition-all duration-300',
              i === current ? 'bg-white w-6' : 'bg-white/40 w-1.5 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  );
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
            <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-aero-yellow" /> Since 1992
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h1 className="font-titillium font-bold text-6xl md:text-8xl lg:text-9xl text-white leading-none text-glow mb-6">
              ABOUT US
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-lato text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
              Over three decades of engineering, competing, and pushing the boundaries of student-built aerospace.
            </p>
          </Reveal>
        </MarginWrapper>

        <div className="absolute bottom-10 right-12 hidden lg:flex flex-col items-center gap-2 opacity-30">
          <span className="font-lato text-xs tracking-widest uppercase text-white">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ═══════════════ IMPACT STATS ═══════════════ */}
      <section className="py-16 border-b border-white/5">
        <MarginWrapper>
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { value: '30+', label: 'Years Active',  color: 'text-white' },
              { value: '3',   label: 'Divisions',     color: 'text-aero-yellow' },
              { value: '14',  label: 'Subteams',      color: 'text-aero-light-blue' },
            ].map(({ value, label, color }, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#06121f] py-10 px-8 text-center group hover:bg-aero-dark-blue transition-colors duration-300">
                  <div className={`font-titillium font-bold text-5xl md:text-6xl ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {value}
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
              <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-aero-yellow" /> Our History
              </p>
              <h2 className="font-titillium font-bold text-4xl md:text-5xl text-white leading-tight mb-8">
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
                    src={Workspace}
                    alt="Engineering Workspace"
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
                <p className="font-titillium font-bold text-2xl md:text-3xl text-white">2024 Competition Team</p>
                <p className="font-lato text-sm text-white/50 mt-1 tracking-widest uppercase">University of British Columbia</p>
              </MarginWrapper>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      {/* ═══════════════ COMPETITION ═══════════════ */}
      <Section id="competition">
        <MarginWrapper>

          <Reveal direction="left" className="mb-10">
            <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Annual Challenge
            </p>
            <h2 className="font-titillium font-bold text-5xl md:text-6xl text-white leading-tight">
              OUR COMPETITION
            </h2>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

            {/* Left — image */}
            <Reveal direction="left" className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden group">
                <img
                  src={FlyingPlane}
                  alt="Advanced Class plane in flight"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06121f]/50 to-transparent" />
              </div>
            </Reveal>

            {/* Right — stats + text */}
            <div className="lg:w-1/2 flex flex-col">
              <Reveal delay={0.1}>
                <div className="flex gap-0 mb-10">
                  <div className="flex-1 pr-8">
                    <div className="font-titillium font-bold text-6xl text-aero-yellow mb-2">20+</div>
                    <div className="font-lato text-xs text-white/45 tracking-[0.2em] uppercase">Top Placements</div>
                  </div>
                  <div className="w-px bg-white/10 shrink-0" />
                  <div className="flex-1 pl-8">
                    <div className="font-titillium font-bold text-6xl text-white mb-2">40+</div>
                    <div className="font-lato text-xs text-white/45 tracking-[0.2em] uppercase">International Teams</div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-lato text-white/55 text-lg leading-relaxed mb-8">
                  Every year we compete at the SAE Aero Design Competition across Micro and Advanced class categories — each presenting a unique aviation challenge that pushes students to find optimal configurations under tight design limitations.
                </p>
                <Button
                  destination="https://www.saeaerodesign.com/cdsweb/app/NewsItem.aspx?NewsItemID=8d42d00e-c93b-4e1c-baad-253bc6e9c270"
                  target="_blank"
                  value="SAE Competition Rules"
                  variant="outline"
                />
              </Reveal>
            </div>

          </div>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ SAE CLASSES ═══════════════ */}
      <Section id="classes" alt>
        <MarginWrapper>
          <Reveal>
            <div className="max-w-3xl mb-8">
              <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-3">Competition Classes</p>
              <h2 className="font-titillium font-bold text-3xl md:text-4xl text-white mb-4">SAE AERODESIGN COMPETITION</h2>
              <p className="font-lato text-white/55 leading-relaxed">
                The two classes — Micro and Advanced — are not ordered by difficulty or seniority. Their only differences are the competition missions and rules.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal delay={0.1}>
              <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col group">
                <div className="p-6">
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">μ Micro Class</p>
                  <h3 className="font-titillium font-bold text-lg text-white tracking-wide mb-2">MICRO CLASS MISSION OBJECTIVES</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">
                    Conflicting requirements — such as carrying the highest payload while simultaneously pursuing the lowest empty weight possible.
                  </p>
                </div>
                <img src={MicroClass} alt="Micro Class" className="w-full h-72 object-cover mt-auto group-hover:scale-110 transition-transform duration-500" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col group">
                <div className="p-6">
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">ADV Advanced Class</p>
                  <h3 className="font-titillium font-bold text-lg text-white tracking-wide mb-2">ADVANCED CLASS MISSION OBJECTIVES</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">
                    Focuses on system integrations, which involve the Software, Firmware, and Hardware subteams who contribute to the custom-built electronics and avionics system.
                  </p>
                </div>
                <img src={AdvanceClass} alt="Advanced Class" className="w-full h-72 object-cover mt-auto group-hover:scale-110 transition-transform duration-500" />
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
            <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Beyond Competition
            </p>
            <h2 className="font-titillium font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
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


    </div>
  );
}
