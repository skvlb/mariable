import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weddingDate, setWeddingDate] = useState<Date>();
  const [weddingLocation, setWeddingLocation] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [guestCount, setGuestCount] = useState("");

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setWeddingDate(data.wedding_date ? new Date(data.wedding_date) : undefined);
        setWeddingLocation(data.wedding_location || "");
        setEstimatedBudget(data.estimated_budget?.toString() || "");
        setGuestCount(data.guest_count?.toString() || "");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger votre profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          wedding_date: weddingDate ? format(weddingDate, 'yyyy-MM-dd') : null,
          wedding_location: weddingLocation,
          estimated_budget: parseInt(estimatedBudget),
          guest_count: parseInt(guestCount),
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <BackButton />
      <div className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-serif mb-6">Votre profil</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date du mariage</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {weddingDate ? (
                      format(weddingDate, "dd MMMM yyyy", { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={weddingDate}
                    onSelect={setWeddingDate}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lieu du mariage</Label>
              <Input
                id="location"
                value={weddingLocation}
                onChange={(e) => setWeddingLocation(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget estimé (€)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Nombre d'invités</Label>
                <Input
                  id="guests"
                  type="number"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;