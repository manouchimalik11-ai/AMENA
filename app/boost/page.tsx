import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BoostClient from "@/components/BoostClient";

export const metadata = { title: "Booster mon annonce | Amena" };

export default function BoostPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f8", color: "#1a1a2e" }}>
      <Navbar />
      <BoostClient />
      <Footer />
    </div>
  );
}
