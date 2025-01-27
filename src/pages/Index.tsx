import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { ErrorBoundary } from "react-error-boundary";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  console.error("Error details:", {
    message: error.message,
    stack: error.stack,
    name: error.name
  });
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-serif mb-4">Une erreur est survenue</h2>
      <p className="text-gray-600 mb-4">Nous nous excusons pour ce désagrément.</p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-gold hover:bg-gold-dark text-white rounded"
        >
          Réessayer
        </button>
      )}
    </div>
  );
};

const Index = () => {
  const handleError = (error: Error) => {
    console.error("Component error:", error);
  };

  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={handleError}
    >
      <Navbar />
      <main className="flex-grow">
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onError={handleError}
        >
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onError={handleError}
        >
          <Categories />
        </ErrorBoundary>
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onError={handleError}
        >
          <FeaturedVendors />
        </ErrorBoundary>
      </main>
      <Footer />
    </ErrorBoundary>
  );
};

export default Index;