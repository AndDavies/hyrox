import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface CenterPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CenterPageProps): Promise<Metadata> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: center } = await supabase
    .from("gyms")
    .select("store, meta_description")
    .eq("slug", params.slug)
    .single();

  return {
    title: `${center?.store || "Center Not Found"} | Hyrox Training Center`,
    description: center?.meta_description || "Details about this training center.",
  };
}

export default async function CenterPage({ params }: CenterPageProps) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: center } = await supabase
    .from("gyms")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!center) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Center not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{center.store}</h1>
            <p className="text-gray-700 mb-4">{center.description}</p>
            <ul className="list-disc pl-6 mb-6">
                {center.services?.map((service: string, idx: number) => (
                    <li key={idx}>{service}</li>
                ))}
            </ul>

            {/* Contact Info */}
            <p>
              <strong>Email:</strong> <a href={`mailto:${center.email}`}>{center.email}</a>
            </p>
            <p>
              <strong>Phone:</strong> {center.phone}
            </p>

            {/* Link to external website */}
            <Link
              href={center.url || "#"}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              Visit Official Website
            </Link>
          </div>
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
