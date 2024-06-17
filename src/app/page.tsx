import Courses from "@/components/Courses";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TestimonialCards from "@/components/TestimonialCards";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import ScrollSection from "@/components/ui/ScrollSection";
import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased">
      <div className="flex items-center justify-center relative w-full">
          <Navbar token = {token}/>
        </div>
        <HeroSection/>
        <Courses/>
        <ScrollSection/>
        <TestimonialCards/>
        <UpcomingWebinars/>
    </main>
  );
}
