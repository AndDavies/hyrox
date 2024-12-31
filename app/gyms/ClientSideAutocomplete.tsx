// app/gyms/ClientSideAutocomplete.tsx
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "../hooks/useDebounce"

interface Gym {
  id: string
  store: string
  city?: string
  country?: string
}

export default function ClientSideAutocomplete() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Gym[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // optional debounced query
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/gyms?q=${encodeURIComponent(debouncedQuery)}`)
        const json = await res.json()
        setResults(json.data || [])
      } catch (error) {
        console.error("Fetch error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [debouncedQuery])

  return (
    <div className="relative max-w-md">
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a city or gym name..."
        className="bg-white text-black"
      />

      {isLoading && <p className="text-sm mt-2 text-gray-400">Loading...</p>}

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white text-black shadow-lg mt-1 rounded-md">
          {results.map((gym) => (
            <div key={gym.id} className="p-2 hover:bg-gray-100">
              <p className="font-semibold">{gym.store}</p>
              <p className="text-sm text-gray-600">
                {[gym.city, gym.country].filter(Boolean).join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}