import AboutSubNav from "./AboutSubNav";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AboutSubNav />
      {children}
    </>
  );
}
