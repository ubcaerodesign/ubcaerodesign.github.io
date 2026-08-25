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
import MemberPlaceholder from './../assets/members/placeholder.svg';

type Member = {
  name: string;
  role: string;
  photo?: string;
};

const TEAM_SUMMER_2026 = {
  season: 'Summer 2026',
  captain: { name: 'Evan Comba', role: 'Captain', photo: MemberEvanComba },
  divisions: [
    {
      name: 'Micro Class',
      director: { name: 'Colten Rockford', role: 'Director' },
      subteams: [
        {
          name: 'MCR Fuselage',
          members: [
            { name: 'Justin Yoon', role: 'Co-lead' },
            { name: 'Elijah Stewart', role: 'Co-lead' },
            { name: 'Melody Leung', role: 'Member' },
            { name: 'Benjamin Chen', role: 'Member' },
            { name: 'Adrian Suhenda', role: 'Member' },
            { name: 'Ethan Ho', role: 'Member' },
          ],
        },
        {
          name: 'MCR Airfoils',
          members: [
            { name: 'Gabriel Lee', role: 'Co-lead' },
            { name: 'Rycel Martos', role: 'Co-lead' },
            { name: 'Nathan Ngai', role: 'Member' },
            { name: 'Winston Lin', role: 'Member' },
            { name: 'Selina Li', role: 'Member' },
            { name: 'Prabhnoor Boparai', role: 'Member' },
          ],
        },
      ],
    },
    {
      name: 'Advanced Class',
      director: { name: 'Winston Li', role: 'Director' },
      subteams: [
        {
          name: 'ADV Fuselage',
          members: [
            { name: 'Joseph Estante', role: 'Advisor' },
            { name: 'Quinn Kalheim', role: 'Advisor' },
            { name: 'Leo Lin', role: 'Lead' },
            { name: 'Isaac Santos', role: 'Lead' },
            { name: 'Owen Baldwin', role: 'Member' },
            { name: 'Emma Creelman', role: 'Member' },
            { name: 'Jerry Wang', role: 'Member' },
            { name: 'Peter Wang', role: 'Member' },
            { name: 'Jordan Chong', role: 'Member' },
            { name: 'Houze Guo', role: 'Member' },
          ],
        },
        {
          name: 'ADV Airfoils',
          members: [
            { name: 'Diana Urbanczyk', role: 'Lead' },
            { name: 'Myron Wiebe', role: 'Lead' },
            { name: 'Stefan Dmitrovic', role: 'Member' },
            { name: 'Yuriel Dimayacyac', role: 'Member' },
            { name: 'Ethan Dart', role: 'Member' },
            { name: 'Wilford Liu', role: 'Member' },
            { name: 'Govind Suresh', role: 'Member' },
            { name: 'Sandra Zhang', role: 'Member' },
            { name: 'Amanda Huang', role: 'Member' },
          ],
        },
      ],
    },
    {
      name: 'Avionics',
      director: { name: 'Ella Yan', role: 'Director', photo: MemberEllaYan },
      subteams: [
        {
          name: 'AVI Firmware',
          members: [
            { name: 'Ayden Nguyen', role: 'Lead' },
            { name: 'Radman Yaghoobi Vayeghan', role: 'Lead', photo: MemberRadman },
            { name: 'Sina Mahdavi', role: 'Member' },
            { name: 'Anas Ahmed', role: 'Member' },
            { name: 'Sam Salehi', role: 'Member' },
            { name: 'Ron Kitainik', role: 'Member' },
            { name: 'Inderveer Sidhu', role: 'Member' },
            { name: 'Amjad Yaghi', role: 'Member' },
          ],
        },
        {
          name: 'AVI Software',
          members: [
            { name: 'Amanda Yang', role: 'Advisor' },
            { name: 'Ethan Su', role: 'Lead' },
            { name: 'Jefferson Abraham Dermawan', role: 'Member', photo: MemberJefferson },
          ],
        },
        {
          name: 'AVI Hardware',
          members: [
            { name: 'Andrew Yeh', role: 'Advisor', photo: MemberAndrewYeh },
            { name: 'Weymen Koo', role: 'Lead' },
            { name: 'Matthew Sean Sugiamto', role: 'Lead' },
            { name: 'Aurora Rolfe', role: 'Lead', photo: MemberAroraRolfe },
            { name: 'Cody Liu', role: 'Member' },
            { name: 'Eric Wang', role: 'Member' },
          ],
        },
      ],
    },
  ],
};

const SHOW_PHOTOS = false;

const MemberCard = ({ member, isDirector = false }: { member: Member; isDirector?: boolean }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 ${isDirector ? 'bg-white/5 border-white/5' : ''}`}>
      {SHOW_PHOTOS && (
        <div className={`relative shrink-0 overflow-hidden rounded-full ${isDirector ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-14 md:h-14'} bg-white/5 border border-white/10 flex items-center justify-center text-white/50`}>
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <img src={MemberPlaceholder} alt="Placeholder" className="w-1/2 h-1/2 opacity-50" />
          )}
        </div>
      )}
      <div>
        <p className={`font-titillium font-semibold text-white ${isDirector ? 'text-lg md:text-xl' : 'text-sm md:text-base'}`}>{member.name}</p>
        <p className={`font-lato text-aero-yellow uppercase tracking-widest mt-1 ${isDirector ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs'}`}>{member.role}</p>
      </div>
    </div>
  );
};

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
                <p className="font-lato text-sm text-white/45 leading-relaxed">Admin, Micro Mechanical (MCR), Advanced Mechanical (ADV), and Avionics (AVI) — each tackling distinct mission profiles or responsibilities.</p>
              </div>

              <div className="bg-[#06121f] p-10 group hover:bg-aero-dark-blue transition-colors duration-300 border-l border-white/5">
                <div className="font-titillium font-semibold text-7xl text-aero-light-blue/20 mb-4 group-hover:text-aero-light-blue/40 transition-colors">7</div>
                <h3 className="font-titillium font-semibold text-2xl text-white mb-2">Technical Subteams</h3>
                <p className="font-lato text-sm text-white/45 leading-relaxed mb-6">MCR Airfoils, MCR Fuselage, ADV Airfoils, ADV Fuselage, AVI Firmware, AVI Software, and AVI Hardware.</p>
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
                <p className="font-lato text-sm text-white/45 leading-relaxed mb-6">Finance, Flight Operations, Marketing, PR & Events, Safety, Sponsorship, and Workspace.</p>
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

      {/* ═══════════════ SUMMER 2026 TEAM ═══════════════ */}
      <Section id="members" className="pt-24 pb-16">
        <MarginWrapper>
          <Reveal>
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4">
                Our People
              </p>
              <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-6">
                MEET THE {TEAM_SUMMER_2026.season.toUpperCase()} TEAM
              </h2>
            </div>
          </Reveal>

          {/* Captain */}
          <Reveal delay={0.1}>
            <div className="flex justify-center mb-20">
              <div className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-2xl">
                <div className="flex flex-col items-center text-center">
                  <p className="font-titillium font-semibold text-white/40 tracking-[0.2em] uppercase text-sm mb-8 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-white/20" /> Leadership <span className="w-8 h-[1px] bg-white/20" />
                  </p>
                  {SHOW_PHOTOS && (
                    <div className="relative overflow-hidden rounded-full w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      {TEAM_SUMMER_2026.captain.photo ? (
                        <img src={TEAM_SUMMER_2026.captain.photo} alt={TEAM_SUMMER_2026.captain.name} className="w-full h-full object-cover" />
                      ) : (
                        <img src={MemberPlaceholder} alt="Placeholder" className="w-1/2 h-1/2 opacity-50" />
                      )}
                    </div>
                  )}
                  <h3 className="font-titillium font-semibold text-3xl text-white mb-2">{TEAM_SUMMER_2026.captain.name}</h3>
                  <p className="font-lato text-aero-yellow uppercase tracking-widest">{TEAM_SUMMER_2026.captain.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Divisions */}
          <div className="space-y-24">
            {TEAM_SUMMER_2026.divisions.map((division, divIdx) => (
              <Reveal key={division.name} delay={0.1 + divIdx * 0.1}>
                <div className="relative">
                  {/* Division Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 mb-12 gap-6">
                    <div>
                      <h3 className="font-titillium font-semibold text-3xl md:text-4xl text-white mb-2">
                        {division.name} Division
                      </h3>
                    </div>
                    {division.director && (
                      <div className="md:text-right">
                        <MemberCard member={division.director} isDirector={true} />
                      </div>
                    )}
                  </div>

                  {/* Subteams */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {division.subteams.map((subteam) => (
                      <div key={subteam.name} className="glass-panel p-8 rounded-2xl">
                        <h4 className="font-titillium font-semibold text-xl text-white mb-6 flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-aero-light-blue" />
                          {subteam.name}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {subteam.members.map((member) => (
                            <MemberCard key={member.name} member={member} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </MarginWrapper>
      </Section>

      <SectionDivider />


    </div>
  );
}
