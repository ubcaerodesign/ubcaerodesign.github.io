import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import TeamImage from './../assets/images/team/UBC AeroDesign 2025 Competition Team.jpg';
import WhyAero from './../assets/images/team/whyaero.jpg';
import AboutCTA from './../assets/images/backgrounds/About CTA.jpeg';
import TeamPhoto from './../assets/images/team/2024 Team Photo.jpg';
import TeamBreakdown from './../assets/images/team/Team Breakdown.svg';
import MemberAndrewYeh from './../assets/members/andrew yeh.jpg';
import MemberAroraRolfe from './../assets/members/arora rolfe.jpeg';
import MemberEllaYan from './../assets/members/ella yan.jpeg';
import MemberEvanComba from './../assets/members/evan comba.jpeg';
import MemberJefferson from './../assets/members/jefferson dermawan.jpeg';
import MemberRadman from './../assets/members/radman.jpeg';

const MEMBERS = [
  { src: MemberAndrewYeh,  name: 'Andrew Yeh',          role: 'Hardware Lead' },
  { src: MemberAroraRolfe, name: 'Arora Rolfe',          role: 'Hardware Member' },
  { src: MemberEllaYan,    name: 'Ella Yan',             role: 'AeroDesign Avionics Director' },
  { src: MemberEvanComba,  name: 'Evan Comba',           role: 'Team Captain' },
  { src: MemberJefferson,  name: 'Jefferson Dermawan',   role: 'Software Developer' },
  { src: MemberRadman,     name: 'Radman',               role: 'Firmware Lead' },
];

/* ── Team Page ──────────────────────────── */
export default function Team() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Team – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden pb-16">
        {/* Full-screen team photo */}
        <div className="absolute inset-0">
          <img src={TeamPhoto} alt="UBC AeroDesign Team" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #06121f 0%, #06121f 25%, rgba(6,18,31,0.7) 55%, transparent 80%)' }} />
        </div>

        {/* Centered bottom text */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal direction="up" delay={0.1}>
            <h1 className="font-titillium font-semibold text-5xl md:text-6xl lg:text-7xl text-white leading-none mb-5">
              OUR TEAM
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="font-titillium font-semibold text-white/60 tracking-[0.3em] uppercase text-sm mb-8">
              Engineering Tomorrow's Aircraft Through Collaboration
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-lato text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">
              UBC AeroDesign is a passionate and diverse group of students dedicated to advancing aerospace innovation. By fostering collaboration across disciplines, we provide a supportive environment where members develop technical and professional skills — from aerodynamics to avionics.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ TEAM STRUCTURE ═══════════════ */}
      <Section id="structure">
        <MarginWrapper>
          <Reveal className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-aero-yellow" /> Organization
                </p>
                <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight">
                  TEAM STRUCTURE
                </h2>
              </div>
              <p className="font-lato text-white/40 text-sm max-w-xs leading-relaxed">
                Our team is organized into four divisions spanning technical and administrative functions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-16">
              <div className="bg-[#06121f] p-10 group hover:bg-aero-dark-blue transition-colors duration-300">
                <div className="font-titillium font-semibold text-7xl text-white/10 mb-4 group-hover:text-white/20 transition-colors">4</div>
                <h3 className="font-titillium font-semibold text-2xl text-white mb-2">Divisions</h3>
                <p className="font-lato text-sm text-white/45 leading-relaxed">Admin, Advanced, Regular, and Micro — each tackling distinct mission profiles or responsibilities.</p>
              </div>

              <div className="bg-[#06121f] p-10 group hover:bg-aero-dark-blue transition-colors duration-300 border-l border-white/5">
                <div className="font-titillium font-semibold text-7xl text-aero-light-blue/20 mb-4 group-hover:text-aero-light-blue/40 transition-colors">7</div>
                <h3 className="font-titillium font-semibold text-2xl text-white mb-2">Technical Subteams</h3>
                <p className="font-lato text-sm text-white/45 leading-relaxed mb-6">Aerodynamics, Structures, Propulsion, Avionics, Software, Manufacturing, and Systems.</p>
                <Button
                  destination="https://docs.google.com/document/d/1FUBzxTxm-hyBCDLBDqJbq7Z5sG9JoTbtcljWGG7ZKJ0/edit?tab=t.0#heading=h.ga3vjcy76juv"
                  target="_blank"
                  value="View Roles"
                  variant="outline"
                />
              </div>

              <div className="bg-[#06121f] p-10 group hover:bg-aero-dark-blue transition-colors duration-300 border-l border-white/5">
                <div className="font-titillium font-semibold text-7xl text-aero-yellow/20 mb-4 group-hover:text-aero-yellow/40 transition-colors">7</div>
                <h3 className="font-titillium font-semibold text-2xl text-white mb-2">Admin Subteams</h3>
                <p className="font-lato text-sm text-white/45 leading-relaxed mb-6">Business, Marketing, Finance, Recruitment, Sponsorship, Events, and Media.</p>
                <Button
                  destination="https://docs.google.com/document/d/11nuN9A19SKlHK72HhKCBtdl82eV85YTqr5dZ9A6U-kU/edit?tab=t.0#heading=h.gjdgxs"
                  target="_blank"
                  value="View Roles"
                  variant="outline"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-panel rounded-2xl p-8 md:p-12 flex justify-center">
              <img
                src={TeamBreakdown}
                alt="Team Breakdown"
                className="w-full max-w-[900px] invert opacity-85"
              />
            </div>
          </Reveal>
        </MarginWrapper>
      </Section>

      {/* ═══════════════ MEMBERS MARQUEE ═══════════════ */}
      <section className="py-14 border-y border-white/5 overflow-hidden">
        <p className="font-titillium font-semibold text-white/40 tracking-[0.25em] uppercase text-xs mb-8 text-center">
          Meet the minds behind
        </p>
        <div className="overflow-hidden">
          <div className="animate-marquee flex items-center gap-5" style={{ width: 'max-content' }}>
            {[...MEMBERS, ...MEMBERS, ...MEMBERS].map((member, i) => (
              <div key={i} className="relative group shrink-0 w-44 h-44 rounded-xl overflow-hidden">
                <img
                  src={member.src}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-aero-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <p className="font-titillium font-semibold text-white text-center text-base leading-tight">{member.name}</p>
                  <p className="font-lato text-aero-yellow text-xs tracking-widest uppercase mt-2 text-center">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />


    </div>
  );
}
