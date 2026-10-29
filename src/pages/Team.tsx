import { useEffect } from 'react';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import TeamImage from './../assets/images/team/UBC AeroDesign 2025 Competition Team.jpg';
import WhyAero from './../assets/images/team/whyaero.jpg';
import AboutCTA from './../assets/images/backgrounds/About CTA.jpeg';
import TeamPhoto from './../assets/images/team/2024 Team Photo.jpg';
import TeamBreakdown from './../assets/images/team/Team Breakdown.svg';
import MemberPlaceholder from './../assets/members/placeholder.svg';
import MemberEvanComba from './../assets/members/evan_comba.jpg';
import MemberColtenRockford from './../assets/members/colten_rockford.jpg';
import MemberJustinYoon from './../assets/members/justin_yoon.jpg';
import MemberElijahStewart from './../assets/members/elijah_stewart.jpg';
import MemberMelodyLeung from './../assets/members/melody_leung.jpg';
import MemberBenjaminChen from './../assets/members/benjamin_chen.jpg';
import MemberAdrianSuhenda from './../assets/members/adrian_suhenda.jpg';
import MemberArshiaSorourian from './../assets/members/arshia_sorourian.jpg';
import MemberPasinduRathnayakaMudiyanselage from './../assets/members/pasindu_rathnayaka_mudiyanselage.jpg';
import MemberMaryamHosseini from './../assets/members/maryam_hosseini.jpg';
import MemberAveryLee from './../assets/members/avery_lee.jpg';
import MemberGabrielLee from './../assets/members/gabriel_lee.jpg';
import MemberRycelMartos from './../assets/members/rycel_martos.jpg';
import MemberNathanNgai from './../assets/members/nathan_ngai.jpg';
import MemberWinstonLin from './../assets/members/winston_lin.jpg';
import MemberSelinaLi from './../assets/members/selina_li.jpg';
import MemberPrabhnoorBoparai from './../assets/members/prabhnoor_boparai.jpg';
import MemberMarvinChen from './../assets/members/marvin_chen.jpg';
import MemberMckennaWhite from './../assets/members/mckenna_white.jpg';
import MemberSebastianForrest from './../assets/members/sebastian_forrest.jpg';
import MemberWinstonLi from './../assets/members/winston_li.jpg';
import memberJosephEstante from './../assets/members/joseph_estante.jpg';
import memberQuinnKalheim from './../assets/members/quinn_kalheim.jpg';
import memberJapanjotDhaliwal from './../assets/members/japanjot_dhaliwal.jpg';
import memberLeoLin from './../assets/members/leo_lin.jpg';
import memberIsaacSantos from './../assets/members/isaac_santos.jpg';
import memberOwenBaldwin from './../assets/members/owen_baldwin.jpg';
import memberJerryWang from './../assets/members/jerry_wang.jpg';
import memberPeterWang from './../assets/members/peter_wang.jpg';
import memberJordanChong from './../assets/members/jordan_chong.jpg';
import memberHouzeGuo from './../assets/members/houze_guo.jpg';
import memberAlexSung from './../assets/members/alex_sung.jpg';
import memberDianaUrbanczyk from './../assets/members/diana_urbanczyk.jpg';
import memberMyronWiebe from './../assets/members/myron_wiebe.jpg';
import memberStefanDmitrovic from './../assets/members/stefan_dmitrovic.jpg';
import memberYurielDimayacyac from './../assets/members/yuriel_dimayacyac.jpg';
import memberEthanDart from './../assets/members/ethan_dart.jpg';
import memberWilfordLiu from './../assets/members/wilford_liu.jpg';
import memberSandraZhang from './../assets/members/sandra_zhang.jpg';
import memberAmandaHuang from './../assets/members/amanda_huang.jpg';
import memberEmmaGao from './../assets/members/emma_gao.jpg';
import memberTonyXu from './../assets/members/tony_xu.jpg';
import memberDipanshJoshi from './../assets/members/dipansh_joshi.jpg';
import memberAndrewYeh from './../assets/members/andrew_yeh.jpg';
import memberEllaYan from './../assets/members/ella_yan.jpg';
import memberWeymenKoo from './../assets/members/weymen_koo.jpg';
import memberMatthewSeanSugiamto from './../assets/members/matthew_sean_sugiamto.jpg';
import memberAuroraRolfe from './../assets/members/aurora_rolfe.jpg';
import memberCodyLiu from './../assets/members/cody_liu.jpg';
import memberEricWang from './../assets/members/eric_wang.jpg';
import memberLachlanBiersteker from './../assets/members/lachlan_biersteker.jpg';
import memberEthanZhang from './../assets/members/ethan_zhang.jpg';
import memberStephanieChang from './../assets/members/stephanie_chang.jpg';
import memberAydenNguyen from './../assets/members/ayden_nguyen.jpg';
import memberRadmanYaghoobiVayeghan from './../assets/members/radman_yaghoobi_vayeghan.jpg';
import memberSamSalehi from './../assets/members/sam_salehi.jpg';
import memberSinaMahdavi from './../assets/members/sina_mahdavi.jpg';
import memberGovindSuresh from './../assets/members/govind_suresh.jpg';
import memberRonKitainik from './../assets/members/ron_kitainik.jpg';
import memberInderveerSidhu from './../assets/members/inderveer_sidhu.jpg';
import memberAmjadYaghi from './../assets/members/amjad_yaghi.jpg';
import memberYoussefKahil from './../assets/members/youssef_kahil.jpg';
import memberVukTacic from './../assets/members/vuk_tacic.jpg';
import memberJasperWang from './../assets/members/jasper_wang.jpg';
import memberKyleShek from './../assets/members/kyle_shek.jpg';
import memberEthanSu from './../assets/members/ethan_su.jpg';
import memberAnasAhmed from './../assets/members/anas_ahmed.jpg';
import memberJeffersonAbrahamDermawan from './../assets/members/jefferson_abraham_dermawan.jpg';
import memberVictorWu from './../assets/members/victor_wu.jpg';
import memberJonathanChen from './../assets/members/jonathan_chen.jpg';

type Member = {
  name: string;
  role: string;
  photo?: string;
};

const TEAM_ROSTER = {
  season: '2026/27',
  captain: { name: 'Evan Comba', role: 'Captain', photo: MemberEvanComba },
  divisions: [
    {
      name: 'Micro Class',
      director: { name: 'Colten Rockford', role: 'Director', photo: MemberColtenRockford },
      subteams: [
        {
          name: 'MCR Fuselage',
          members: [
            { name: 'Justin Yoon', role: 'Lead', photo: MemberJustinYoon},
            { name: 'Elijah Stewart', role: 'Lead', photo: MemberElijahStewart},
            { name: 'Melody Leung', role: 'Member', photo: MemberMelodyLeung},
            { name: 'Benjamin Chen', role: 'Member' },
            { name: 'Adrian Suhenda', role: 'Member', photo: MemberAdrianSuhenda},
            { name: 'Arshia Sorourian', role: 'Member', photo: MemberArshiaSorourian},
            { name: 'Pasindu Rathnayaka Mudiyanselage', role: 'Member', photo: MemberPasinduRathnayakaMudiyanselage},
            { name: 'Maryam Hosseini', role: 'Member', photo: MemberMaryamHosseini},
            { name: 'Avery Lee', role: 'Member', photo: MemberAveryLee},            
          ],
        },
        {
          name: 'MCR Airfoils',
          members: [
            { name: 'Gabriel Lee', role: 'Lead', photo: MemberGabrielLee},
            { name: 'Rycel Martos', role: 'Lead', photo: MemberRycelMartos },
            { name: 'Nathan Ngai', role: 'Member', photo: MemberNathanNgai },
            { name: 'Winston Lin', role: 'Member', photo: MemberWinstonLin },
            { name: 'Selina Li', role: 'Member', photo: MemberSelinaLi },
            { name: 'Prabhnoor Boparai', role: 'Member', photo: MemberPrabhnoorBoparai },
            { name: 'Marvin Chen', role: 'Member', photo: MemberMarvinChen },
            { name: 'Mckenna White', role: 'Member', photo: MemberMckennaWhite },
            { name: 'Sebastian Forrest', role: 'Member', photo: MemberSebastianForrest },
          ],
        },
      ],
    },
    {
      name: 'Advanced Class',
      director: { name: 'Winston Li', role: 'Director', photo: MemberWinstonLi },
      subteams: [
        {
          name: 'ADV Fuselage',
          members: [
            { name: 'Joseph Estante', role: 'Advisor' },
            { name: 'Quinn Kalheim', role: 'Advisor' },
            { name: 'Japanjot Dhaliwal', role: 'Advisor' },
            { name: 'Leo Lin', role: 'Lead', photo: memberLeoLin },
            { name: 'Isaac Santos', role: 'Lead', photo: memberIsaacSantos },
            { name: 'Owen Baldwin', role: 'Member', photo: memberOwenBaldwin },
            { name: 'Jerry Wang', role: 'Member' },
            { name: 'Peter Wang', role: 'Member' },
            { name: 'Jordan Chong', role: 'Member', photo: memberJordanChong },
            { name: 'Houze Guo', role: 'Member', photo: memberHouzeGuo },
            { name: 'Alex Sung', role: 'Member', photo: memberAlexSung },
          ],
        },
        {
          name: 'ADV Airfoils',
          members: [
            { name: 'Diana Urbanczyk', role: 'Lead', photo: memberDianaUrbanczyk },
            { name: 'Myron Wiebe', role: 'Lead', photo: memberMyronWiebe },
            { name: 'Stefan Dmitrovic', role: 'Member', photo: memberStefanDmitrovic },
            { name: 'Yuriel Dimayacyac', role: 'Member' },
            { name: 'Ethan Dart', role: 'Member', photo: memberEthanDart },
            { name: 'Wilford Liu', role: 'Member', photo: memberWilfordLiu },
            { name: 'Sandra Zhang', role: 'Member', photo: memberSandraZhang },
            { name: 'Amanda Huang', role: 'Member', photo: memberAmandaHuang },
            { name: 'Emma Gao', role: 'Member', photo: memberEmmaGao },
            { name: 'Tony Xu', role: 'Member', photo: memberTonyXu },
            { name: 'Dipansh Joshi', role: 'Member', photo: memberDipanshJoshi },
          ],
        },
      ],
    },
    {
      name: 'Avionics',
      director: { name: 'Andrew Yeh', role: 'Director' },
      subteams: [
        {
          name: 'AVI Hardware',
          members: [
            { name: 'Ella Yan', role: 'Advisor' },
            { name: 'Weymen Koo', role: 'Lead', photo: memberWeymenKoo },
            { name: 'Matthew Sean Sugiamto', role: 'Lead', photo: memberMatthewSeanSugiamto },
            { name: 'Aurora Rolfe', role: 'Lead', photo: memberAuroraRolfe },
            { name: 'Cody Liu', role: 'Member', photo: memberCodyLiu },
            { name: 'Eric Wang', role: 'Member', photo: memberEricWang },
            { name: 'Lachlan Biersteker', role: 'Member', photo: memberLachlanBiersteker },
            { name: 'Ethan Zhang', role: 'Member', photo: memberEthanZhang },
            { name: 'Stephanie Chang', role: 'Member', photo: memberStephanieChang },
          ],
        },
        {
          name: 'AVI Flight Software',
          members: [
            { name: 'Ayden Nguyen', role: 'Lead', photo: memberAydenNguyen },
            { name: 'Radman Yaghoobi Vayeghan', role: 'Lead', photo: memberRadmanYaghoobiVayeghan },
            { name: 'Sam Salehi', role: 'Lead', photo: memberSamSalehi },
            { name: 'Sina Mahdavi', role: 'Member' },
            { name: 'Govind Suresh', role: 'Member' },
            { name: 'Ron Kitainik', role: 'Member', photo: memberRonKitainik },
            { name: 'Inderveer Sidhu', role: 'Member', photo: memberInderveerSidhu },
            { name: 'Amjad Yaghi', role: 'Member', photo: memberAmjadYaghi },
            { name: 'Youssef Kahil', role: 'Member', photo: memberYoussefKahil },
            { name: 'Vuk Tacic', role: 'Member', photo: memberVukTacic },
            { name: 'Jasper Wang', role: 'Member', photo: memberJasperWang },
            { name: 'Kyle Shek', role: 'Member', photo: memberKyleShek },
          ],
        },
        {
          name: 'AVI Ground Software',
          members: [
            { name: 'Ethan Su', role: 'Lead', photo: memberEthanSu },
            { name: 'Anas Ahmed', role: 'Lead' },
            { name: 'Jefferson Abraham Dermawan', role: 'Member' },
            { name: 'Victor Wu', role: 'Member', photo: memberVictorWu },
            { name: 'Jonathan Chen', role: 'Member', photo: memberJonathanChen },
          ],
        },
      ],
    },
    {
      name: 'Admin',
      //director: { name: '', role: 'Director' },
      subteams: [
        {
          name: 'External',
          members: [
            { name: 'Tvisha Shrikant', role: 'Lead' },
            { name: 'Sara Qaimari', role: 'Lead' },
            { name: 'Amara Gatzke', role: 'Member' },          
          ],
        },
        {
          name: 'Finance',
          members: [
            { name: 'Vansh Sharma', role: 'Lead' },
            { name: 'Harshit Sethi', role: 'Member' },
          ],
        },
        {
          name: 'Marketing',
          members: [
            { name: 'Amanda Yang', role: 'Advisor' },
            { name: 'Myra Yu', role: 'Lead' },
            { name: 'Ryan Xu', role: 'Lead' },
          ],
        },
      ],
    },
  ],
};

const SHOW_PHOTOS = true;

const MemberCard = ({ member, isDirector = false }: { member: Member; isDirector?: boolean }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 ${isDirector ? 'bg-white/5 border-white/5' : ''}`}>
      {SHOW_PHOTOS && (
        <div className={`relative shrink-0 overflow-hidden rounded-full ${isDirector ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-14 md:h-14'} bg-white/5 border border-white/10 flex items-center justify-center text-white/50`}>
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-[center_30%]" />
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

  useEffect(() => {
    document.title = 'Team – UBC AeroDesign';
  }, []);

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
                  destination="https://docs.google.com/document/d/1ahthGpZLPvIFjUyVyWzKAlZ3vAwBbXZmII8U_2bRQhY/edit?tab=t.0"
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
                  destination="https://docs.google.com/document/d/11nuN9A19SKlHK72HhKCBtdl82eV85YTqr5dZ9A6U-kU/edit?tab=t.0"
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

      {/* ═══════════════ 2026/2027 TEAM ═══════════════ */}
      <Section id="members" className="pt-24 pb-16">
        <MarginWrapper>
          <Reveal>
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4">
                Our People
              </p>
              <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-6">
                MEET THE {TEAM_ROSTER.season.toUpperCase()} TEAM
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
                      {TEAM_ROSTER.captain.photo ? (
                        <img src={TEAM_ROSTER.captain.photo} alt={TEAM_ROSTER.captain.name} className="w-full h-full object-cover object-[center_30%]" />
                      ) : (
                        <img src={MemberPlaceholder} alt="Placeholder" className="w-1/2 h-1/2 opacity-50" />
                      )}
                    </div>
                  )}
                  <h3 className="font-titillium font-semibold text-3xl text-white mb-2">{TEAM_ROSTER.captain.name}</h3>
                  <p className="font-lato text-aero-yellow uppercase tracking-widest">{TEAM_ROSTER.captain.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Divisions */}
          <div className="space-y-24">
            {TEAM_ROSTER.divisions.map((division, divIdx) => (
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
