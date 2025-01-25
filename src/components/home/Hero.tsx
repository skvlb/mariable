import { Button } from "@/components/ui/button";

export const Hero = () => {
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
            <Button size="lg" className="bg-gold hover:bg-gold-dark">
              Découvrir les prestataires
            </Button>
            <Button variant="outline" size="lg">
              Comment ça marche
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};