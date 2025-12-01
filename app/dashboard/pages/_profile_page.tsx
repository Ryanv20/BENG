// app/dashboard/pages/profile.tsx
"use client";
import ProfileCard from "./components/ProfileCard";
import TemplatesComponent from "./components/TemplatesComponent";
import ShortDescription from "./components/ShortDesc";
import Technologies from "./components/Technologies";
import GitHubLink from "./components/GitHubLink";
import ContributionGuidelines from "./components/ContributionGuidelines";

export default function ProfilePage() {
  return (
  <>
  <div className="flex-1 flex flex-col gap-10">
  <ProfileCard/>
  <ShortDescription/>
  <Technologies/>
  <GitHubLink/>
  <ContributionGuidelines/>
  </div>
  </>
  );  
}
