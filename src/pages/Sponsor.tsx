import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import SponsorPhoto1 from './../assets/images/sponsorphoto1.JPG';
import SponsorPhoto2 from './../assets/images/sponsorphoto2.jpg';
import SponsorMECH from './../assets/images/sponsors/68c837abdd537cbd43f4bec1_MECH.png';
import SponsorSolidWorks from './../assets/images/sponsors/68c838e3e475174226102175_SolidWorks.png';
import SponsorUBCAPSC from './../assets/images/sponsors/68c839a67597540c9c8f1c6b_UBC_APSC.png';
import SponsorDometic from './../assets/images/sponsors/68c83a2746eb3d04965ccf38_Dometic_-_logo.png';
import SponsorAPC from './../assets/images/sponsors/68c83cabb083bfab4981019a_APC-.png';
import SponsorPMHansen from './../assets/images/sponsors/68c8b215f5f00da141413c53_PMHansen.jpg';
import SponsorMagicBox from './../assets/images/sponsors/68c8b2727d0f64f27957b690_magicBox-p-2000.png';
import SponsorTycorp from './../assets/images/sponsors/68c8b316b083bfab49a2d156_e0dcd8ac2559846d97f96a4eeddd3ef1_tycorp.png';
import SponsorDragonPlate from './../assets/images/sponsors/68c8b36ac567e172d160c585_20e8cfa6b92f38c0fe8a4de9e896ccb2_dragonplate-vertical-light-modified.png';
import SponsorTMotor from './../assets/images/sponsors/68c8b4a2834d882b753fc9c5_807edda0b95c0f78da74dcdb1dec3d77_tmotor.png';
import SponsorSAEBC from './../assets/images/sponsors/68c8b52c25a5c7faca8662fb_SAEBC.png';
import SponsorIGEN from './../assets/images/sponsors/68c8b5b8f6b5b4c943ebc538_IGEN.png';
import SponsorRenegade from './../assets/images/sponsors/68c8b68fd1bfb5aed9c0751e_Renegade.png';

const SPONSOR_LOGOS = [
  { src: SponsorMECH, alt: "MECH" },
  { src: SponsorSolidWorks, alt: "SolidWorks" },
  { src: SponsorUBCAPSC, alt: "UBC APSC" },
  { src: SponsorDometic, alt: "Dometic" },
  { src: SponsorAPC, alt: "APC" },
  { src: SponsorPMHansen, alt: "PM Hansen" },
  { src: SponsorMagicBox, alt: "MagicBox" },
  { src: SponsorTycorp, alt: "Tycorp" },
  { src: SponsorDragonPlate, alt: "DragonPlate" },
  { src: SponsorTMotor, alt: "T-Motor" },
  { src: SponsorSAEBC, alt: "SAE BC" },
  { src: SponsorIGEN, alt: "IGEN" },
  { src: SponsorRenegade, alt: "Renegade" },
];

export default function Sponsor() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Sponsor – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f]">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aero-mid-blue/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aero-yellow/5 blur-[120px] rounded-full pointer-events-none" />

        <MarginWrapper className="relative z-10">
          <div className="max-w-4xl">
            <Reveal direction="up" delay={0.1}>
              <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-aero-yellow" /> Partner With Us
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h1 className="font-poppins font-semibold text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 text-glow">
                BECOME A<br />SPONSOR
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="font-urbanist text-xl text-white/60 leading-relaxed max-w-2xl border-l-4 border-aero-yellow pl-6">
                Help us push the boundaries of student-led aerospace engineering. Your support fuels innovation, education, and competition excellence.
              </p>
            </Reveal>
          </div>
        </MarginWrapper>
      </section>

      {/* ═══════════════ HOW SPONSORS HELP US ═══════════════ */}
      <Section>
        <MarginWrapper>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            {/* Left — Image */}
            <Reveal direction="left" className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-aero-mid-blue/40 to-aero-light-blue/10 rounded-2xl blur-xl group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  <img
                    src={SponsorPhoto1}
                    alt="UBC AeroDesign plane in flight"
                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06121f]/50 to-transparent" />
                </div>
              </div>
            </Reveal>

            {/* Right — Text */}
            <Reveal direction="right" className="lg:w-1/2 w-full">
              <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-aero-yellow" /> Why Sponsor
              </p>
              <h2 className="font-poppins font-semibold text-4xl md:text-5xl text-white leading-tight mb-8">
                HOW SPONSORS<br />HELP US
              </h2>
              <div className="space-y-5">
                <p className="font-urbanist text-lg text-white/65 leading-relaxed">
                  The SAE AeroDesign Competition is our annual challenge. It shifts in missions and classes (Micro, Regular, & Advanced), requiring crafting efficient, lightweight aircraft. Amidst diverse global teams, we prove our mettle.
                </p>
                <p className="font-urbanist text-lg text-white/65 leading-relaxed">
                  Our 20+ top placements among 40+ teams highlight our prowess. It's about facing challenges, real competition, and growth. Join us as we pursue higher heights and harness the competitive spirit that propels our journey.
                </p>
              </div>
            </Reveal>

          </div>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ HOW WE GIVE BACK ═══════════════ */}
      <Section>
        <MarginWrapper>
          <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">

            {/* Right — Image */}
            <Reveal direction="right" className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-bl from-aero-yellow/20 to-aero-mid-blue/10 rounded-2xl blur-xl group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  <img
                    src={SponsorPhoto2}
                    alt="UBC AeroDesign workspace"
                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06121f]/50 to-transparent" />
                </div>
              </div>
            </Reveal>

            {/* Left — Text */}
            <Reveal direction="left" className="lg:w-1/2 w-full">
              <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-aero-yellow" /> Giving Back
              </p>
              <h2 className="font-poppins font-semibold text-4xl md:text-5xl text-white leading-tight mb-8">
                HOW WE<br />GIVE BACK
              </h2>
              <div className="space-y-5">
                <p className="font-urbanist text-lg text-white/65 leading-relaxed">
                  At UBC AeroDesign, we believe in the value of reciprocity. Just as our sponsors enable us to achieve our goals, we're dedicated to giving back. Through knowledge-sharing sessions, workshops, and outreach programs, we actively engage with our local and global communities.
                </p>
                <p className="font-urbanist text-lg text-white/65 leading-relaxed">
                  By sponsoring us, you're not only investing in our success but also empowering the broader engineering community. Together, we inspire future engineers, promote STEM education, and create a lasting impact on the world of aerospace engineering.
                </p>
              </div>
            </Reveal>

          </div>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ CURRENT SPONSORS ═══════════════ */}
      <Section>
        <MarginWrapper>
          <Reveal>
            <div className="text-center mb-16">
              <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4">Our Partners</p>
              <h2 className="font-poppins font-semibold text-4xl md:text-5xl text-white">
                CURRENT SPONSORS
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {SPONSOR_LOGOS.map((logo, i) => (
                <div
                  key={i}
                  className="glass-panel rounded-xl p-6 flex items-center justify-center border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group aspect-[3/2]"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-12 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 invert"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ SPONSORSHIP PACKAGE ═══════════════ */}
      <Section>
        <MarginWrapper>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

            {/* Left — Package info */}
            <Reveal direction="left" className="lg:w-1/2 w-full">
              <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-aero-yellow" /> Get Started
              </p>
              <h2 className="font-poppins font-semibold text-4xl md:text-5xl text-white leading-tight mb-8">
                SPONSORSHIP<br />PACKAGE
              </h2>
              <p className="font-urbanist text-lg text-white/65 leading-relaxed mb-10">
                Details involving sponsorship tiers, sponsorship benefits, our 2025–2026 financial plan, and more can be found in our sponsorship package.
              </p>
              <Button
                destination="https://cdn.prod.website-files.com/64e6fe6da7b788ebae21b130/68d2e0a51806ef02954b79ce_Sponsorship%20Package%202025-26.pdf"
                target="_blank"
                value="View Sponsorship Package"
                variant="yellow"
              />
            </Reveal>

            {/* Right — Contact card */}
            <Reveal direction="right" className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-aero-mid-blue/30 to-aero-yellow/10 rounded-2xl blur-xl" />
                <div className="relative glass-panel rounded-2xl border border-white/10 p-10 md:p-14">
                  <div className="mb-10">
                    <p className="font-poppins font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-3">Let's Get In Touch</p>
                    <h3 className="font-poppins font-semibold text-3xl text-white mb-4">CONTACT US</h3>
                    <p className="font-urbanist text-white/55 leading-relaxed">
                      Interested in partnering with UBC AeroDesign? We'd love to hear from you. Reach out to start a conversation about how we can work together.
                    </p>
                  </div>

                  <a
                    href="mailto:sponsor@ubcaerodesign.com"
                    className="group inline-flex items-center gap-4 py-5 px-8 rounded-xl bg-white/5 border border-white/10 hover:border-aero-yellow/50 hover:bg-aero-yellow/5 transition-all duration-300 w-full"
                  >
                    {/* Mail icon */}
                    <div className="w-12 h-12 rounded-full bg-aero-yellow/10 flex items-center justify-center shrink-0 group-hover:bg-aero-yellow/20 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-aero-yellow">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-urbanist text-xs text-white/40 tracking-widest uppercase mb-1">Email</p>
                      <p className="font-poppins font-semibold text-aero-yellow group-hover:text-white transition-colors">
                        sponsor@ubcaerodesign.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>

          </div>
        </MarginWrapper>
      </Section>

    </div>
  );
}
