import { BackButton } from "@/components/ui/BackButton";
import { Navbar } from "@/components/layout/Navbar";

const Favorites = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackButton />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-serif mb-4">Favoris</h1>
        <p>Cette page est en cours de développement.</p>
      </div>
    </div>
  );
};

export default Favorites;