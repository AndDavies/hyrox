// app/gyms/page.tsx
import { Metadata } from 'next'
import ClientSideAutocomplete from '../components/ClientSideAutocomplete'

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
    <main className="min-h-screen text-white bg-black px-4 py-8">
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