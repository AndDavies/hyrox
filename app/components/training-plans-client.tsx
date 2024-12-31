"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

// shadcn/ui components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// ------------- DATA SHAPES & CONSTANTS -------------

interface Plan {
  id: string
  slug: string
  title: string
  main_image_url?: string
  description?: string
  price_text?: string // e.g. "$25/month"
  fitness_level?: string // e.g. "Beginner"
  days_per_week?: string // e.g. "2-3"
}

interface TrainingPlansClientProps {
  allPlans: Plan[]
}

// For cost filtering, define ranges we want to show
const costRanges = [
  { label: "Under $20", min: 0, max: 20 },
  { label: "$20 - $50", min: 20, max: 50 },
  { label: "$50 - $75", min: 50, max: 75 },
  { label: "$100+", min: 100, max: Infinity },
]

// Example fitness levels
const fitnessLevels = ["Beginner", "Intermediate", "Rx", "Scaled", "Very Active"]

// Example days per week
const daysPerWeekOptions = ["2-3", "3-5", "5-7", "Individual"]

// Helper function to parse numeric cost from strings like "$25/month"
function parseCostNumber(priceText?: string): number {
  if (!priceText) return 0
  const match = priceText.match(/\d+/)
  if (!match) return 0
  return parseInt(match[0], 10)
}

// ------------- MAIN CLIENT COMPONENT -------------

export default function TrainingPlansClient({ allPlans }: TrainingPlansClientProps) {
  // Searching
  const [searchQuery, setSearchQuery] = useState("")

  // Filters
  const [selectedFitness, setSelectedFitness] = useState<string | null>(null)
  const [selectedDays, setSelectedDays] = useState<string | null>(null)
  const [selectedCostRange, setSelectedCostRange] = useState<string | null>(null)

  // State for the currently filtered array
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(allPlans)

  // Re-filter any time inputs change
  useEffect(() => {
    let result = allPlans

    // Fitness level
    if (selectedFitness) {
      result = result.filter((p) => p.fitness_level === selectedFitness)
    }

    // Days/week
    if (selectedDays) {
      result = result.filter((p) => p.days_per_week === selectedDays)
    }

    // Cost range
    if (selectedCostRange) {
      const range = costRanges.find((r) => r.label === selectedCostRange)
      if (range) {
        const { min, max } = range
        result = result.filter((p) => {
          const costNum = parseCostNumber(p.price_text)
          return costNum >= min && costNum < max
        })
      }
    }

    // Title search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q))
    }

    setFilteredPlans(result)
  }, [searchQuery, selectedFitness, selectedDays, selectedCostRange, allPlans])

  // Clear all filters
  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedFitness(null)
    setSelectedDays(null)
    setSelectedCostRange(null)
  }

  return (
    <section
      id="training-programs"
      className="
        py-14 
        text-center 
        bg-gradient-to-r 
        from-black 
        via-pink-400 
        to-cyan-500 
        text-white
      "
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 drop-shadow-md">
          Browse Training Plans
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-white/90 leading-relaxed">
          Check out top-rated Hyrox training plans from beginner to advanced levels.
        </p>

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto mb-6 gap-4">
          {/* Search Input (shadcn/ui) */}
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search among ${allPlans.length} plans`}
            className="flex-1 bg-white text-black"
          />

          <div className="flex items-center space-x-4">
            {/* Filter dropdown (shadcn/ui) */}
            <FilterMenu
              selectedFitness={selectedFitness}
              setSelectedFitness={setSelectedFitness}
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              selectedCostRange={selectedCostRange}
              setSelectedCostRange={setSelectedCostRange}
            />

            {/* Reset Filters Button (shadcn/ui) */}
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredPlans.length === 0 ? (
          <div className="text-center mt-8 text-white/90">
            No training plans match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white text-black rounded-xl overflow-hidden border border-black/10 shadow-md"
              >
                {/* Image area with consistent aspect ratio */}
                <div className="relative w-full h-48 bg-black/10">
                  {plan.main_image_url ? (
                    <Image
                      src={plan.main_image_url}
                      alt={plan.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="https://via.placeholder.com/600x400?text=Plan"
                      alt="Placeholder"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Plan info */}
                <div className="p-4 text-left">
                  <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                  {plan.price_text && (
                    <p className="text-sm text-gray-600 mb-2">{plan.price_text}</p>
                  )}
                  {plan.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {plan.description.slice(0, 80)}...
                    </p>
                  )}
                  <a
                    href={`/plans/${plan.slug}`}
                    className="font-semibold text-pink-400 hover:underline"
                  >
                    View Plan
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ------------- SUB-COMPONENT FOR THE FILTER MENU -------------
function FilterMenu({
  selectedFitness,
  setSelectedFitness,
  selectedDays,
  setSelectedDays,
  selectedCostRange,
  setSelectedCostRange,
}: {
  selectedFitness: string | null
  setSelectedFitness: React.Dispatch<React.SetStateAction<string | null>>
  selectedDays: string | null
  setSelectedDays: React.Dispatch<React.SetStateAction<string | null>>
  selectedCostRange: string | null
  setSelectedCostRange: React.Dispatch<React.SetStateAction<string | null>>
}) {
  return (
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
        className="w-80 bg-white text-black border-none shadow-lg"
      >
        {/* Fitness Level */}
        <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
          Fitness Level
        </DropdownMenuLabel>
        <div className="flex flex-wrap gap-2 px-3 py-2">
          {fitnessLevels.map((level) => {
            const isSelected = selectedFitness === level
            return (
              <DropdownMenuItem asChild key={level} className="p-0">
                <button
                  onClick={() =>
                    setSelectedFitness((prev) => (prev === level ? null : level))
                  }
                  className={`
                    px-3 py-1 text-sm rounded-full
                    ${
                      isSelected
                        ? "bg-green-300 text-black font-bold"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }
                  `}
                >
                  {level}
                </button>
              </DropdownMenuItem>
            )
          })}
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Days per Week */}
        <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
          Days/Week
        </DropdownMenuLabel>
        <div className="flex flex-wrap gap-2 px-3 py-2">
          {daysPerWeekOptions.map((days) => {
            const isSelected = selectedDays === days
            return (
              <DropdownMenuItem asChild key={days} className="p-0">
                <button
                  onClick={() =>
                    setSelectedDays((prev) => (prev === days ? null : days))
                  }
                  className={`
                    px-3 py-1 text-sm rounded-full
                    ${
                      isSelected
                        ? "bg-green-300 text-black font-bold"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }
                  `}
                >
                  {days}
                </button>
              </DropdownMenuItem>
            )
          })}
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Cost Range */}
        <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
          Cost Range
        </DropdownMenuLabel>
        <div className="flex flex-wrap gap-2 px-3 py-2">
          {costRanges.map((range) => {
            const isSelected = selectedCostRange === range.label
            return (
              <DropdownMenuItem asChild key={range.label} className="p-0">
                <button
                  onClick={() =>
                    setSelectedCostRange((prev) =>
                      prev === range.label ? null : range.label
                    )
                  }
                  className={`
                    px-3 py-1 text-sm rounded-full
                    ${
                      isSelected
                        ? "bg-green-300 text-black font-bold"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }
                  `}
                >
                  {range.label}
                </button>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}