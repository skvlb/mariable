import { Heart, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-serif text-2xl">
          MARIABLE
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/favorites">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleAuthClick}
          >
            {user ? <LogOut className="h-5 w-5" /> : <User className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  );
};