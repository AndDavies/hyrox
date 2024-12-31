// app/components/Header.tsx
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-black via-pink-400 to-cyan-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo/peak_logo_white.png"
              alt="Peak Metrix"
              width={800}
              height={600}
              className="h-6 w-auto object-contain"
            />
            <span className="font-bold text-lg tracking-tight drop-shadow-sm">
              Hyrox Training Hub
            </span>
          </Link>
        </div>

        {/* Right: Nav Items */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            href="/about"
            className="hover:text-white/80 transition font-semibold"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className="hover:text-white/80 transition font-semibold"
          >
            Contact Us
          </Link>

          {/* CTA Button (shadcn/ui) */}
          <Link href="/signup">
            <Button
              variant="outline"
              className="
                border-white text-white
                hover:bg-white hover:text-black
                rounded-full px-4 py-1
                transition
              "
            >
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}