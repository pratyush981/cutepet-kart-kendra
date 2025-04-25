
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { usePetShop } from "@/context/PetShopContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Trash } from "lucide-react";

const CartPage = () => {
  const { cart, clearCart } = usePetShop();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-6">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-petshop-gray rounded-full flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-petshop-purple" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any pets to your cart yet.</p>
            <Button asChild className="bg-petshop-purple hover:bg-petshop-dark-purple">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash className="mr-2 h-4 w-4" /> Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {cart.map((item) => (
                    <CartItem key={item.pet.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-petshop-purple text-petshop-purple hover:bg-petshop-gray hover:text-petshop-purple"
                  >
                    <Link to="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
