// app/api/gyms/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") || ""

  // If no search query, return empty
  if (!q) {
    return NextResponse.json({ data: [] })
  }

  // Example: searching store name
  const { data, error } = await supabase
    .from("gyms")
    .select("id, store, address, city, country, thumb")
    // .or(`city.ilike.%${q}%,store.ilike.%${q}%`) for multi-field search
    .ilike("store", `%${q}%`)
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}