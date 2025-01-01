// app/gyms/page.tsx
import { Metadata } from 'next'
import ClientSideAutocomplete from '../components/ClientSideAutocomplete'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

// This is a server component
export const metadata: Metadata = {
  title: 'Find Gyms | Hyrox Directory',
  description: 'Discover the best Hyrox gyms around the world. Search by location.',
}

export default async function GymsPage() {
  // If you want a pre-rendered popular gyms list:
  // const { data: popularGyms } = await supabase
  //   .from("gyms")
  //   .select("id, store, city")
  //   .limit(10)

  return (
    <main className="min-h-screen font-sans text-base bg-stone-100 text-white">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hyrox_trainging_center_hero_background.png')",
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
        {/* Hero section ends */}

      <h1 className="text-4xl font-extrabold mb-6">Find a Gym</h1>
      <p className="mb-4 max-w-xl">
        Easily discover your nearest Hyrox-friendly gyms. Start typing to see suggestions:
      </p>

      {/* Client-Side Autocomplete Component */}
      {/* pass in popularGyms or other SSR data if you'd like */}
      <ClientSideAutocomplete />

    </main>
  )
}