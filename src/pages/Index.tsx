import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error }: { error: Error }) => {
  console.error("Error in Index page:", error);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-serif mb-4">Une erreur est survenue</h2>
      <p className="text-gray-600 mb-4">Nous nous excusons pour ce désagrément.</p>
    </div>
  );
};

const PageContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedVendors />
      </main>
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PageContent />
    </ErrorBoundary>
  );
};

export default Index;