import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { BackButton } from "@/components/ui/BackButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weddingDate, setWeddingDate] = useState<Date>();
  const [weddingLocation, setWeddingLocation] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate email format
      if (!validateEmail(loginEmail)) {
        toast({
          title: "Format d'email invalide",
          description: "Veuillez entrer une adresse email valide",
          variant: "destructive",
        });
        return;
      }

      // Validate password length
      if (loginPassword.length < 6) {
        toast({
          title: "Mot de passe trop court",
          description: "Le mot de passe doit contenir au moins 6 caractères",
          variant: "destructive",
        });
        return;
      }

      const { error } = await signIn(loginEmail, loginPassword);
      
      if (error) {
        if (error.message === "Invalid login credentials") {
          toast({
            title: "Échec de la connexion",
            description: "Email ou mot de passe incorrect. Si vous n'avez pas encore de compte, veuillez vous inscrire d'abord.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la connexion. Veuillez réessayer.",
            variant: "destructive",
          });
        }
        console.error("Login error details:", error);
      } else {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate email format
      if (!validateEmail(email)) {
        throw new Error("Format d'email invalide");
      }

      // Validate password length
      if (password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères");
      }

      if (!weddingDate) {
        throw new Error("La date de mariage est requise");
      }

      if (!firstName || !lastName || !weddingLocation || !estimatedBudget || !guestCount) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      const userData = {
        firstName,
        lastName,
        weddingDate: format(weddingDate, 'yyyy-MM-dd'),
        weddingLocation,
        estimatedBudget: parseInt(estimatedBudget),
        guestCount: parseInt(guestCount),
      };

      const { error } = await signUp(email, password, userData);

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Erreur d'inscription",
            description: "Cette adresse email est déjà utilisée",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <BackButton />
      <div className="flex-1 container flex items-center justify-center py-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif">Bienvenue sur Mariable</CardTitle>
            <CardDescription>
              La plateforme qui simplifie l'organisation de votre mariage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
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
                      placeholder="Ville ou région"
                      required
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
                        placeholder="30000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Nombre d'invités</Label>
                      <Input
                        id="guests"
                        type="number"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="100"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Création du compte..." : "Créer un compte"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
