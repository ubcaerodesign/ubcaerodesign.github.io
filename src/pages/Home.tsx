import { PillButton, SolidButton } from "./../components/Buttons";
import { MarginWrapper, MissionIcon, Section, SideBySideSection } from "./../components/Sections";
import Banner from "./../assets/images/UBC AeroDesign Homepage Banner.png";
import TeamImage from "./../assets/images/UBC AeroDesign 2025 Competition Team.png"
import PlaneIcon from "./../assets/images/Plane Icon.svg"
import LearnIcon from "./../assets/images/Learn Icon.svg"
import TrophyIcon from "./../assets/images/Trophy Icon.svg"

export default function Home() {
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${Banner})`,
  };

  return (
    <section>

      {/* Homepage CTA */}
      <div className="w-full h-[100svh] max-h-[110vh] -mt-22
                      bg-cover bg-no-repeat bg-[position:26%_50%]
                      flex items-center" 
      style={bgStyle}
      >
        <MarginWrapper>
          <div className="w-full flex flex-col">
            <h1 className="my-5 font-titillium font-bold text-6xl/11 text-aero-dark-blue">FLY. LEARN. COMPETE.</h1>
            <div className="w-full flex flex-row gap-5 my-2">
              <SolidButton destination="/recruitment" value="JOIN US" color="bg-aero-mid-blue"/>
              <PillButton external="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" value="SUPPORT US" color="border-aero-mid-blue text-aero-mid-blue"/>
            </div>
          </div>
        </MarginWrapper>
      </div>

      <MarginWrapper>
        <Section>
          <SideBySideSection title="OUR MISSION" image={TeamImage}>
            <MissionIcon image={PlaneIcon} title="FLY" text="Flight is our forefront. We engineer, build, and fly aircraft and avionics yearly, capturing the essence of aerospace innovation."/>
            <MissionIcon image={LearnIcon} title="LEARN" text="Education is our bedrock. We're a resource, fostering learning opportunities across diverse engineering fields."/>
            <MissionIcon image={TrophyIcon} title="COMPETE" text="Competition propels us. We strive for top honors, igniting triumphs across our team."/>
          </SideBySideSection>

          <div className="w-full flex justify-center items-center">
            <PillButton destination="/about" value="ABOUT US" color="border-aero-mid-blue text-aero-mid-blue"/>
          </div>
        </Section>
      </MarginWrapper>
    </section>
  );
}
