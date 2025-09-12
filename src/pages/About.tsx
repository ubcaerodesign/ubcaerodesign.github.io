import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MarginWrapper, Section, SectionDivider, SideBySideSection } from './../components/Sections';
import { MissionStatement } from './Home';
import { PillButton } from './../components/Buttons';
import FlyingPlane from "./../assets/images/25 Adv Plane in Flight.png";
import Workspace from "./../assets/images/Workspace.png";
import TeamPhoto from "./../assets/images/2024 Team Photo.png";
import TeamBreakdown from "./../assets/images/Team Breakdown.svg";
import AboutCTA from "./../assets/images/About CTA.jpeg";


export default function About() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "About";
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [pathname]);

  const bgStyle = (image: string): React.CSSProperties => ({ // Needs Improvement
    backgroundImage: `url(${image})`,
  });

  return (
    <div>
      <MarginWrapper>
        <SectionDivider />

        <Section>
          <SideBySideSection title="OUR MISSION" image={FlyingPlane}>
            <MissionStatement title="FLY" text="Engineer airworthy aircrafts and avionics every single year." />
            <MissionStatement title="LEARN" text="Be an educational asset to our community and our members." />
            <MissionStatement title="COMPETE" text="Be an educational asset to our community and our members." />
          </SideBySideSection>
        </Section>

        <SectionDivider />

        <Section>
          <SideBySideSection title="OUR HISTORY" image={Workspace} reversed={true}>
            <div className="w-full flex flex-col py-5">
              <p className="text-base/5 text-aero-dark-blue">UBC AeroDesign (formerly known as UBC Heavy Lift) was founded in 1992 by a group of engineering students. Every year, the team upholds the tradition of designing and building radio-controlled, fixed-wing, electrical-powered aircraft to attend the collegiate competition organized by the Society of Automotive Engineers (SAE). The SAE Aero Design Series competition challenges university students from around the world to design and build an aircraft with the purpose of fulfilling a variety of mission profiles.</p>
            </div>
          </SideBySideSection>
        </Section>

      </MarginWrapper>

      <SectionDivider />
    
      <div className="w-full min-h-[450px]
                      flex items-center
                      bg-cover bg-no-repeat bg-[position:50%_50%]" 
      style={bgStyle(TeamPhoto)} 
      >
      </div>

      <SectionDivider/>

      <MarginWrapper>
        <Section>
          <h2 className="w-full font-titillium font-bold text-4xl/9 text-aero-dark-blue text-center">TEAM STRUCTURE</h2>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-wrap gap-5 justify-center">
              <div className="w-full min-w-[250px] flex flex-1 flex-col justify-center items-center gap-5 p-5 border-2 border-aero-light-blue rounded-[10px]">
                <h3 className="font-bold text-2xl/5 text-aero-mid-blue text-center">3 Divisions</h3>
              </div>
              <div className="w-full min-w-[250px] flex flex-1 flex-col justify-center items-center gap-5 p-5 border-2 border-aero-light-blue rounded-[10px]">
                <h3 className="font-bold text-xl/5 text-aero-mid-blue text-center">7 Technical Subteams</h3>
                <PillButton destination="https://docs.google.com/document/d/1FUBzxTxm-hyBCDLBDqJbq7Z5sG9JoTbtcljWGG7ZKJ0/edit?tab=t.0#heading=h.ga3vjcy76juv" target="_blank" value="TECHNICAL ROLES" color="border-aero-mid-blue text-aero-mid-blue"/>
              </div>
              <div className="w-full min-w-[250px] flex flex-1 flex-col justify-center items-center gap-5 p-5 border-2 border-aero-light-blue rounded-[10px]">
                <h3 className="font-bold text-xl/5 text-aero-mid-blue text-center">7 Administrative Subteams</h3>
                <PillButton destination="https://docs.google.com/document/d/11nuN9A19SKlHK72HhKCBtdl82eV85YTqr5dZ9A6U-kU/edit?tab=t.0#heading=h.gjdgxs" target="_blank" value="ADMINISTRATIVE ROLES" color="border-aero-mid-blue text-aero-mid-blue"/>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <img src={TeamBreakdown} alt="Team Breakdown" className="w-full max-w-[1000px] box-border object-cover" />
            </div>
          </div>
        </Section>

      </MarginWrapper>

      <SectionDivider/>

      <div className="w-full h-[50svh] 
                      flex items-center
                      lg:bg-fixed bg-cover bg-center" 
      style={bgStyle(AboutCTA)}
      >
        <MarginWrapper>
          <div className="w-full flex flex-col justify-center">
            <h1 className="my-5 font-titillium font-bold text-6xl/11 text-center text-white">READY TO JOIN?</h1>
            <div className="w-full flex my-2 justify-center">
              <PillButton destination="/recruitment" value="JOIN US" color="border-aero-yellow text-aero-yellow"/>
            </div>
          </div>
        </MarginWrapper>
      </div>
    </div>
  );
}
