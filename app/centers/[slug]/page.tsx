import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

/** 
 * Force dynamic SSR (so Next doesn’t try to infer or require any param types
 * from a static approach). This helps avoid certain param constraints.
 */
export const dynamic = "force-dynamic";

/**
 * Define the interface for our route's props.
 */
interface CenterPageProps {
  params: Promise<{ slug: string }>;
}

/** 
 * Metadata function for SEO purposes.
 */
export async function generateMetadata({ params }: CenterPageProps): Promise<Metadata> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const resolvedParams = await params;

  // Fetch metadata-related fields from the database
  const { data: center } = await supabase
    .from("gyms")
    .select("store, meta_description")
    .eq("slug", resolvedParams.slug)
    .single();

  return {
    title: `${center?.store || "Center Not Found"} | Hyrox Training Center`,
    description: center?.meta_description || "Details about this training center.",
  };
}

/** 
 * Center object interface for database rows.
 */
interface Center {
  id: string;
  store: string;
  description?: string;
  email?: string;
  phone?: string;
  services?: string[];
  url?: string;
  main_image_url?: string;
}

/**
 * Helper component to display service information.
 */
function ServiceList({ services }: { services?: string[] }) {
  if (!services || services.length === 0) return null;
  return (
    <ul className="list-disc pl-6 mb-6">
      {services.map((service, idx) => (
        <li key={idx}>{service}</li>
      ))}
    </ul>
  );
}

/**
 * The actual page for /centers/[slug].
 */
export default async function CenterPage({ params }: CenterPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Create a Supabase client for SSR
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch center data by slug
  const { data: center, error } = await supabase
    .from("gyms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!center || error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <h1 className="text-2xl">Center not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Top Hero Section */}
      <section className="max-w-6xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Text Column */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{center.store}</h1>
            <p className="text-gray-700 mb-4">{center.description || "No description available."}</p>
            <ServiceList services={center.services} />
            <p>
              <strong>Email:</strong> <a href={`mailto:${center.email}`}>{center.email || "Not available"}</a>
            </p>
            <p>
              <strong>Phone:</strong> {center.phone || "Not available"}
            </p>
            {center.url && (
              <Link
                href={center.url}
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Visit Official Website
              </Link>
            )}
          </div>

          {/* Image Column */}
          <div className="flex-1">
            <Image
              src={center.main_image_url || "/placeholder.jpg"}
              alt={center.store}
              width={800}
              height={600}
              className="rounded shadow"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
