// app/page.tsx
import Link from "next/link";
import Header from "./components/Header"
import AboutUsSection from "./components/AboutUs";
import Team from "./components/Team"
import ContactUs from "./components/ContactUs";
import FooterSection from "./components/Footer";
export default function LandingPage() {
  return (
   <>
   <div className="flex-1 flex-col">
    <Header/>
    <AboutUsSection/>
    <Team/>
    <ContactUs/>
    <FooterSection/>
   </div>
   </>
  );
}
//  <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-center px-6">
//       <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 drop-shadow-md">
//         Welcome to Our Platform
//       </h1>

//       <p className="text-gray-700 max-w-lg mb-10 text-lg md:text-xl">
//         A clean, simple starting point. Login or create an account to begin your journey.
//       </p>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <Link
//           href="/auth/login"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
//         >
//           Login
//         </Link>

//         <Link
//           href="/auth/register"
//           className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
//         >
//           Register
//         </Link>
//       </div>
//     </main>