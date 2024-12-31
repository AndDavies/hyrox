"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// shadcn/ui components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Your custom hook for debouncing (already created)
import { useDebounce } from "../hooks/useDebounce";

interface Gym {
  id: string;
  store: string;
  address?: string;
  city?: string;
  country?: string;
  thumb?: string;
}

interface Props {
  // You can still pass an initial list of gyms if desired, e.g. for SSR fallback
  // Or keep it empty if you only want the server fetch
  allGyms: Gym[];
  cityOptions: string[];
  countryOptions: string[];
}

export default function GymsTrainingClient({
  allGyms,         // optional initial/fallback data
  cityOptions,
  countryOptions,
}: Props) {
  // 1) Manage the search query for store name
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300); // 300ms debounce

  // 2) Manage the server-fetched gyms (based on store name search)
  const [serverGyms, setServerGyms] = useState<Gym[]>(allGyms || []);

  // 3) Local filters: city & country
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // 4) The final, locally filtered array to display
  const [filteredGyms, setFilteredGyms] = useState<Gym[]>([]);

  // -------------------------------------------------------------
  // A) Fetch gyms from the server whenever `debouncedQuery` changes
  // -------------------------------------------------------------
  useEffect(() => {
    // If there's no search query, we might default to `allGyms` or an empty array
    if (!debouncedQuery) {
      setServerGyms(allGyms || []);
      return;
    }

    // Otherwise, fetch from your API route, e.g. /api/gyms?q=...
    async function fetchGyms() {
      try {
        const res = await fetch(`/api/gyms?q=${encodeURIComponent(debouncedQuery)}`);
        const json = await res.json();
        // Expecting { data: Gym[] } structure from your endpoint
        setServerGyms(json.data || []);
      } catch (err) {
        console.error("Failed to fetch gyms:", err);
        setServerGyms([]);
      }
    }

    fetchGyms();
  }, [debouncedQuery, allGyms]);

  // -------------------------------------------------------------
  // B) Locally filter the fetched gyms by selectedCity & selectedCountry
  // -------------------------------------------------------------
  useEffect(() => {
    // Start with the server-fetched gyms
    let result = [...serverGyms];

    if (selectedCity) {
      result = result.filter((gym) => gym.city === selectedCity);
    }

    if (selectedCountry) {
      result = result.filter((gym) => gym.country === selectedCountry);
    }

    setFilteredGyms(result);
  }, [serverGyms, selectedCity, selectedCountry]);

  // -------------------------------------------------------------
  // C) Reset filters
  // -------------------------------------------------------------
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity(null);
    setSelectedCountry(null);
    // Optionally reset serverGyms to the fallback
    setServerGyms(allGyms || []);
  };

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  return (
    <section
      id="gyms"
      className="
        py-14 
        text-center
        bg-gradient-to-r 
        from-black 
        via-blue-800
        to-black 
        text-white
      "
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-md">
          Explore Training Centres
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-white/90 leading-relaxed">
          Browse our curated list of top Hyrox-friendly centres worldwide. Filter by city,
          country, or type in the gym name below.
        </p>

        {/* Top row: Search + Filter + Reset */}
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto mb-6 gap-4">
          {/* Search Input (shadcn/ui) - now uses typeahead from the server */}
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type the gym name..."
            className="flex-1 bg-white text-black"
          />

          {/* Filter + Reset Buttons */}
          <div className="flex items-center space-x-4">
            {/* Filter Dropdown (shadcn/ui) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition"
                >
                  Filter ▾
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 bg-white text-black border-none shadow-lg"
              >
                {/* City Section */}
                <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                  City
                </DropdownMenuLabel>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {cityOptions.map((city) => {
                    const isSelected = selectedCity === city;
                    return (
                      <DropdownMenuItem asChild key={city} className="p-0">
                        <button
                          onClick={() =>
                            setSelectedCity((prev) => (prev === city ? null : city))
                          }
                          className={`
                            px-3 py-1 text-sm rounded-full
                            ${
                              isSelected
                                ? "bg-green-300 text-black font-bold"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }
                          `}
                        >
                          {city}
                        </button>
                      </DropdownMenuItem>
                    );
                  })}
                </div>

                <DropdownMenuSeparator className="my-2" />

                {/* Country Section */}
                <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                  Country
                </DropdownMenuLabel>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {countryOptions.map((country) => {
                    const isSelected = selectedCountry === country;
                    return (
                      <DropdownMenuItem asChild key={country} className="p-0">
                        <button
                          onClick={() =>
                            setSelectedCountry((prev) =>
                              prev === country ? null : country
                            )
                          }
                          className={`
                            px-3 py-1 text-sm rounded-full
                            ${
                              isSelected
                                ? "bg-green-300 text-black font-bold"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }
                          `}
                        >
                          {country}
                        </button>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reset Filters (shadcn/ui Button) */}
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Grid of Gyms */}
        {filteredGyms.length === 0 ? (
          <div className="text-center mt-8 text-white/80">
            No gyms match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGyms.map((gym) => (
              <div
                key={gym.id}
                className="rounded-xl overflow-hidden shadow-md bg-white text-black"
              >
                {/* Image area: fixed height, object-cover */}
                <div className="relative w-full h-48 bg-gray-300">
                  {gym.thumb ? (
                    <Image
                      src={gym.thumb}
                      alt={gym.store}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/placeholder_1.jpg"
                      alt={gym.store}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="p-4 text-left">
                  <h3 className="text-lg font-bold mb-1">{gym.store}</h3>
                  {gym.address && (
                    <p className="text-sm text-gray-800 mb-2">{gym.address}</p>
                  )}
                  {(gym.city || gym.country) && (
                    <p className="text-xs text-gray-600">
                      {[gym.city, gym.country].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}