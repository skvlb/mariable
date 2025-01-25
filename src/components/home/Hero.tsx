import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-cream-light py-24 sm:py-32">
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-6xl animate-fadeIn">
            Créez le mariage de vos rêves
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fadeIn">
            Découvrez les meilleurs prestataires de mariage haut de gamme et organisez votre événement en toute sérénité.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fadeIn">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-dark"
              onClick={() => navigate('/vendors')}
            >
              Découvrir les prestataires
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/how-it-works')}
            >
              Comment ça marche
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};