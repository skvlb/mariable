export const Footer = () => {
  return (
    <footer className="border-t bg-cream-light">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-xl mb-4">MARIABLE</h3>
            <p className="text-sm text-muted-foreground">
              La première marketplace haut de gamme dédiée aux prestataires de mariage.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>À propos</li>
              <li>Comment ça marche</li>
              <li>Devenir prestataire</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Recevez nos actualités et conseils pour votre mariage.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mariable. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};