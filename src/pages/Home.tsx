import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from './../components/Buttons';
import { MarginWrapper, Section, Reveal, SectionDivider } from './../components/Sections';
import Banner from './../assets/images/UBC AeroDesign Homepage Banner.png';
import HomepageCTA from './../assets/images/Homepage CTA.png';
import TeamImage from './../assets/images/UBC AeroDesign 2025 Competition Team.png';
import FlyingPlane from './../assets/images/25 Adv Plane in Flight.png';
import Workspace from './../assets/images/Workspace.png';
import TeamPhoto from './../assets/images/2024 Team Photo.png';
import OurMission1 from './../assets/images/ourmission1.jpg';
import OurMission2 from './../assets/images/ourmission2.jpg';
import OurMission3 from './../assets/images/ourmission3.jpg';
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

const MISSION_SLIDES = [
    { src: OurMission1 },
    { src: OurMission2 },
    { src: OurMission3 },
];

function MissionCarousel() {
    const [current, setCurrent] = useState(0);
    const total = MISSION_SLIDES.length;
    const prev = () => setCurrent(i => (i - 1 + total) % total);
    const next = () => setCurrent(i => (i + 1) % total);

    return (
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/50">
            {MISSION_SLIDES.map((slide, i) => (
                <div
                    key={i}
                    className={clsx(
                        "absolute inset-0 transition-opacity duration-700",
                        i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                >
                    <img src={slide.src} alt="Our Mission" className="w-full h-full object-cover" />
                </div>
            ))}

            <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {MISSION_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={clsx(
                            "h-1.5 rounded-full transition-all duration-300",
                            i === current ? "bg-white w-6" : "bg-white/40 w-1.5 hover:bg-white/70"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

/* ── Home Page ─────────────────────────────── */
export default function Home() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = 'UBC AeroDesign';
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, [pathname]);

    return (
        <div className="min-h-screen bg-aero-navy">
            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[kenburns_20s_ease-out_forwards]"
                    style={{ backgroundImage: `url('${Banner}')`, backgroundPosition: '2% 35%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#06121f]/80 via-[#06121f]/50 to-[#06121f]" />
                <div className="absolute inset-0 bg-aero-mid-blue/20 mix-blend-overlay" />

                <MarginWrapper className="relative z-10 pt-32 pb-20">
                    <div className="max-w-3xl">
                        <Reveal direction="up" delay={0.1}>
                            <div className="inline-flex items-center gap-4 mb-6">
                                <span className="w-12 h-[1px] bg-aero-yellow"></span>
                                <span className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-xs">Since 1992</span>
                            </div>
                        </Reveal>

                        <Reveal direction="up" delay={0.2}>
                            <h1 className="font-titillium font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8 text-glow">
                                FLY. <br className="hidden md:block" />
                                LEARN. <br className="hidden md:block" />
                                COMPETE.
                            </h1>
                        </Reveal>

                        <Reveal direction="up" delay={0.3}>
                            <p className="font-lato text-lg md:text-xl text-white/70 max-w-xl mb-12 leading-relaxed">
                                Engineering tomorrow's aircraft at the University of British Columbia. We build advanced radio-controlled aircraft and autonomous drones.
                            </p>
                        </Reveal>

                        <Reveal direction="up" delay={0.4}>
                            <div className="flex flex-wrap gap-6">
                                <Button destination="/team" value="Join The Team" variant="primary" />
                                <Button destination="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" target="_blank" value="Support Us" variant="outline" />
                            </div>
                        </Reveal>
                    </div>
                </MarginWrapper>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
                    <span className="font-lato text-xs tracking-widest uppercase text-white">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
                </div>
            </section>

            {/* ═══════════════ MISSION ═══════════════ */}
            <Section className="relative z-20 -mt-10 overflow-hidden">
                <MarginWrapper className="relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                        {/* Left — Image Carousel */}
                        <Reveal direction="left" className="lg:w-1/2 w-full">
                            <MissionCarousel />
                        </Reveal>

                        {/* Right — Heading + Mission Items */}
                        <div className="lg:w-1/2 flex flex-col">
                            <Reveal direction="right">
                                <p className="font-lato font-bold text-aero-yellow tracking-[0.2em] uppercase text-sm mb-4 flex items-center gap-4">
                                    <span className="w-8 h-[1px] bg-aero-yellow" /> What Drives Us
                                </p>
                                <h2 className="font-titillium font-bold text-5xl md:text-6xl text-white leading-tight mb-6">
                                    OUR MISSION
                                </h2>
                            </Reveal>

                            <Reveal delay={0.1}>
                                <div className="group py-6 border-b border-white/10 flex gap-5 items-start">
                                    <span className="font-titillium font-bold text-aero-light-blue text-lg mt-0.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">01</span>
                                    <div>
                                        <h3 className="font-titillium font-bold text-xl text-white tracking-wide mb-1.5 group-hover:text-aero-light-blue transition-colors">FLY</h3>
                                        <p className="font-lato text-white/55 leading-relaxed">
                                            Flight is our forefront. We engineer, build, and fly aircraft and avionics yearly, capturing the essence of aerospace innovation.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <div className="group py-6 border-b border-white/10 flex gap-5 items-start">
                                    <span className="font-titillium font-bold text-aero-light-blue text-lg mt-0.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">02</span>
                                    <div>
                                        <h3 className="font-titillium font-bold text-xl text-white tracking-wide mb-1.5 group-hover:text-aero-light-blue transition-colors">LEARN</h3>
                                        <p className="font-lato text-white/55 leading-relaxed">
                                            Education is our bedrock. We're a resource, fostering learning opportunities across diverse engineering fields.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.3}>
                                <div className="group py-6 flex gap-5 items-start">
                                    <span className="font-titillium font-bold text-aero-yellow text-lg mt-0.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">03</span>
                                    <div>
                                        <h3 className="font-titillium font-bold text-xl text-white tracking-wide mb-1.5 group-hover:text-aero-light-blue transition-colors">COMPETE</h3>
                                        <p className="font-lato text-white/55 leading-relaxed">
                                            Competition propels us. We strive for top honors at the SAE Aero Design competition, igniting triumphs across our team.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                        </div>
                    </div>
                </MarginWrapper>
            </Section>

            <SectionDivider />

            {/* ═══════════════ TEAM IMAGE ═══════════════ */}
            <Section>
                <MarginWrapper>
                    <Reveal className="relative group rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-aero-mid-blue mix-blend-overlay opacity-20 group-hover:opacity-0 transition-opacity duration-700 z-10" />
                        <img
                            src={TeamImage}
                            alt="UBC AeroDesign 2025 Competition Team"
                            className="w-full h-[500px] object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#06121f] to-transparent z-20">
                            <p className="font-titillium font-bold text-2xl text-white">2025 Competition Team</p>
                        </div>
                    </Reveal>
                </MarginWrapper>
            </Section>




{/* ═══════════════ SPONSORS ═══════════════ */}
            <section className="bg-white py-10 overflow-hidden">
                <p className="font-lato font-bold text-aero-navy/50 tracking-[0.25em] uppercase text-xs mb-8 text-center">
                    Our Partners
                </p>
                <div className="overflow-hidden">
                    <div className="animate-marquee flex items-center gap-16" style={{ width: 'max-content' }}>
                        {[...SPONSOR_LOGOS, ...SPONSOR_LOGOS].map((logo, i) => (
                            <img
                                key={i}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA ═══════════════ */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed opacity-75"
                    style={{ backgroundImage: `url('${HomepageCTA}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06121f] via-[#06121f]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#06121f] via-transparent to-[#06121f]" />

                <div className="relative z-10 text-center px-6">
                    <Reveal direction="up">
                        <h2 className="font-titillium font-bold text-5xl md:text-7xl text-white mb-8 text-glow">READY TO TAKE FLIGHT?</h2>
                        <Button destination="/team" value="APPLY NOW" variant="yellow" className="text-lg px-12 py-4" />
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
