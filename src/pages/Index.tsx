
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PetCard from "@/components/PetCard";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import SortOptions from "@/components/SortOptions";
import { usePetShop } from "@/context/PetShopContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import confetti from "canvas-confetti";

const Index = () => {
  const { filteredPets } = usePetShop();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);

  // Scroll to pets section if URL has hash
  useEffect(() => {
    if (window.location.hash === "#pets") {
      const petsSection = document.getElementById("pets");
      if (petsSection) {
        petsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setShowConfetti(true);
    
    toast({
      title: "🎉 Hooray!",
      description: "You found the secret confetti button!",
      duration: 3000,
    });
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Hero />
        
        <div className="mt-12" id="pets">
          <CategoryFilter />
          <SortOptions />
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-center">Our Adorable Pets</h2>
            <Button 
              variant="outline" 
              onClick={triggerConfetti} 
              className="bg-gradient-to-r from-petshop-purple to-petshop-pink text-white border-0 hover:opacity-90"
            >
              Surprise Me!
            </Button>
          </div>
          
          {filteredPets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No pets found in this category.</p>
              <p>Check back soon as we update our inventory regularly!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-16 bg-petshop-gray p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Cutupet Center?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-petshop-pink rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-petshop-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Healthy & Happy Pets</h3>
              <p className="text-muted-foreground">All our pets are well-cared for, vaccinated, and ready to become part of your family.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-petshop-yellow rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-petshop-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">Our team of pet care experts will help you select the perfect pet for your lifestyle.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-petshop-green rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-petshop-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Safe Home Delivery</h3>
              <p className="text-muted-foreground">We ensure your new pet arrives safely at your doorstep with all necessary supplies.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
