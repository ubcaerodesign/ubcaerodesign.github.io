import { useEffect } from 'react';
import { MarginWrapper, Section, SectionDivider, SideBySideSection } from './../components/Sections';
import { MissionStatement } from './Home';
import FlyingPlane from "./../assets/images/25 Adv Plane in Flight.png";
import Workspace from "./../assets/images/Workspace.png";
import TeamPhoto from "./../assets/images/2024 Team Photo.png";
import TeamBreakdown from "./../assets/images/Team Breakdown.svg";

export default function About() {
  useEffect(() => {
    document.title = "About";
  }, []);

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
      style={bgStyle(TeamPhoto)} // Needs Improvement
      >
      </div>

      <SectionDivider/>

      <MarginWrapper>
        <Section>
          <h2 className="w-full font-titillium font-bold text-4xl/9 text-aero-dark-blue text-center">TEAM STRUCTURE</h2>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-wrap gap-5 justify-center items-center">
              <h3 className="w-full flex-1 font-bold text-xl/5 text-aero-mid-blue text-center">7 Technical Subteams</h3>
              <h3 className="w-full flex-1 font-bold text-xl/5 text-aero-mid-blue text-center">3 Divisions</h3>
              <h3 className="w-full flex-1 font-bold text-xl/5 text-aero-mid-blue text-center">7 Administrative Subteams</h3>
            </div>
            <div className="w-full flex justify-center items-center">
              <img src={TeamBreakdown} alt="Team Breakdown" className="w-full max-w-[1000px] box-border object-cover" />
            </div>
          </div>
        </Section>

        <SectionDivider/>

        
      </MarginWrapper>
    </div>
  );
}
