import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import { TreatmentView } from "@/components/TreatmentView";

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }));
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!registry[slug]) notFound();
  return <TreatmentView slug={slug} />;
}
