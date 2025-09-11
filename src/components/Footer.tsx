import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx';
import Logo from "./../assets/images/UBC AeroDesign 2023 Logo_Dark Blue Horizontal.svg";
import InstagramIcon from "./../assets/icons/Instagram.svg"
import FacebookIcon from "./../assets/icons/Facebook.svg"
import LinkedinIcon from "./../assets/icons/Linkedin.svg"
import DiscordIcon from "./../assets/icons/Discord.svg"
import { MarginWrapper } from './Sections';

interface FooterLinkProps {
  destination: string;
  value: string;
  bold?: boolean;
}

export function FooterLink({destination, value, bold = false}: FooterLinkProps) {
  return (
    <Link to={destination} className={clsx("text-center text-aero-dark-blue text-sm/4 tracking-[0.25px] whitespace-nowrap", bold && "font-bold")}>{value}</Link>
  );
}

interface FooterColumnProps {
  children?: React.ReactNode;
}

export function FooterColumn({children}: FooterColumnProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 my-3">
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <MarginWrapper>
      <div className="w-full flex flex-wrap gap-5 justify-center">
        {/* Logo & Overview */}
        <div className="flex flex-col justify-center">
          <Link to="/" className="flex justify-center">
            <img src={Logo} alt="Logo" className="w-[200px]" />
          </Link>
          <p className="text-base/5 text-aero-dark-blue w-[200px]">UBC AeroDesign engineers remotely-piloted aircrafts, autonomous drones, and AI-powered reconnaissance systems.</p>
        </div>

        <div className="flex flex-wrap gap-5 justify-center">
          {/* Home */}
          <FooterColumn>
            <FooterLink destination="/" value="HOME" bold={true}/>
          </FooterColumn>

          {/* About */}
          <FooterColumn>
            <FooterLink destination="/about" value="ABOUT" bold={true}/>
            <FooterLink destination="/about#mission" value="MISSION"/>
            <FooterLink destination="/about#history" value="HISTORY"/>
            <FooterLink destination="/about#structure" value="TEAM STRUCTURE"/>
          </FooterColumn>

          {/* What We Do */}
          <FooterColumn>
            <FooterLink destination="/what-we-do" value="WHAT WE DO" bold={true}/>
            <FooterLink destination="/what-we-do#competition" value="COMPETITION"/>
            <FooterLink destination="/what-we-do#categories" value="COMPETITION CATEGORIES"/>
            <FooterLink destination="/what-we-do#learning-endeavors" value="LEARNING ENDEAVORS"/>
          </FooterColumn>

          {/* Recruitment */}
          <FooterColumn>
            <FooterLink destination="/recruitment" value="RECRUITMENT" bold={true}/>
            <FooterLink destination="/recruitment#why-aerodesign" value="WHY AERODESIGN"/>
            <FooterLink destination="/recruitment#process" value="RECRUITMENT PROCESS"/>
            <FooterLink destination="/recruitment#timeline" value="TIMELINE"/>
            <FooterLink destination="/recruitment#faq" value="FAQ"/>
          </FooterColumn>

          {/* Sponsor */}
          <FooterColumn>
            <FooterLink destination="/sponsor" value="SPONSOR" bold={true}/>
          </FooterColumn>

          {/* Contact */}
          <FooterColumn>
            <FooterLink destination="/contact" value="CONTACT" bold={true}/>
            <div className="grid grid-cols-2 gap-4">
              <Link to="https://www.instagram.com/ubcaerodesign/" target="_blank" className="flex justify-center">
                <img src={InstagramIcon} alt="Instagram"/>
              </Link>
              <Link to="https://www.facebook.com/UBCAeroDesign" target="_blank" className="flex justify-center">
                <img src={FacebookIcon} alt="Facebook"/>
              </Link>
              <Link to="https://ca.linkedin.com/company/ubc-aerodesign" target="_blank" className="flex justify-center">
                <img src={LinkedinIcon} alt="Linkedin"/>
              </Link>
              <Link to="https://discord.gg/xHN3UyRyVh" target="_blank" className="flex justify-center">
                <img src={DiscordIcon} alt="Discord"/>
              </Link>
            </div>
          </FooterColumn>
        </div>
      </div>
    </MarginWrapper>
  );
}