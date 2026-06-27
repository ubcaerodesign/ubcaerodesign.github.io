import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import WhyAero from './../assets/images/team/whyaero.jpg';
import AboutCTA from './../assets/images/backgrounds/About CTA.jpeg';

export default function Recruitment() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Recruitment – UBC AeroDesign';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  const PROCESS_STEPS = [
    {
      title: "LEARN ABOUT THE TEAM",
      desc: "Read our website, check out our social media, attend info sessions and events to learn about UBC AeroDesign and the technical/admin team opportunities.",
      buttonText: "ABOUT",
      buttonDest: "/about"
    },
    {
      title: "ASK QUESTIONS",
      desc: "Chat with leads and members at our virtual and in-person events or through our recruitment Discord server.",
      buttonText: "JOIN DISCORD SERVER",
      buttonDest: "https://discord.gg/tW7RZ6atTS"
    },
    {
      title: "APPLY",
      desc: "Complete the application form before the deadline. Note that offers are given out at a rolling basis, so apply ASAP to increase your odds",
    },
    {
      title: "INTERVIEW",
      desc: "If your application seems promising, you will be offered an interview for each subteam you applied to.",
    },
    {
      title: "WELCOME TO THE TEAM 🎉",
      desc: "If we deem you a fit for our team through both your application and interview, you will be emailed back an offer. Welcome to UBC AeroDesign!",
    }
  ];

  const FAQS = [
    {
      q: "I have more questions",
      a: "Join our recruitment Discord server to get answers directly from our members and leads. Alternatively, attend our info sessions and events to chat with us in-person."
    },
    {
      q: "Is Advanced Class more difficult than Micro Class?",
      a: "The two classes “Micro Class” and “Advanced Class” are merely names and do not indicate that one class is more difficult than the other, and the classes are also not targeted towards different seniorities."
    },
    {
      q: "Does it matter if I apply sooner vs. later?",
      a: "Offers are released on a rolling basis, meaning that the sooner you apply the higher chance you will get an offer."
    },
    {
      q: "Should first years apply?",
      a: "Yes! Subteams often hope to recruit first years every recruiting season. We acknowledge that first years generally do not have as much technical prowess as upper years."
    },
    {
      q: "Do I have to be an aircraft or aerospace enthustiast?",
      a: "While a passion for aircraft and aerospace is not mandatory, it would certainly be advantageous. Our team comprises individuals who have become part of UBC AeroDesign because it resonates with their enthusiasm for aviation and aerospace. Conversely, some members have joined to develop and apply engineering skills and tools."
    }
  ];

  return (
    <div className="min-h-screen bg-[#06121f]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-end overflow-hidden pb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#06121f]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-transparent to-[#06121f]/40" />
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
          <Reveal direction="up" delay={0.3}>
            <p className="font-lato text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Applications are <span className="text-aero-yellow font-bold">Currently Closed</span>
              <br/>
              Next recruitment cycle begins in August 2026.
            </p>
          </Reveal>
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
      <Section id="process">
        <MarginWrapper>
          <Reveal className="mb-16 text-center">
            <p className="font-titillium font-semibold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-aero-yellow" /> Steps <span className="w-8 h-[1px] bg-aero-yellow" />
            </p>
            <h2 className="font-titillium font-semibold text-4xl md:text-5xl text-white leading-tight">
              RECRUITMENT PROCESS
            </h2>
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-8 relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
            
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={index} delay={index * 0.1} direction={isEven ? "right" : "left"}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''} items-center`}>
                    
                    {/* Circle Node */}
                    <div className="absolute left-8 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-aero-yellow border-4 border-[#06121f] z-10 shadow-[0_0_15px_rgba(242,175,41,0.5)]"></div>
                    
                    {/* Content Box */}
                    <div className={`ml-16 md:ml-0 w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div className="glass-panel rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20">
                        <h3 className="font-titillium font-semibold text-2xl text-white mb-3 flex items-center gap-3">
                          <span className="text-aero-light-blue opacity-50">0{index + 1}.</span> {step.title}
                        </h3>
                        <p className="font-lato text-white/55 leading-relaxed mb-5">
                          {step.desc}
                        </p>
                        {step.buttonText && step.buttonDest && (
                          <Button 
                            destination={step.buttonDest} 
                            value={step.buttonText} 
                            variant="outline" 
                            target={step.buttonDest.startsWith('http') ? "_blank" : undefined}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
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

    </div>
  );
}
