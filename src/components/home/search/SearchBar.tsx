import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const SearchBar = () => {
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
    <div className="p-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select value={vendorType} onValueChange={setVendorType}>
          <SelectTrigger className="text-center w-full">
            <SelectValue placeholder="Type de prestataire" className="text-center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="venue" className="text-center">Lieu de réception</SelectItem>
            <SelectItem value="catering" className="text-center">Traiteur</SelectItem>
            <SelectItem value="photo" className="text-center">Photographe/Vidéaste</SelectItem>
            <SelectItem value="planner" className="text-center">Wedding Planner</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-center text-center font-normal"
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

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Lieu du mariage"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 text-center w-full"
          />
        </div>

        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="number"
            placeholder="Nombre d'invités"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="pl-10 text-center w-full"
            min="0"
          />
        </div>

        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger className="text-center w-full">
            <SelectValue placeholder="Budget" className="text-center" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="10000-20000" className="text-center">10 000€ - 20 000€</SelectItem>
            <SelectItem value="20000-30000" className="text-center">20 000€ - 30 000€</SelectItem>
            <SelectItem value="30000-50000" className="text-center">30 000€ - 50 000€</SelectItem>
            <SelectItem value="50000+" className="text-center">Plus de 50 000€</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleSearch}
        className="mt-4 bg-gold hover:bg-gold-dark text-white w-full md:w-auto px-8"
      >
        <Search className="mr-2 h-4 w-4" />
        Rechercher
      </Button>
    </div>
  );
};