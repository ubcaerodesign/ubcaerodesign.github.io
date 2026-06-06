import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import InstagramIcon from './../assets/icons/Instagram.svg';
import FacebookIcon from './../assets/icons/Facebook.svg';
import LinkedinIcon from './../assets/icons/Linkedin.svg';
import DiscordIcon from './../assets/icons/Discord.svg';

/* ── Contact Entry ──────────────────────── */
interface ContactEntryProps {
  label: string;
  name?: string;
  email: string;
}

function ContactEntry({ label, name, email }: ContactEntryProps) {
  return (
    <div className="group py-8 border-b border-white/10 flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
      <div className="md:w-1/3 shrink-0">
        <span className="font-titillium font-bold text-lg text-white group-hover:text-aero-light-blue transition-colors tracking-wide">
          {label}
        </span>
      </div>
      <div className="md:w-2/3">
        {name && <p className="font-lato text-white/70 text-sm mb-1">{name}</p>}
        <a
          href={`mailto:${email}`}
          className="font-lato text-aero-yellow hover:text-white transition-colors"
        >
          {email}
        </a>
      </div>
    </div>
  );
}

/* ── Contact Page ──────────────────────── */
export default function Contact() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Contact – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aero-mid-blue/10 blur-[150px] rounded-full pointer-events-none" />

        <MarginWrapper className="relative z-10">
          <div className="max-w-4xl">
            <Reveal direction="up" delay={0.1}>
              <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-aero-yellow" /> Get In Touch
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h1 className="font-titillium font-bold text-5xl md:text-7xl text-white leading-tight mb-8 text-glow">
                Contact Us
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="font-lato text-xl text-white/60 leading-relaxed max-w-2xl border-l-4 border-aero-yellow pl-6">
                If you are interested in becoming a sponsor, interested in working with us, or simply learning more, please do not hesitate to contact us.
              </p>
            </Reveal>
          </div>
        </MarginWrapper>
      </section>

      {/* ═══════════════ CONTACT INFO ═══════════════ */}
      <Section>
        <MarginWrapper>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left — emails */}
            <div className="lg:w-3/5">
              <Reveal>
                <div className="mb-12">
                  <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4">Departments</p>
                  <h2 className="font-titillium font-bold text-4xl text-white">REACH OUT</h2>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <ContactEntry
                    label="General Inquiries"
                    name="Eric Zhang · Team Captain"
                    email="captain@ubcaerodesign.com"
                  />
                  <ContactEntry
                    label="Sponsorship"
                    email="sponsor@ubcaerodesign.com"
                  />
                  <ContactEntry
                    label="Public Relations & External"
                    email="events@ubcaerodesign.com"
                  />
                  <ContactEntry
                    label="Marketing"
                    email="marketing@ubcaerodesign.com"
                  />
                  <ContactEntry
                    label="Flight Operations"
                    email="flight-operations@ubcaerodesign.com"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right — address & socials */}
            <div className="lg:w-2/5">
              <Reveal delay={0.15}>
                <div className="mb-12">
                  <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4">Location</p>
                  <h3 className="font-titillium font-bold text-2xl text-white mb-6 tracking-wide">MAILING ADDRESS</h3>
                  <div className="font-lato text-white/55 leading-relaxed">
                    <p>UBC AeroDesign</p>
                    <p>Dept. of Mechanical Engineering</p>
                    <p>University of British Columbia</p>
                    <p>2054 - 6250 Applied Science Lane</p>
                    <p>Vancouver, BC V6T 1Z4</p>
                    <p>Canada</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div>
                  <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-6">Follow Us</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/ubcaerodesign/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                      <img src={InstagramIcon} alt="Instagram" className="w-5 h-5 opacity-70 group-hover:opacity-100 invert" />
                    </a>
                    <a href="https://www.facebook.com/UBCAeroDesign" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                      <img src={FacebookIcon} alt="Facebook" className="w-5 h-5 opacity-70 group-hover:opacity-100 invert" />
                    </a>
                    <a href="https://ca.linkedin.com/company/ubc-aerodesign" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                      <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5 opacity-70 group-hover:opacity-100 invert" />
                    </a>
                    <a href="https://discord.gg/xHN3UyRyVh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                      <img src={DiscordIcon} alt="Discord" className="w-5 h-5 opacity-70 group-hover:opacity-100 invert" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </MarginWrapper>
      </Section>

      {/* ═══════════════ MAP / VISUAL CTA ═══════════════ */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06121f] via-aero-mid-blue/10 to-[#06121f]" />
        <div className="relative z-10 text-center px-6">
          <Reveal direction="up">
            <h2 className="font-titillium font-bold text-4xl md:text-6xl text-white mb-8 text-glow">WE'D LOVE TO HEAR FROM YOU</h2>
            <p className="font-lato text-white/50 text-lg">
              University of British Columbia · Vancouver, BC, Canada
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
