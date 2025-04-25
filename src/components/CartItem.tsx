
import { CartItem as CartItemType } from "@/types/PetTypes";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { usePetShop } from "@/context/PetShopContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { pet, quantity } = item;
  const { updateQuantity, removeFromCart } = usePetShop();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 border-b">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <Link to={`/pet/${pet.id}`} className="block">
          <img 
            src={pet.image} 
            alt={pet.name} 
            className="w-16 h-16 object-cover rounded-md" 
          />
        </Link>
        
        <div className="ml-0 sm:ml-4 text-center sm:text-left mt-2 sm:mt-0">
          <Link to={`/pet/${pet.id}`} className="block">
            <h3 className="font-medium">{pet.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{pet.breed}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(pet.id, quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="w-8 text-center">{quantity}</span>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(pet.id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center w-24">
          <p className="font-medium text-petshop-purple">₹{(pet.price * quantity).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">₹{pet.price.toLocaleString()} each</p>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => removeFromCart(pet.id)}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
