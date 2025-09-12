interface MarginWrapperProps {
  children?: React.ReactNode;
}

export function MarginWrapper({children}: MarginWrapperProps) {
  return (
    <div className="w-full max-w-[1200px] ml-auto mr-auto px-11.25 py-2.5 font-lato font-normal">
      {children}
    </div>
  );
}

interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  return (
    <div className="w-full flex flex-col m-10">
      {children}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="h-[150px]"></div>
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
