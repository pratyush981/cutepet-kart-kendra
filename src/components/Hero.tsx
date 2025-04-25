
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-petshop-purple/50 to-petshop-pink/50 z-10 rounded-2xl" />
      <div 
        className="h-[400px] md:h-[500px] bg-cover bg-center rounded-2xl overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Welcome to Cutupet Center
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Find your perfect furry, feathery, or scaly companion. We have a wide variety of adorable pets waiting for a loving home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-petshop-purple hover:bg-white/90">
                <Link to="/#pets">Browse Pets</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
