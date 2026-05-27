import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RechercheClient from "@/components/RechercheClient";

export const metadata = { title: "Recherche avancée | Amena" };

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8", color: "#1a1a2e" }}>
      <Navbar />
      <RechercheClient initialQuery={q || ""} />
      <Footer />
    </div>
  );
}
