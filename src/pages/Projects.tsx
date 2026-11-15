import { lazy, Suspense, useEffect } from 'react';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import type { AircraftEntry } from './../components/ExplodedPlane';
import FlyingPlane from './../assets/images/projects/comps.jpg';
import MicroClass from './../assets/images/projects/microclass.jpg';
import AdvanceClass from './../assets/images/projects/advance class.jpg';
import HeroProjects from './../assets/images/backgrounds/projectHero.jpg';

// Loaded on demand so Three.js stays out of the main bundle.
const ExplodedPlane = lazy(() => import('./../components/ExplodedPlane'));

/**
 * Full team aircraft archive (oldest -> newest) so scrubbing/clicking left travels back in time.
 * Drop additional `.glb` files into `public/models/` and set `modelUrl` as they are added.
 */
const AIRCRAFT_FLEET: AircraftEntry[] = [
  {
    id: '1991-1992-reg',
    year: '1991–1992',
    shortYear: '1991–92',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: 'UBC AeroDesign’s inaugural competition season entry (then UBC Heavy Lift), taking 1st place overall.',
    placements: { overall: '1st' },
  },
  {
    id: '1992-1993-reg',
    year: '1992–1993',
    shortYear: '1992–93',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '1992–1993 Regular Class competition aircraft — defending the team’s 1st-place overall finish.',
    placements: { overall: '1st' },
  },
  {
    id: '1995-1996-reg',
    year: '1995–1996',
    shortYear: '1995–96',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '1995–1996 Regular Class competition aircraft, earning 1st place overall.',
    placements: { overall: '1st' },
  },
  {
    id: '1996-1997-reg',
    year: '1996–1997',
    shortYear: '1996–97',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '1996–1997 Regular Class competition entry.',
    placements: { overall: '6th' },
  },
  {
    id: '1997-1998-reg',
    year: '1997–1998',
    shortYear: '1997–98',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '1997–1998 Regular Class competition entry.',
    placements: { overall: '4th' },
  },
  {
    id: '1999-2000-reg',
    year: '1999–2000',
    shortYear: '1999–00',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '1999–2000 Regular Class aircraft — 1st place Design Report and 3rd overall.',
    placements: { overall: '3rd', designReport: '1st' },
  },
  {
    id: '2000-2001-reg',
    year: '2000–2001',
    shortYear: '2000–01',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2000–2001 Regular Class aircraft, placing 2nd in Design Report and 7th overall.',
    placements: { overall: '7th', designReport: '2nd' },
  },
  {
    id: '2001-2002-reg',
    year: '2001–2002',
    shortYear: '2001–02',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2001–2002 Regular Class competition entry.',
    placements: { overall: '7th' },
  },
  {
    id: '2001-2002-open',
    year: '2001–2002',
    shortYear: '2001–02',
    name: 'Open Class',
    classCode: 'OPEN',
    aircraftClass: 'Open Class',
    summary: 'An early Open Class entry with a distinctive Predator-drone-like silhouette.',
    placements: { overall: '4th' },
  },
  {
    id: '2002-2003-reg',
    year: '2002–2003',
    shortYear: '2002–03',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2002–2003 Regular Class competition entry.',
    placements: { overall: '4th' },
  },
  {
    id: '2002-2003-open',
    year: '2002–2003',
    shortYear: '2002–03',
    name: 'Open Class',
    classCode: 'OPEN',
    aircraftClass: 'Open Class',
    summary: '2002–2003 Open Class competition entry, finishing 3rd overall.',
    placements: { overall: '3rd' },
  },
  {
    id: '2003-2004-reg',
    year: '2003–2004',
    shortYear: '2003–04',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2003–2004 Regular Class competition entry.',
    placements: { overall: '11th' },
  },
  {
    id: '2003-2004-open',
    year: '2003–2004',
    shortYear: '2003–04',
    name: 'Open Class',
    classCode: 'OPEN',
    aircraftClass: 'Open Class',
    summary: '2003–2004 Open Class competition entry, finishing 3rd overall.',
    placements: { overall: '3rd' },
  },
  {
    id: '2004-2005-reg',
    year: '2004–2005',
    shortYear: '2004–05',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2004–2005 Regular Class competition entry.',
    placements: { overall: '9th' },
  },
  {
    id: '2004-2005-open',
    year: '2004–2005',
    shortYear: '2004–05',
    name: 'Open Class',
    classCode: 'OPEN',
    aircraftClass: 'Open Class',
    summary: '2004–2005 Open Class competition entry, capturing 1st place overall.',
    placements: { overall: '1st' },
  },
  {
    id: '2005-2006-reg',
    year: '2005–2006',
    shortYear: '2005–06',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2005–2006 Regular Class competition entry.',
    placements: { overall: '12th' },
  },
  {
    id: '2005-2006-open',
    year: '2005–2006',
    shortYear: '2005–06',
    name: 'Open Class',
    classCode: 'OPEN',
    aircraftClass: 'Open Class',
    summary: '2005–2006 Open Class competition entry, finishing 2nd overall.',
    placements: { overall: '2nd' },
  },
  {
    id: '2006-2007-reg',
    year: '2006–2007',
    shortYear: '2006–07',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2006–2007 Regular Class aircraft — 1st in Presentation and 4th overall.',
    placements: { overall: '4th', presentation: '1st' },
  },
  {
    id: '2007-2008-reg',
    year: '2007–2008',
    shortYear: '2007–08',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2007–2008 Regular Class aircraft — 1st in Presentation and 4th overall.',
    placements: { overall: '4th', presentation: '1st' },
  },
  {
    id: '2008-2009-reg',
    year: '2008–2009',
    shortYear: '2008–09',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2008–2009 Regular Class aircraft — 2nd in Presentation and 3rd overall.',
    placements: { overall: '3rd', presentation: '2nd' },
  },
  {
    id: '2009-2010-reg',
    year: '2009–2010',
    shortYear: '2009–10',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2009–2010 Regular Class aircraft — 2nd in Design Report and 5th overall.',
    placements: { overall: '5th', designReport: '2nd' },
  },
  {
    id: '2010-2011-reg',
    year: '2010–2011',
    shortYear: '2010–11',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2010–2011 Regular Class competition entry.',
    placements: { overall: '8th' },
  },
  {
    id: '2011-2012-reg',
    year: '2011–2012',
    shortYear: '2011–12',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2011–2012 Regular Class competition entry.',
    placements: { overall: '6th' },
  },
  {
    id: '2012-2013-reg',
    year: '2012–2013',
    shortYear: '2012–13',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2012–2013 Regular Class competition entry.',
    placements: { overall: '8th' },
  },
  {
    id: '2013-2014-reg',
    year: '2013–2014',
    shortYear: '2013–14',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2013–2014 Regular Class competition entry.',
    placements: { overall: '20th' },
  },
  {
    id: '2014-2015-reg',
    year: '2014–2015',
    shortYear: '2014–15',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: 'Built during the era when the SAE Aero Design competition transitioned from gas to electric propulsion.',
    placements: { overall: '22nd' },
  },
  {
    id: '2015-2016-north-star',
    year: '2015–2016',
    shortYear: '2015–16',
    name: 'North Star',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2015–2016 Regular Class aircraft, earning 3rd place in Design Report.',
    placements: { overall: '11th', designReport: '3rd' },
  },
  {
    id: '2016-2017-black-jay',
    year: '2016–2017',
    shortYear: '2016–17',
    name: 'Black Jay',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2016–2017 Regular Class podium finisher — 1st in Design Report, 3rd in Flight, and 3rd overall.',
    placements: { overall: '3rd', flight: '3rd', designReport: '1st', presentation: '9th' },
  },
  {
    id: '2017-2018-reg',
    year: '2017–2018',
    shortYear: '2017–18',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2017–2018 Regular Class entry, placing 4th in Presentation.',
    placements: { overall: '11th', designReport: '7th', presentation: '4th' },
  },
  {
    id: '2018-2019-adv',
    year: '2018–2019',
    shortYear: '2018–19',
    name: 'First ADV Plane',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: 'UBC AeroDesign’s first-ever Advanced Class aircraft, placing 2nd in Design Report and 5th overall.',
    placements: { overall: '5th', designReport: '2nd' },
  },
  {
    id: '2018-2019-reg',
    year: '2018–2019',
    shortYear: '2018–19',
    name: 'Regular Class',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2018–2019 Regular Class entry, placing 5th in Design Report.',
    placements: { overall: '14th', designReport: '5th' },
  },
  {
    id: '2019-2020-ray',
    year: '2019–2020',
    shortYear: '2019–20',
    name: 'Ray?',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2019–2020 Advanced Class aircraft — 3rd overall and 3rd in Presentation (flights cancelled due to COVID-19).',
    placements: { overall: '3rd', flight: 'N/A (COVID)', presentation: '3rd' },
  },
  {
    id: '2019-2020-bye-plane',
    year: '2019–2020',
    shortYear: '2019–20',
    name: 'Bye-Plane',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2019–2020 Regular Class champion — sweeping 1st in Design Report, 1st in Presentation, and 1st overall.',
    placements: { overall: '1st', flight: 'N/A (COVID)', designReport: '1st', presentation: '1st' },
  },
  {
    id: '2020-2021-mantine',
    year: '2020–2021',
    shortYear: '2020–21',
    name: 'Mantine',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2020–2021 Advanced Class aircraft, finishing 2nd in Presentation during the virtual COVID-19 season.',
    placements: { flight: 'N/A (COVID)', designReport: '9th', presentation: '2nd' },
  },
  {
    id: '2020-2021-wailord',
    year: '2020–2021',
    shortYear: '2020–21',
    name: 'Wailord',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2020–2021 Regular Class aircraft, capturing 1st place in Design Report during the virtual COVID-19 season.',
    placements: { flight: 'N/A (COVID)', designReport: '1st', presentation: '5th' },
  },
  {
    id: '2021-2022-kyogre',
    year: '2021–2022',
    shortYear: '2021–22',
    name: 'Kyogre',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2021–2022 Advanced Class aircraft, finishing 5th overall.',
    placements: { overall: '5th', designReport: '6th', presentation: '9th' },
  },
  {
    id: '2021-2022-snorlax',
    year: '2021–2022',
    shortYear: '2021–22',
    name: 'Snorlax',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary: '2021–2022 Regular Class aircraft — 2nd in Design Report and 2nd in Presentation.',
    placements: { overall: '10th', designReport: '2nd', presentation: '2nd' },
  },
  {
    id: '2022-2023-spirit',
    year: '2022–2023',
    shortYear: '2022–23',
    name: 'Spirit',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary: '2022–2023 Advanced Class aircraft — 1st place in Presentation and 7th overall.',
    placements: { overall: '7th', designReport: '6th', presentation: '1st' },
  },
  {
    id: '2022-2023-indomitable',
    year: '2022–2023',
    shortYear: '2022–23',
    name: 'Indomitable',
    classCode: 'REG',
    aircraftClass: 'Regular Class',
    summary:
      'Indomitable was likely the largest aircraft ever pursued by our team. With a massive 45 lb maximum takeoff weight and a 15.5 ft wingspan, it was a truly colossal aircraft. It carried a steel-plate payload of up to 15 lbs, and its structure was divided into 37" sections. Indomitable competed in SAE Aero Design East 2023, with an 8th-place overall finish.',
    placements: { overall: '8th', designReport: '5th', presentation: '6th' },
  },
  {
    id: '2023-2024-sonic',
    year: '2023–2024',
    shortYear: '2023–24',
    name: 'Sonic',
    classCode: 'MCR',
    aircraftClass: 'Micro Class',
    summary:
      'Sonic was the team’s first attempt at the Micro Class competition. This year coincided with the first year of a new ruleset that prioritized carrying water payload, minimizing empty weight, minimizing wingspan, and minimizing takeoff distance. The aircraft featured a blended-wing-body configuration with an inverted U-tail and a flexible payload. Sonic’s design was an ambitious entry to a novel competition, unfortunately leading to stability difficulties at SAE Aero Design West 2024. The lessons learned from Sonic’s design allowed the team to pursue further-optimized blended-wing designs in the future.',
    placements: { overall: '8th', designReport: '6th', presentation: '7th' },
  },
  {
    id: '2023-2024-shadow',
    year: '2023–2024',
    shortYear: '2023–24',
    name: 'Shadow',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary:
      'Shadow was the team’s entry to the Advanced Class 2024 SAE Aero Design competition, marking the end of the three-year rules cycle with low-risk, reliable primary and secondary delivery vehicles. Lifting 10 lbs of payload with a 120" blended-wing-body primary aircraft, a 22" flying-wing PADA, and a single-motor RWD GTV, Shadow looped the airfield to locate landing zones before releasing the PADA to navigate and land autonomously.',
    placements: { overall: '7th', designReport: '4th', presentation: '3rd' },
  },
  {
    id: '2024-2025-barbie',
    year: '2024–2025',
    shortYear: '2024–25',
    name: 'Barbie',
    classCode: 'MCR',
    aircraftClass: 'Micro Class',
    summary:
      'Barbie was the team’s second Micro aircraft. After Sonic’s risky design, Barbie returned to a much more conventional layout that proved instrumental to her excellent competition performance. Designed to be safe and tough to secure repeated flight scoring, she completed over 30 total flights—more than the cumulative sum of years of prior flying—earning 2nd overall and 1st place Design Report at SAE Aero Design East 2025, while her colour scheme made her a fan favourite.',
    placements: { overall: '2nd', flight: '5th', designReport: '1st', presentation: '8th' },
    modelUrl: `${import.meta.env.BASE_URL}models/barbie.glb`,
  },
  {
    id: '2024-2025-kuromi',
    year: '2024–2025',
    shortYear: '2024–25',
    name: 'Kuromi',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary:
      'Kuromi is UBC AeroDesign’s submission to the Advanced Class 2025 SAE Aero Design competition. As the first year of a new three-year rules cycle, the team focused on a low-risk, reliable payload release and capture aircraft with custom flight controller hardware and software for manual and autonomous flight. Featuring a 60" wingspan, conventional fuselage and tail, autonomous release, and manual capture, Kuromi served as a baseline for future avionics systems.',
    placements: { overall: '6th', flight: '5th', designReport: '5th', presentation: '10th' },
  },
  {
    id: '2025-2026-light-fury',
    year: '2025–2026',
    shortYear: '2025–26',
    name: 'Light Fury',
    classCode: 'ADV',
    aircraftClass: 'Advanced Class',
    summary:
      'Light Fury was the team’s second entry of the three-year ADV ruleset and our first time pursuing a Vertical Take-off and Landing (VTOL) aircraft. With a 45" wingspan, conventional fuselage, U-tail, tail-dragger gear, and a tri-motor tilt-wing/hover configuration, it uses custom in-house hardware and firmware with GNSS and camera localization for autonomous DLZ payload delivery and capture—securing 1st place in flight score and 2nd place overall.',
    placements: { overall: '2nd', flight: '1st', designReport: '10th', presentation: '8th' },
  },
  {
    id: 'toothless',
    year: '2025–2026',
    shortYear: '2025–26',
    name: 'Toothless',
    classCode: 'MCR',
    aircraftClass: 'Micro Class',
    summary:
      'As the third and final aircraft in the team’s first Micro Class ruleset, Toothless was designed as the culmination of recent experiences in the Micro competition. Toothless featured a blended-wing-body design with a conventional tail, balancing superior weight optimization with improved controllability—achieving 1st place in Presentation, 2nd in Design Report, and 5th overall.',
    placements: { overall: '5th', flight: '5th', designReport: '2nd', presentation: '1st' },
    modelUrl: `${import.meta.env.BASE_URL}models/toothless.glb`,
  },
];

export default function Projects() {
  useEffect(() => {
    document.title = 'Projects – UBC AeroDesign';
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
                  PROJECTS
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
                The two classes — Micro and Advanced — are not ordered by difficulty or seniority. Their only differences are the competition missions and rules.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal delay={0.1}>
              <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col group">
                <div className="p-6">
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">Micro Class</p>
                  <h3 className="font-titillium font-semibold text-lg text-white tracking-wide mb-2">MICRO CLASS MISSION OBJECTIVES</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">
                    Conflicting requirements — such as carrying the heaviest payload while simultaneously pursuing the smallest wingspan and shortest takeoff distance.
                  </p>
                </div>
                <img src={MicroClass} alt="Micro Class" className="w-full h-72 object-cover mt-auto group-hover:scale-110 transition-transform duration-500" />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col group">
                <div className="p-6">
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mb-2">Advanced Class</p>
                  <h3 className="font-titillium font-semibold text-lg text-white tracking-wide mb-2">ADVANCED CLASS MISSION OBJECTIVES</h3>
                  <p className="font-lato text-white/55 text-sm leading-relaxed">
                    Focuses on system integrations, which involve the Software, Firmware, Controls, and Hardware subteams who contribute to the custom-built electronics and avionics system.
                  </p>
                </div>
                <img src={AdvanceClass} alt="Advanced Class" className="w-full h-72 object-cover mt-auto group-hover:scale-110 transition-transform duration-500" />
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
              <span className="w-8 h-[1px] bg-aero-yellow" /> Inside The Design
            </p>
            <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-4">
              AIRCRAFT ANATOMY
            </h2>
            <p className="font-lato text-white/55 text-lg leading-relaxed max-w-2xl">
              Scroll to pull Toothless apart and watch it reassemble, or drag the timeline scrubber in the corner to travel back through over three decades of UBC AeroDesign aircraft.
            </p>
          </Reveal>
        </MarginWrapper>
        <MarginWrapper>
          <Suspense fallback={<div className="h-[60vh]" />}>
            <ExplodedPlane fleet={AIRCRAFT_FLEET} initialId="toothless" />
          </Suspense>
        </MarginWrapper>
      </Section>
    </div>
  );
}