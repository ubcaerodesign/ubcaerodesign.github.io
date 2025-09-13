import clsx from "clsx";

interface MarginWrapperProps {
  children?: React.ReactNode;
}

export function MarginWrapper({children}: MarginWrapperProps) {
  return (
    <div className="w-full flex flex-col gap-5 max-w-[1200px] ml-auto mr-auto px-11.25 py-2.5 font-lato font-normal">
      {children}
    </div>
  );
}

interface SectionProps {
  children?: React.ReactNode;
}

export function Section({children}: SectionProps) {
  return (
    <div className="w-full flex flex-col my-10 gap-5">
      {children}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="w-full h-[100px]"></div>
  );
}

interface SideBySideSectionProps {
  title: string;
  image: string;
  reversed?: boolean;
  children?: React.ReactNode;
}

export function SideBySideSection({title, image, reversed = false, children}: SideBySideSectionProps) {
  return (
    <div className={clsx("w-full flex flex-col lg:flex-row justify-around items-center gap-10", reversed && "lg:flex-row-reverse")}>
      <div className="w-full max-w-[600px] flex flex-col">
        <h2 className="w-full font-titillium font-bold text-4xl/9 text-aero-dark-blue">{title}</h2>
        {children}
      </div>
      <div className="w-full flex justify-center items-center">
        <img src={image} alt={title} className="w-full min-w-[250px] max-w-[700px] min-h-[300px] max-h-[300px] box-border object-cover" />
      </div>
    </div>
  );
} 
