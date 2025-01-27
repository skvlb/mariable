import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { ErrorBoundary } from "react-error-boundary";
import { useToast } from "@/components/ui/use-toast";

const ErrorFallback = ({ error }: { error: Error }) => {
  const { toast } = useToast();
  
  console.error("Error in Index page:", error);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-serif mb-4">Une erreur est survenue</h2>
      <p className="text-gray-600 mb-4">Nous nous excusons pour ce désagrément.</p>
    </div>
  );
};

const Index = () => {
  console.log("Rendering Index page");
  
  return (
    <div className="min-h-screen flex flex-col">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar />
        <main className="flex-grow">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Hero />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Categories />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FeaturedVendors />
          </ErrorBoundary>
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default Index;