import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import WhyAero from './../assets/images/team/whyaero.jpg';
import AboutCTA from './../assets/images/backgrounds/About CTA.jpeg';

/* ══════════════════════════════════════════════════════════════════════════
   RECRUITMENT CONFIG — update this block at the start of every cycle.
   Everything below the config reads from these values, so the page only
   needs to be edited here.
   ══════════════════════════════════════════════════════════════════════════ */

/** Flip to false between cycles to switch the page back to "applications closed". */
const APPLICATIONS_OPEN = false;
const SHOW_APPLICATIONS_OPEN_DATE_TIME = true;

const APPLICATION_OPEN_DATE = "August 26"
const APPLICATION_OPEN_TIME = "8:00 PM PDT"

/** TODO: replace with the real Google Form link before merging this branch. */
const APPLICATION_FORM_URL = 'https://forms.gle/REPLACE-WITH-REAL-FORM-ID';

/** Shown in the hero and closing CTA while applications are open. */
const APPLICATION_DEADLINE = 'September 14';

/** Shown in the hero while applications are closed. */
const NEXT_CYCLE = 'August 2027';

const DISCORD_URL = 'https://discord.gg/tW7RZ6atTS';

const TIMELINE = [
  {
    date: 'August 26',
    time: '8:00 PM PDT',
    title: 'APPLICATION FORMS OPEN',
    desc: 'Applications go live. Submit one form, answering the questions for every subteam you are interested in.',
  },
  {
    date: 'September 4',
    time: '6:30 – 8 PM PDT',
    location: 'ANGU 243',
    title: 'INFO SESSION #1',
    desc: 'Meet the leads, hear about each subteam, and ask questions in person.',
  },
  {
    date: 'September 8',
    time: '11:30 AM – 5 PM PDT',
    title: 'CAMPUS LIFE EXPO — IMAGINE DAY',
    desc: 'Find our booth on Main Mall at UBC’s Campus Life Expo (formerly "Main Event").',
  },
  {
    date: 'September 9',
    time: '6:30 – 8 PM PDT',
    location: 'TBD',
    title: 'INFO SESSION #2',
    desc: 'Same content as Info Session #1 — come to whichever suits your schedule.',
  },
  {
    date: 'September 11',
    time: '6:00 PM PDT',
    location: 'TBD',
    title: 'WOMEN IN AEROSPACE',
    desc: 'We welcome cis women, trans women, non-binary, and gender-diverse folks to join us for a Q&A session.',
  },
  {
    date: 'September 14',
    time: '11:59 PM PDT',
    title: 'APPLICATIONS CLOSE',
    desc: 'Last call. Offers are released on a rolling basis, so earlier applications have the better odds.',
  },
];

const PROCESS_STEPS = [
  {
    title: 'LEARN ABOUT THE TEAM',
    desc: 'Read our website and socials, and come to our info sessions and events.',
    linkText: 'About',
    linkDest: '/about',
  },
  {
    title: 'ASK QUESTIONS',
    desc: 'Chat with leads and members at our events or on our recruitment Discord.',
    linkText: 'Join Discord',
    linkDest: DISCORD_URL,
  },
  {
    title: 'APPLY',
    desc: 'Submit the form before the deadline. Offers are rolling, so apply ASAP.',
    linkText: APPLICATIONS_OPEN ? 'Apply Now' : undefined,
    linkDest: APPLICATIONS_OPEN ? APPLICATION_FORM_URL : undefined,
  },
  {
    title: 'INTERVIEW',
    desc: 'Promising applicants get an interview for each subteam they applied to.',
  },
  {
    title: 'WELCOME TO THE TEAM',
    desc: 'Fit the team on both application and interview, and an offer lands in your inbox. 🎉',
  },
];

const FAQS = [
  {
    q: 'I have more questions',
    a: 'Join our recruitment Discord server to get answers directly from our members and leads. Alternatively, attend our info sessions and events to chat with us in-person.',
  },
  {
    q: 'Is Advanced Class more difficult than Micro Class?',
    a: 'The two classes “Micro Class” and “Advanced Class” are merely names and do not indicate that one class is more difficult than the other, and the classes are also not targeted towards different seniorities.',
  },
  {
    q: 'Does it matter if I apply sooner vs. later?',
    a: 'Offers are released on a rolling basis, meaning that the sooner you apply the higher chance you will get an offer.',
  },
  {
    q: 'Should first years apply?',
    a: 'Yes! Subteams often hope to recruit first years every recruiting season. We acknowledge that first years generally do not have as much technical prowess as upper years.',
  },
  {
    q: 'Do I have to be an aircraft or aerospace enthustiast?',
    a: 'While a passion for aircraft and aerospace is not mandatory, it would certainly be advantageous. Our team comprises individuals who have become part of UBC AeroDesign because it resonates with their enthusiasm for aviation and aerospace. Conversely, some members have joined to develop and apply engineering skills and tools.',
  },
];

/** Small inline link used inside the compact process cards. */
function StepLink({ destination, value }: { destination: string; value: string }) {
  const external = destination.startsWith('http');
  return (
    <Link
      to={destination}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-2 mt-4 font-titillium font-semibold text-xs tracking-[0.15em] uppercase text-aero-light-blue hover:text-white transition-colors duration-300"
    >
      {value}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function Recruitment() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Recruitment – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#06121f]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-end overflow-hidden pb-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${AboutCTA}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-[#06121f]/70 to-[#06121f]/90" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-32">
          <Reveal direction="up" delay={0.1}>
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-5 flex justify-center items-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Recruitment <span className="w-8 h-[1px] bg-aero-yellow" />
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h1 className="font-titillium font-semibold text-5xl md:text-6xl lg:text-7xl text-white leading-none mb-6">
              JOIN THE TEAM
            </h1>
          </Reveal>

          {APPLICATIONS_OPEN ? (
            <>
              <Reveal direction="up" delay={0.3}>
                <p className="font-lato text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                  Applications are <span className="text-aero-yellow font-bold">Now Open</span>
                  <br />
                  Submit yours by {APPLICATION_DEADLINE} — offers are released on a rolling basis.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.4}>
                <div className="flex flex-wrap justify-center gap-5">
                  <Button
                    destination={APPLICATION_FORM_URL}
                    target="_blank"
                    value="Apply Now"
                    variant="yellow"
                    className="text-lg px-12 py-4"
                  />
                  <Button
                    destination={DISCORD_URL}
                    target="_blank"
                    value="Join Discord"
                    variant="outline"
                    className="text-lg px-12 py-4"
                  />
                </div>
              </Reveal>
            </>
          ) : (
            <>
              <Reveal direction="up" delay={0.3}>
                {SHOW_APPLICATIONS_OPEN_DATE_TIME ? (
                  <>
                    <p className="font-lato text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                      Applications go live on <span className="text-aero-yellow font-bold">{APPLICATION_OPEN_DATE}</span> at <span className="text-aero-yellow font-bold">{APPLICATION_OPEN_TIME}</span>.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-lato text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                      Applications are <span className="text-aero-yellow font-bold">Currently Closed</span>
                      <br />
                      Next recruitment cycle begins in {NEXT_CYCLE}.
                    </p>
                  </>
                )}
              </Reveal>
              <Reveal direction="up" delay={0.4}>
                <div className="flex flex-wrap justify-center gap-5">
                  <Button
                    destination={DISCORD_URL}
                    target="_blank"
                    value="Join Discord"
                    variant="outline"
                    className="text-lg px-12 py-4"
                  />
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════ WHY AERODESIGN ═══════════════ */}
      <Section id="why-aerodesign" className="bg-[#030a11]">
        <MarginWrapper>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <Reveal direction="left" className="lg:w-1/2">
              <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-aero-yellow" /> Why AeroDesign
              </p>
              <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-6">
                APPLY YOUR KNOWLEDGE
              </h2>
              <p className="font-lato text-white/55 text-lg leading-relaxed mb-6">
                UBC AeroDesign is a place where team members can take classroom knowledge and apply it to real-world problems. The team is entirely student-led — our junior members learn from the senior members, and our senior members gain valuable project management skills and experience using the engineering design process.
              </p>
              <p className="font-lato text-white/55 leading-relaxed">
                UBC AeroDesign is open to <span className="text-white font-bold">all UBC undergraduate and graduate students</span> of all disciplines and faculties. It is a great opportunity for first-year students to explore their interest in engineering and aviation, and for senior students to apply their knowledge.
              </p>
            </Reveal>

            <Reveal direction="right" className="lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-aero-mid-blue to-aero-light-blue rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>
                <img
                  src={WhyAero}
                  alt="Why AeroDesign"
                  className="relative w-full rounded-2xl object-cover shadow-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500"
                />
              </div>
            </Reveal>
          </div>
        </MarginWrapper>
      </Section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <Section id="process" className="py-20">
        <MarginWrapper>
          <Reveal className="mb-12 text-center">
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Steps <span className="w-8 h-[1px] bg-aero-yellow" />
            </p>
            <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight">
              RECRUITMENT PROCESS
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={index}
                  className="bg-[#06121f] p-7 flex flex-col hover:bg-aero-dark-blue transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-titillium font-semibold text-sm text-aero-light-blue/70 w-7 h-7 flex-none rounded-full border border-aero-light-blue/25 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="font-titillium font-semibold text-lg text-white leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-lato text-sm text-white/45 leading-relaxed">
                    {step.desc}
                  </p>
                  {step.linkText && step.linkDest && (
                    <div className="mt-auto">
                      <StepLink destination={step.linkDest} value={step.linkText} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ TIMELINE ═══════════════ */}
      <Section id="timeline" className="bg-[#030a11]">
        <MarginWrapper>
          <Reveal className="mb-14 text-center">
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Key Dates <span className="w-8 h-[1px] bg-aero-yellow" />
            </p>
            <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-4">
              RECRUITMENT TIMELINE
            </h2>
            <p className="font-lato text-sm text-white/40 tracking-wide">
              All times are PDT. Dates and locations are subject to change — check our Discord for the latest information.
            </p>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            {TIMELINE.map((item, index) => (
              <Reveal key={index} delay={Math.min(index, 6) * 0.05} direction="up">
                <div className="group grid grid-cols-[6rem_auto_1fr] md:grid-cols-[11rem_auto_1fr] gap-x-4 md:gap-x-10">
                  {/* Date */}
                  <div className="py-5 text-right">
                    <p className="font-titillium font-semibold text-sm md:text-base text-white/85 leading-snug">
                      {item.date}
                    </p>
                    {item.time && (
                      <p className="font-lato text-xs text-white/35 mt-1 leading-snug">{item.time}</p>
                    )}
                    {item.location && (
                      <p className="font-lato text-xs text-white/35 mt-1 leading-snug">{item.location}</p>
                    )}
                  </div>

                  {/* Rail */}
                  <div className="flex flex-col items-center">
                    <span
                      className={clsx('w-px h-7 flex-none', index === 0 ? 'bg-transparent' : 'bg-white/10')}
                    />
                    <span className="w-2.5 h-2.5 flex-none rounded-full bg-white/25 group-hover:bg-aero-yellow group-hover:shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300" />
                    <span
                      className={clsx(
                        'w-px flex-1',
                        index === TIMELINE.length - 1 ? 'bg-transparent' : 'bg-white/10'
                      )}
                    />
                  </div>

                  {/* Event */}
                  <div className="py-5 min-w-0">
                    <h3 className="font-titillium font-semibold text-base md:text-lg text-white tracking-wide leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-lato text-sm text-white/45 leading-relaxed mt-1.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </MarginWrapper>
      </Section>

      <SectionDivider />

      {/* ═══════════════ FAQ ═══════════════ */}
      <Section id="faq">
        <MarginWrapper>
          <Reveal className="mb-16 text-center">
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Common Questions <span className="w-8 h-[1px] bg-aero-yellow" />
            </p>
            <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight">
              FAQ
            </h2>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => (
              <Reveal key={index} delay={index * 0.1} direction="up">
                <div className="glass-panel rounded-xl p-6 md:p-8 border border-white/5">
                  <h3 className="font-titillium font-semibold text-xl text-white mb-3">
                    {faq.q}
                  </h3>
                  <p className="font-lato text-white/55 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </MarginWrapper>
      </Section>

      {/* ═══════════════ CLOSING CTA ═══════════════ */}
      {APPLICATIONS_OPEN && (
        <Section id="apply" className="bg-[#030a11]">
          <MarginWrapper>
            <Reveal direction="up">
              <div className="glass-panel rounded-2xl border border-white/10 px-8 py-14 md:px-16 md:py-16 text-center max-w-4xl mx-auto">
                <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight mb-4 text-glow">
                  READY TO TAKE FLIGHT?
                </h2>
                <p className="font-lato text-white/55 text-lg leading-relaxed max-w-xl mx-auto mb-10">
                  Applications close {APPLICATION_DEADLINE} at 11:59 PM PDT. Offers go out on a rolling basis, so the earlier you apply, the better your odds.
                </p>
                <div className="flex flex-wrap justify-center gap-5">
                  <Button
                    destination={APPLICATION_FORM_URL}
                    target="_blank"
                    value="Apply Now"
                    variant="yellow"
                    className="text-lg px-12 py-4"
                  />
                  <Button
                    destination={DISCORD_URL}
                    target="_blank"
                    value="Ask A Question"
                    variant="outline"
                    className="text-lg px-12 py-4"
                  />
                </div>
              </div>
            </Reveal>
          </MarginWrapper>
        </Section>
      )}
    </div>
  );
}
