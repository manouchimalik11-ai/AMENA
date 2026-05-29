import { annonces } from "@/lib/data";
import Footer from "@/components/Footer";
import AnnonceDetail from "@/components/AnnonceDetail";
import { notFound } from "next/navigation";

export default async function AnnoncePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const annonce = annonces.find((a) => a.id === parseInt(id));
  if (!annonce) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#f6f6f6", color: "#1a1a2e" }}>
      <AnnonceDetail annonce={annonce} />
      <Footer />
    </div>
  );
}
