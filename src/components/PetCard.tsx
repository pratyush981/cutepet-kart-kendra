
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Pet } from "@/types/PetTypes";
import { usePetShop } from "@/context/PetShopContext";

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const { addToCart } = usePetShop();

  return (
    <div className="pet-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-petshop-gray">
      <Link to={`/pet/${pet.id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={pet.image} 
            alt={pet.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105" 
          />
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
          }}
          className="w-full bg-petshop-purple hover:bg-petshop-dark-purple"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
