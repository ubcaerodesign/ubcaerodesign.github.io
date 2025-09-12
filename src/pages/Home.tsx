import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PillButton, SolidButton } from "./../components/Buttons";
import { MarginWrapper, Section, SectionDivider, SideBySideSection } from "./../components/Sections";
import Banner from "./../assets/images/UBC AeroDesign Homepage Banner.png";
import HomepageCTA from "./../assets/images/Homepage CTA.png";
import TeamImage from "./../assets/images/UBC AeroDesign 2025 Competition Team.png"
import FlyIcon from "./../assets/icons/Fly Icon.svg"
import LearnIcon from "./../assets/icons/Learn Icon.svg"
import TrophyIcon from "./../assets/icons/Trophy Icon.svg"

interface MissionStatementProps {
  icon?: string;
  title: string;
  text: string;
}

export function MissionStatement({title, icon, text}: MissionStatementProps) {
  return (
    <div className="w-full flex flex-row">
      {icon && (<img src={icon} alt={title} className="mr-5"></img>)}
      <div className="w-full flex flex-col py-5">
        <h3 className="font-bold text-xl/5 text-aero-mid-blue">{title}</h3>
        <p className="text-base/5 text-aero-dark-blue">{text}</p>
      </div>
    </div>
  );
}

interface WhyAeroProps {
  title: string;
  text: string;
}

export function WhyAero({title, text}: WhyAeroProps) {
  return (
    <div className="max-w-[325px] min-w-[250px] flex flex-1 flex-col gap-5 px-5 py-2.5 border-[1.75px] border-aero-light-blue">
      <div className="relative flex items-center min-h-[90px] min-w-[160px] bottom-10 ml-auto mr-auto -mb-12 px-5 py-2.5 bg-aero-light-blue">
        <h3 className="w-full font-bold text-xl/5 text-aero-mid-blue text-center">{title}</h3>
      </div>

      <p className="text-base/5 text-aero-dark-blue">{text}</p>
    </div>
  );
}

interface MemberReviewProps {
  name: string;
  years: string;
  program: string;
  text: string;
}

export function MemberReview({name, years, program, text}: MemberReviewProps) {
  return (
    <div className="w-full max-w-[700px] flex flex-col gap-2 mx-auto p-10 bg-aero-light-blue">
      <div className="w-full flex flex-col">
        <h3 className="w-full font-bold text-xl/5 text-aero-dark-blue">{name}</h3>
        <h4 className="w-full font-bold text-sm/5 text-aero-mid-blue">{years}</h4>
        <h4 className="w-full font-bold text-sm/5 text-aero-mid-blue">{program}</h4>
      </div>
      <p className="w-full text-base/5 text-aero-dark-blue">&quot;{text}&quot;</p>
    </div>
  );
}

export default function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "UBC AeroDesign";
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
      {/* Homepage Banner */}
      <div className="w-full h-[100svh] max-h-[110vh] 
                      flex items-center
                      -mt-22
                      bg-cover bg-no-repeat bg-[position:26%_50%]" 
      style={bgStyle(Banner)} // Needs Improvement
      >
        <MarginWrapper>
          <div className="w-full flex flex-col">
            <h1 className="my-5 font-titillium font-bold text-6xl/11 text-aero-dark-blue">FLY. LEARN. COMPETE.</h1>
            <div className="w-full flex flex-wrap gap-5 my-2">
              <SolidButton destination="/recruitment" value="JOIN US" color="bg-aero-mid-blue"/>
              <PillButton destination="https://donate.give.ubc.ca/page/80953/donate/1?transaction.dirgift=UBC+AeroDesign%20O112" target="_blank" value="SUPPORT US" color="border-aero-mid-blue text-aero-mid-blue"/>
            </div>
          </div>
        </MarginWrapper>
      </div>

      <MarginWrapper>
        <Section>
          <SideBySideSection title="OUR MISSION" image={TeamImage}>
            <MissionStatement icon={FlyIcon} title="FLY" text="Flight is our forefront. We engineer, build, and fly aircraft and avionics yearly, capturing the essence of aerospace innovation."/>
            <MissionStatement icon={LearnIcon} title="LEARN" text="Education is our bedrock. We're a resource, fostering learning opportunities across diverse engineering fields."/>
            <MissionStatement icon={TrophyIcon} title="COMPETE" text="Competition propels us. We strive for top honors, igniting triumphs across our team."/>
          </SideBySideSection>

          <div className="w-full flex justify-center items-center">
            <PillButton destination="/about" value="ABOUT US" color="border-aero-mid-blue text-aero-mid-blue"/>
          </div>
        </Section>

        <SectionDivider/>

        <Section>
          <h2 className="font-titillium font-bold text-4xl/9 text-aero-dark-blue text-center">WHY JOIN US</h2>
          
          <div className="w-full flex flex-wrap gap-x-5 gap-y-10 my-10 justify-center">
            <WhyAero title="YEARLY DESIGN CYCLE" text="Each year, we create two entirely new aircraft, building upon past experiences and testing new ideas. These yearly design cycles are crucial, providing new members with the chance to gain hands-on experience throughout the entire engineering design process." />
            <WhyAero title="EVERYONE CONTRIBUTES TO THE FINAL DESIGN" text="New members are recruited on a project-based basis. Everyone joining the team can expect to be assigned anything from broader design work to specific system development from the get-go. The final aircraft is a product of every single member’s efforts." />
            <WhyAero title="YEARLY DESIGN CYCLE" text="We take pride in fostering a fun and supportive team dynamic. Our roster is packed with internal and external team events and activities designed to help members connect." />
          </div>
        </Section>
        
        <SectionDivider/>

        <Section>
          <MemberReview name="SHAWN" years="2018-2021" program="INTEGRATED ENGINEERING '21" text="My advice for students interested in joining the team? Keep being involved, try to learn whenever the opportunity arrives, and as always, have fun with what you're doing. Regardless of the sub team you join, you will be meeting a bunch of wonderful people, who will make it feel like you've been a part of this team for years. But as I mentioned earlier, you have to do your part! You will be learning on the go, whether it is preliminary design, or when it comes to finally constructing the plane. Do your best, and the good things will come to you in the end!" />
        </Section>
      </MarginWrapper>

      {/* Homepage CTA */}
      <div className="w-full h-[100svh] max-h-[100vh] 
                      flex items-center
                      bg-fixed bg-cover bg-center" 
      style={bgStyle(HomepageCTA)} // Needs Improvement
      >
        <MarginWrapper>
          <div className="w-full flex flex-col justify-center">
            <h1 className="my-5 font-titillium font-bold text-6xl/11 text-center text-white">READY TO TAKE FLIGHT?</h1>
            <div className="w-full flex my-2 justify-center">
              <PillButton destination="/recruitment" value="JOIN US" color="border-aero-yellow text-aero-yellow"/>
            </div>
          </div>
        </MarginWrapper>
      </div>
    </div>
  );
}
