import { Link } from 'react-router-dom';
import WhiteLogo from './../assets/images/UBC AeroDesign 2023 Logo_White Horizontal.svg';
import InstagramIcon from './../assets/icons/Instagram.svg';
import FacebookIcon from './../assets/icons/Facebook.svg';
import LinkedinIcon from './../assets/icons/Linkedin.svg';
import DiscordIcon from './../assets/icons/Discord.svg';

interface FooterLinkProps {
  destination: string;
  value: string;
}

function FooterLink({ destination, value }: FooterLinkProps) {
  return (
    <Link to={destination} className="block font-urbanist text-sm text-white/50 hover:text-white transition-colors duration-300 py-1.5">
      {value}
    </Link>
  );
}

interface FooterColumnProps {
  title: string;
  children?: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-poppins font-semibold text-white tracking-[0.15em] uppercase text-sm mb-4">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#030a11] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aero-mid-blue/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img src={WhiteLogo} alt="UBC AeroDesign" className="w-[180px] mb-6 opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="font-urbanist text-sm text-white/50 leading-relaxed max-w-sm mb-8">
              Engineering the future of flight. UBC AeroDesign builds remotely-piloted aircrafts, autonomous drones, and AI-powered systems.
            </p>
            
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ubcaerodesign/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                <img src={InstagramIcon} alt="Instagram" className="w-4 h-4 opacity-70 group-hover:opacity-100 invert" />
              </a>
              <a href="https://www.facebook.com/UBCAeroDesign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                <img src={FacebookIcon} alt="Facebook" className="w-4 h-4 opacity-70 group-hover:opacity-100 invert" />
              </a>
              <a href="https://ca.linkedin.com/company/ubc-aerodesign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                <img src={LinkedinIcon} alt="LinkedIn" className="w-4 h-4 opacity-70 group-hover:opacity-100 invert" />
              </a>
              <a href="https://discord.gg/xHN3UyRyVh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                <img src={DiscordIcon} alt="Discord" className="w-4 h-4 opacity-70 group-hover:opacity-100 invert" />
              </a>
            </div>
          </div>

          {/* Links */}
          <FooterColumn title="About">
            <FooterLink destination="/about#mission" value="Our Mission" />
            <FooterLink destination="/about#history" value="History" />
            <FooterLink destination="/about#structure" value="Team Structure" />
          </FooterColumn>

          <FooterColumn title="What We Do">
            <FooterLink destination="/what-we-do#competition" value="Competition" />
            <FooterLink destination="/what-we-do#rules" value="2026 Rules" />
            <FooterLink destination="/what-we-do#learning-endeavors" value="Learning Endeavors" />
          </FooterColumn>

          <FooterColumn title="Team">
            <FooterLink destination="/team#why-aerodesign" value="Why AeroDesign" />
            <FooterLink destination="/team#process" value="Process" />
            <FooterLink destination="/team#timeline" value="Timeline" />
            <FooterLink destination="/team#faq" value="FAQ" />
          </FooterColumn>

          <FooterColumn title="More">
            <FooterLink destination="/sponsor" value="Sponsor Us" />
            <FooterLink destination="/projects" value="Projects" />
          </FooterColumn>

        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-urbanist text-xs text-white/30">
            © {new Date().getFullYear()} UBC AeroDesign. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="font-urbanist text-xs text-white/30 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="font-urbanist text-xs text-white/30 hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}