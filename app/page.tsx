// app/page.tsxsss

import { Metadata } from "next"
import { createClient } from "@supabase/supabase-js"

// shadcn/ui components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Your existing components
import TrainingDirectoryClient from "./components/GymsTrainingClient"
import TrainingPlansClient from "./components/training-plans-client"

// Force dynamic so that Next doesn't attempt static generation
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Find Your Perfect Hyrox Training Plan | Hyrox Directory",
  description:
    "Explore top-rated Hyrox training plans, discover local gyms, and get the best from the world of Hyrox fitness.",
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const pageSize = 20
  const currentPage = parseInt(searchParams?.page ?? "1", 10)
  const from = (currentPage - 1) * pageSize
  const to = from + pageSize - 1

  // 2) Supabase client (service key for server-side usage)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 3) Fetch training plans
  const { data: plans, error: plansError } = await supabase
    .from("training_plans")
    .select("id,slug,title,main_image_url,description,price_text")
    .order("title")

  if (!plans || plansError) {
    return <div>Failed to load planss</div>
  }

  // 4) Fetch gyms + total count
  const { data: gyms, error: gymsError } = await supabase
    .from("gyms")
    .select("id, store, address, thumb, city, country", { count: "exact" })
    .range(from, to)
    .order("store")

  if (gymsError) {
    console.error("Gyms fetch error:", gymsError)
  }

  // 5) Collect city/country options
  const uniqueCities = new Set<string>()
  const uniqueCountries = new Set<string>()
  gyms?.forEach((gym) => {
    if (gym.city) uniqueCities.add(gym.city)
    if (gym.country) uniqueCountries.add(gym.country)
  })
  const cityOptions = Array.from(uniqueCities).sort()
  const countryOptions = Array.from(uniqueCountries).sort()


  return (
    <main className="min-h-screen font-sans text-base bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
  {/* Background image + overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
    style={{
      backgroundImage: `bg-[url('/hyrox_hero_background.jpg)]`
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-400 to-cyan-500 opacity-60" />

  {/* Hero Content */}
  <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 py-16 text-center">
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm mb-4">
      Find Your Perfect Hyrox Training Plan
    </h1>
    <p className="max-w-2xl mx-auto mb-8 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
      We’ve reviewed 40+ Hyrox workout programs so you don’t have to. Save
      hours of research and choose the right plan for you.
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
        className="px-6 py-12 md:px-12 md:py-16 bg-gradient-to-r from-black via-blue-800 to-black"
      >
        <TrainingPlansClient allPlans={plans ?? []} />
      </section>

      {/* Gyms Section */}
      <section
        id="gyms"
        className="px-6 py-12 md:px-12 md:py-16 bg-black"
      >
        <TrainingDirectoryClient
          allGyms={gyms ?? []}
          cityOptions={cityOptions}
          countryOptions={countryOptions}
        />
      </section>
    </main>
  )
}