"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

// Custom hook for debouncing input
import { useDebounce } from "../hooks/useDebounce";

interface Gym {
  id: string;
  store: string;
  address?: string;
  city?: string;
  country?: string;
  thumb?: string;
  slug: string;
}

interface Props {
  allGyms: Gym[];
  cityOptions: string[];
  countryOptions: string[];
}

export default function GymsTrainingClient({
  allGyms,
  cityOptions,
  countryOptions,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [serverGyms, setServerGyms] = useState<Gym[]>(allGyms || []);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [filteredGyms, setFilteredGyms] = useState<Gym[]>([]);

  useEffect(() => {
    if (!debouncedQuery) {
      setServerGyms(allGyms || []);
      return;
    }

    async function fetchGyms() {
      try {
        const res = await fetch(`/api/gyms?q=${encodeURIComponent(debouncedQuery)}`);
        const json = await res.json();
        setServerGyms(json.data || []);
      } catch (err) {
        console.error("Failed to fetch gyms:", err);
        setServerGyms([]);
      }
    }

    fetchGyms();
  }, [debouncedQuery, allGyms]);

  useEffect(() => {
    let result = [...serverGyms];

    if (selectedCity) {
      result = result.filter((gym) => gym.city === selectedCity);
    }

    if (selectedCountry) {
      result = result.filter((gym) => gym.country === selectedCountry);
    }

    setFilteredGyms(result);
  }, [serverGyms, selectedCity, selectedCountry]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity(null);
    setSelectedCountry(null);
    setServerGyms(allGyms || []);
  };

  return (
    <section id="gyms">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl text-center text-gray-700 sm:text-4xl font-extrabold mb-4 drop-shadow-md">
          Explore Training Centres
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-center text-gray-500 leading-relaxed">
          Browse our curated list of top Hyrox-friendly centres worldwide. Filter by city,
          country, or type in the gym name below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto mb-6 gap-4">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type the gym name..."
            className="flex-1 bg-white text-black"
          />
          <div className="flex items-center space-x-4">
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
                <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                  City
                </DropdownMenuLabel>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {cityOptions.map((city) => (
                    <DropdownMenuItem asChild key={city}>
                      <button
                        onClick={() =>
                          setSelectedCity((prev) => (prev === city ? null : city))
                        }
                        className={`px-3 py-1 text-sm rounded-full ${
                          selectedCity === city
                            ? "bg-green-300 text-black font-bold"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {city}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                  Country
                </DropdownMenuLabel>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {countryOptions.map((country) => (
                    <DropdownMenuItem asChild key={country}>
                      <button
                        onClick={() =>
                          setSelectedCountry((prev) =>
                            prev === country ? null : country
                          )
                        }
                        className={`px-3 py-1 text-sm rounded-full ${
                          selectedCountry === country
                            ? "bg-green-300 text-black font-bold"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {country}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition"
            >
              Reset
            </Button>
          </div>
        </div>

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
                <div className="relative w-full h-48 bg-gray-300">
                  <Image
                    src={gym.thumb || "/placeholder_1.jpg"}
                    alt={gym.store}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-lg font-bold mb-1">{gym.store}</h3>
                  <p className="text-sm text-gray-800 mb-2">{gym.address}</p>
                  <p className="text-xs text-gray-600">
                    {[gym.city, gym.country].filter(Boolean).join(", ")}
                  </p>
                  <Link
                    href={`/centers/${gym.slug}`}
                    className="font-semibold text-pink-400 hover:underline"
                  >
                    View Center
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
