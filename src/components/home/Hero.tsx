import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users, MapPin, Search, Euro } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const Hero = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [vendorType, setVendorType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (date) params.append("date", date.toISOString());
    if (location) params.append("location", location);
    if (budget) params.append("budget", budget);
    if (guestCount) params.append("guests", guestCount);
    if (vendorType) params.append("type", vendorType);
    
    navigate(`/vendors?${params.toString()}`);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Vidéo en arrière-plan */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenu */}
      <div className="relative h-full flex items-center">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-6xl animate-fadeIn">
              Créez le mariage de vos rêves
            </h1>
            <p className="mt-6 text-lg leading-8 text-cream-light animate-fadeIn">
              Découvrez les meilleurs prestataires de mariage haut de gamme et organisez votre événement en toute sérénité.
            </p>
            
            {/* Barre de recherche */}
            <div className="mt-8 p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Type de prestataire */}
                <Select value={vendorType} onValueChange={setVendorType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de prestataire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venue">Lieu de réception</SelectItem>
                    <SelectItem value="catering">Traiteur</SelectItem>
                    <SelectItem value="photo">Photographe/Vidéaste</SelectItem>
                    <SelectItem value="planner">Wedding Planner</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sélecteur de date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "dd MMMM yyyy", { locale: fr })
                      ) : (
                        <span>Date du mariage</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>

                {/* Sélecteur de lieu */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Lieu du mariage"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Nombre d'invités */}
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="Nombre d'invités"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="pl-10"
                    min="0"
                  />
                </div>

                {/* Budget */}
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10000-20000">10 000€ - 20 000€</SelectItem>
                    <SelectItem value="20000-30000">20 000€ - 30 000€</SelectItem>
                    <SelectItem value="30000-50000">30 000€ - 50 000€</SelectItem>
                    <SelectItem value="50000+">Plus de 50 000€</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bouton de recherche */}
              <Button 
                onClick={handleSearch}
                className="mt-4 bg-gold hover:bg-gold-dark text-white w-full md:w-auto px-8"
              >
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fadeIn">
              <Button 
                variant="outline" 
                size="lg"
                className="text-gold border-gold hover:bg-gold/10 hover:text-gold"
                onClick={() => navigate('/how-it-works')}
              >
                Comment ça marche
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};