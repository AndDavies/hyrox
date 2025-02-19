// app/page.tsx

import { Metadata } from "next"
import Link from 'next/link';
import { createClient } from "@supabase/supabase-js"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Footer from "./components/Footer";
import FAQSection from "./components/FAQSection";


// Client components for training plans and featured gyms
import TrainingDirectoryClient from "./components/GymsTrainingClient"
import TrainingPlansClient from "./components/training-plans-client"

export const dynamic = "force-dynamic" // Optional if you want to ensure SSR

export const metadata: Metadata = {
  title: "Find Your Perfect Hyrox Training Plan | Hyrox Directory",
  description:
    "Explore top-rated Hyrox training plans, discover local gyms, and get the best from the world of Hyrox fitness.",
}

export default async function HomePage() {
  // 1) Create Supabase client (server-side)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 2) Fetch training plans
  const { data: plans, error: plansError } = await supabase
    .from("training_plans")
    .select("id,slug,title,main_image_url,description,price_text")
    .order("title")

  if (!plans || plansError) {
    return <div>Failed to load training plans.</div>
  }

  // 3) Fetch a limited set of gyms (e.g., 20) for homepage
  //    You can choose to .order(...) by store or created_at, or even do random
  const { data: featuredGyms, error: gymsError } = await supabase
  .from("gyms")
  .select("id, store, address, thumb, city, country, slug") // Include slug here
  .order("store")
  .limit(20);

if (gymsError) {
  console.error("Featured Gyms fetch error:", gymsError);
}


  // 4) Build city/country options from the *featured* gyms (optional)
  const uniqueCities = new Set<string>()
  const uniqueCountries = new Set<string>()
  featuredGyms?.forEach((gym) => {
    if (gym.city) uniqueCities.add(gym.city)
    if (gym.country) uniqueCountries.add(gym.country)
  })
  const cityOptions = Array.from(uniqueCities).sort()
  const countryOptions = Array.from(uniqueCountries).sort()

  return (
    <main className="min-h-screen font-sans text-base bg-stone-100 text-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hyrox_hero_background.jpeg')",
          }}
        />
          {/* Overlay with slightly lower opacity */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 py-12 text-center">
            <h1 className="
              text-5xl 
              sm:text-6xl 
              md:text-7xl 
              font-extrabold 
              leading-tight 
              tracking-tight 
              drop-shadow-lg 
              mb-4
            ">
              Find Your Perfect Hyrox Training Plan
            </h1>

            <p className="max-w-2xl mx-auto mb-8 text-lg sm:text-xl md:text-2xl font-medium leading-snug">
              We’ve reviewed 40+ Hyrox workout programs so you don’t have to. 
              Save hours of research and choose the right plan for you.
            </p>

            {/* Mailing List Form (shadcn/ui Input & Button) */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Input
                type="email"
                placeholder="you@example.com"
                className="w-full sm:w-auto sm:min-w-[280px]"
              />
              <Button
                className="bg-green-300 text-black hover:bg-green-200 transition font-semibold"
              >
                Subscribe →
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link href="/your-path" passHref>
                <Button variant="secondary">Ghost</Button>
              </Link>
              <a
                href="#gyms"
                className="px-5 py-2 rounded-full bg-pink-400 text-black font-bold hover:bg-pink-300 transition"
              >
                Gyms
              </a>
              <a
                href="#training-programs"
                className="px-5 py-2 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition"
              >
                Training Programs
              </a>
              <a
                href="#events"
                className="px-5 py-2 rounded-full bg-blue-800 text-white font-bold hover:bg-blue-700 transition"
              >
                Events
              </a>
              <a
                href="#blog"
                className="px-5 py-2 rounded-full bg-green-300 text-black font-bold hover:bg-green-200 transition"
              >
                Blog
              </a>
            </div>
          </div>
        </section>

      {/* Training Plans Section */}
      <section
        id="training-programs"
        className="px-6 py-12 md:px-12 md:py-16 "
      >
        <TrainingPlansClient allPlans={plans ?? []} />
      </section>

      {/* Featured Gyms Section */}
      <section
        id="gyms"
        className=" "
      >

        {/*
          Render a smaller subset of gyms (20 max).
          We'll still pass them to your existing "GymsTrainingClient" 
          if you want to reuse that UI. Or you can build a simpler display.
        */}

        <TrainingDirectoryClient
          allGyms={featuredGyms ?? []}
          cityOptions={cityOptions}
          countryOptions={countryOptions}
        />

        {/* Link to Explore All Gyms */}
        <div className="text-center mt-8 p-6">
          <a
            href="/gyms" 
            className="font-semibold text-blue-500 hover:text-blue-700 underline"
          >
            Explore all gyms around the world →
          </a>
        </div>
      </section>
      <section id="FAQ">
          <FAQSection />
      </section>
      <section id="footer">
          <Footer />
      </section>
    </main>
  )
}