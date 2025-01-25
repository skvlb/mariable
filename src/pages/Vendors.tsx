import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Vendors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12">
          <h1 className="font-serif text-4xl font-medium mb-8">Nos prestataires</h1>
          {/* Liste des prestataires à implémenter */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vendors;