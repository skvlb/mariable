import { useAuth } from "@/providers/AuthProvider";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-serif mb-4">Tableau de bord</h1>
      <p>Cette page est en cours de développement.</p>
    </div>
  );
};

export default Dashboard;