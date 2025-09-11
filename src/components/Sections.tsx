interface MarginWrapperProps {
  children?: React.ReactNode;
}

export function MarginWrapper({children}: MarginWrapperProps) {
  return (
    <div className="w-full max-w-[1200px] ml-auto mr-auto my-10 px-11.25 py-2.5 font-lato font-normal">
      {children}
    </div>
  );
}

interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  return (
    <div className="w-full flex flex-col mb-[175px]">
      {children}
    </div>
  );
}

interface SideBySideSectionProps {
  title: string;
  image: string;
  text?: string;
  children?: React.ReactNode;
}

export function SideBySideSection({title, image, children}: SideBySideSectionProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row justify-around items-center gap-10 my-5">
      <div className="w-full max-w-[600px] flex flex-col">
        <h2 className="font-titillium font-bold text-4xl/9 text-aero-dark-blue">{title}</h2>
        {children}
      </div>
      <img src={image} alt={title} className="w-full min-w-[500px] max-w-full lg:max-w-[600px] max-h-[400px] box-border object-cover" />
    </div>
  );
} 

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