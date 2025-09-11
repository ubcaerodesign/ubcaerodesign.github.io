import { PillButton, SolidButton } from "./../components/Buttons";
import { MarginWrapper, Section, SideBySideSection } from "./../components/Sections";
import Banner from "./../assets/images/UBC AeroDesign Homepage Banner.png";
import TeamImage from "./../assets/images/UBC AeroDesign 2025 Competition Team.png"
import FlyIcon from "./../assets/icons/Fly Icon.svg"
import LearnIcon from "./../assets/icons/Learn Icon.svg"
import TrophyIcon from "./../assets/icons/Trophy Icon.svg"

interface MissionIconProps {
  image: string;
  title: string;
  text: string;
}

export function MissionIcon({title, image, text}: MissionIconProps) {
  return (
    <div className="w-full flex flex-row">
      <img src={image} alt={title}></img>
      <div className="w-full flex flex-col p-5">
        <h3 className="font-bold text-xl/5 text-aero-mid-blue">{title}</h3>
        <p className="text-base/5 text-aero-dark-blue">{text}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${Banner})`,
  };

  return (
    <section>

      {/* Homepage CTA */}
      <div className="w-full h-[100svh] max-h-[110vh] 
                      flex items-center
                      -mt-22
                      bg-cover bg-no-repeat bg-[position:26%_50%]" 
      style={bgStyle}
      >
        <MarginWrapper>
          <div className="w-full flex flex-col">
            <h1 className="my-5 font-titillium font-bold text-6xl/11 text-aero-dark-blue">FLY. LEARN. COMPETE.</h1>
            <div className="w-full flex flex-row gap-5 my-2">
              <SolidButton destination="/recruitment" value="JOIN US" color="bg-aero-mid-blue"/>
              <PillButton destination="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" target="_blank" value="SUPPORT US" color="border-aero-mid-blue text-aero-mid-blue"/>
            </div>
          </div>
        </MarginWrapper>
      </div>

      <MarginWrapper>
        <Section>
          <SideBySideSection title="OUR MISSION" image={TeamImage}>
            <MissionIcon image={FlyIcon} title="FLY" text="Flight is our forefront. We engineer, build, and fly aircraft and avionics yearly, capturing the essence of aerospace innovation."/>
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
