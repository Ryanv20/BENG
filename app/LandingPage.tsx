// app/page.tsx
import Link from "next/link";
import Header from "./components/Header"
import AboutUsSection from "./components/AboutUs";
import Team from "./components/Team"
import ContactUs from "./components/ContactUs";
import FooterSection from "./components/Footer";
import Music from "./components/Music";
export default function LandingPage() {
  return (
   <>
   <div className="flex-1 flex-col">
    <Header/>
    <AboutUsSection/>
    <Team/>
    {/* <Music/> */}
    <ContactUs/>
    <FooterSection/>
   </div>
   </>
  );
}