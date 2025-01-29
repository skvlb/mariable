import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";

const steps = [
  {
    title: "Recherchez vos prestataires",
    description: "Parcourez notre sélection de prestataires de mariage haut de gamme et trouvez ceux qui correspondent à vos critères.",
    image: "photo-1469371670807-013ccf25f16a",
  },
  {
    title: "Comparez et sélectionnez",
    description: "Comparez les différentes offres, consultez les avis et sélectionnez les prestataires qui vous correspondent le mieux.",
    image: "photo-1522673607200-164d1b6ce486",
  },
  {
    title: "Contactez et réservez",
    description: "Contactez directement les prestataires, échangez avec eux et réservez leurs services pour votre grand jour.",
    image: "photo-1492684223066-81342ee5ff30",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackButton />
      <main className="flex-grow">
        <div className="container mx-auto py-16">
          <h1 className="font-serif text-4xl font-medium text-center mb-12">Comment ça marche</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${step.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-white w-8 h-8 rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-serif text-2xl mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-dark"
              onClick={() => navigate('/vendors')}
            >
              Découvrir les prestataires
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
