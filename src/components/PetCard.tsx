
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Pet } from "@/types/PetTypes";
import { usePetShop } from "@/context/PetShopContext";
import { useToast } from "@/components/ui/use-toast";

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const { addToCart } = usePetShop();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked 
        ? `${pet.name} was removed from your favorites` 
        : `${pet.name} was added to your favorites`,
      duration: 2000,
    });
  };

  return (
    <div 
      className={`pet-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-petshop-gray transition-all ${isHovered ? 'scale-105' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/pet/${pet.id}`} className="block">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={pet.image} 
            alt={pet.name} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
          <button
            onClick={handleLike}
            className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-petshop-pink text-petshop-pink' : 'text-gray-400'} transition-colors`} />
          </button>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
            <span className="text-xs font-medium text-white bg-petshop-purple/80 px-2 py-0.5 rounded-full">
              {pet.category === "small-pet" ? "Small Pet" : pet.category.charAt(0).toUpperCase() + pet.category.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground">{pet.name}</h3>
          
          <div className="mt-2 mb-3">
            <p className="text-muted-foreground text-sm">{pet.breed} • {pet.age}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-petshop-purple">₹{pet.price.toLocaleString()}</p>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(pet);
            toast({
              title: "Added to cart",
              description: `${pet.name} has been added to your cart`,
              duration: 2000,
            });
          }}
          className={`w-full bg-petshop-purple hover:bg-petshop-dark-purple ${isHovered ? 'animate-bounce-slight' : ''}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
