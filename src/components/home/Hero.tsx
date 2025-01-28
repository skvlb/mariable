import { SearchBar } from "./search/SearchBar";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center px-4 py-20">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/lovable-uploads/cc1af380-2002-4c85-bdb7-63653f1f9bd4.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
            Trouvez les meilleurs prestataires
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Pour un mariage qui vous ressemble
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};