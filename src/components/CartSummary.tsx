
import { usePetShop } from "@/context/PetShopContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

const CartSummary = ({ showCheckoutButton = true }: CartSummaryProps) => {
  const { totalAmount, cart } = usePetShop();
  const gst = totalAmount * 0.18; // 18% GST
  const deliveryCharge = 500; // Fixed delivery charge
  const grandTotal = totalAmount + gst + deliveryCharge;

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">GST (18%)</span>
          <span>₹{gst.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery Charges</span>
          <span>₹{deliveryCharge.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="border-t pt-3">
        <div className="flex justify-between font-bold">
          <span>Grand Total</span>
          <span className="text-petshop-purple">₹{grandTotal.toLocaleString()}</span>
        </div>
      </div>
      
      {showCheckoutButton && (
        <Button 
          asChild 
          className="w-full mt-4 bg-petshop-purple hover:bg-petshop-dark-purple"
        >
          <Link to="/checkout">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Link>
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
