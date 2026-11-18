import { useEffect } from 'react';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import FleetTimeline from './../components/FleetTimeline';
import { AIRCRAFT_FLEET } from './../data/fleet';
import AircraftPlaceholder from './../assets/aircraft/placeholder.svg';
import FlyingPlane from './../assets/images/projects/comps.jpg';
import MicroClass from './../assets/images/projects/microclass.jpg';
import RegularClass from './../assets/images/projects/regularclass.jpg';
import AdvanceClass from './../assets/images/projects/advance class.jpg';
import HeroProjects from './../assets/images/backgrounds/projectHero.JPG';

export default function Projects() {
  useEffect(() => {
    document.title = 'Aircraft – UBC AeroDesign';
  }, []);

  return (
    <div className="min-h-screen bg-[#06121f]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HeroProjects} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-[#06121f]/50 to-[#06121f]/10" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#06121f]/80 via-transparent to-transparent" />
        </div>

        <MarginWrapper className="relative z-10 pb-20">
          <div className="flex justify-end mr-6 md:mr-12 lg:mr-24">
            <div className="max-w-xl text-right">
              <Reveal direction="up" delay={0.1}>
                <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4 justify-end">
                  What We Build <span className="w-10 h-[1px] bg-aero-yellow" />
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <h1 className="font-titillium font-semibold text-6xl md:text-8xl lg:text-9xl text-white leading-none text-glow mb-6">
                  AIRCRAFT
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.3}>
                <p className="font-lato text-lg md:text-xl text-white/60 leading-relaxed">
                  Explore the engineering challenges we tackle every year.
                </p>
              </Reveal>
            </div>
          </div>
        </MarginWrapper>
      </section>

      <Section id="competition">
        <MarginWrapper>
          <Reveal direction="left" className="mb-10">
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Annual Challenge
            </p>
            <h2 className="font-titillium font-semibold text-5xl md:text-6xl text-white leading-tight">
              OUR COMPETITION
            </h2>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
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

            <div className="lg:w-1/2 flex flex-col">
              <Reveal delay={0.1}>
                <div className="flex gap-0 mb-10">
                  <div className="flex-1 pr-8">
                    <div className="font-titillium font-semibold text-6xl text-aero-yellow mb-2">20+</div>
                    <div className="font-lato text-xs text-white/45 tracking-[0.2em] uppercase">Top Placements</div>
                  </div>
                  <div className="w-px bg-white/10 shrink-0" />
                  <div className="flex-1 pl-8">
                    <div className="font-titillium font-semibold text-6xl text-white mb-2">40+</div>
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

      <Section id="classes" alt>
        <MarginWrapper>
          <Reveal>
            <div className="max-w-3xl mb-8">
              <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-3">Competition Classes</p>
              <h2 className="font-titillium font-semibold text-3xl md:text-4xl text-white mb-4">SAE AERODESIGN COMPETITION</h2>
              <p className="font-lato text-white/55 leading-relaxed">
                The three classes — Micro, Regular, and Advanced — are not ordered by difficulty or seniority. Their only differences are the competition missions and rules.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Reveal delay={0.1} className="h-full">
              <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col h-full group">
                <div className="p-6">
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">Micro Class</p>
                  <h3 className="font-titillium font-semibold text-lg text-white tracking-wide mb-2">MISSION OBJECTIVES</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">
                    Conflicting requirements — such as carrying the heaviest payload while simultaneously pursuing the smallest wingspan and shortest takeoff distance.
                  </p>
                </div>
                <div className="mt-auto w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={MicroClass}
                    alt="Micro Class"
                    className="w-full h-full object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="h-full">
              <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col h-full group">
                <div className="p-6">
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">Regular Class</p>
                  <h3 className="font-titillium font-semibold text-lg text-white tracking-wide mb-2">MISSION OBJECTIVES</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>
                <div className="mt-auto w-full aspect-[4/3] overflow-hidden relative bg-[#040d17] border-t border-white/10 flex flex-col items-center justify-center p-6 text-center select-none">
                    <img
                      src={RegularClass}
                      alt="Regular Class"
                      className="w-full h-full object-cover object-center scale-125 group-hover:scale-140 transition-transform duration-500"
                    />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3} className="h-full">
              <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col h-full group">
                <div className="p-6">
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">Advanced Class</p>
                  <h3 className="font-titillium font-semibold text-lg text-white tracking-wide mb-2">MISSION OBJECTIVES</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">
                    Focuses on system integrations, which involve the Software, Firmware, Controls, and Hardware subteams who contribute to the custom-built electronics and avionics system.
                  </p>
                </div>
                <div className="mt-auto w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={AdvanceClass}
                    alt="Advanced Class"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      <Section id="aircraft">
        <MarginWrapper>
          <Reveal className="mb-10">
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Through The Years
            </p>
            <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-4">
              FLEET ARCHIVE
            </h2>
            <p className="font-lato text-white/55 text-lg leading-relaxed max-w-2xl">
              Scrub or drag the timeline to travel back through over three decades of UBC AeroDesign aircraft and browse photos and flight footage from each season.
            </p>
          </Reveal>
        </MarginWrapper>
        <MarginWrapper>
          <FleetTimeline fleet={AIRCRAFT_FLEET} initialId="2025-2026-toothless" />
        </MarginWrapper>
      </Section>
    </div>
  );
}