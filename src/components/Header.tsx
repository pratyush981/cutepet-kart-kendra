
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePetShop } from "@/context/PetShopContext";

const Header = () => {
  const { totalItems } = usePetShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gradient-to-r from-petshop-purple to-petshop-pink rounded-full flex items-center justify-center animate-bounce-slight">
            <span className="text-white text-2xl font-bold">पे</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-petshop-purple to-petshop-pink bg-clip-text text-transparent">
            Cutupet Center
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-foreground hover:text-petshop-purple transition">
            Home
          </Link>
          <Link to="/?category=dog" className="text-foreground hover:text-petshop-purple transition">
            Dogs
          </Link>
          <Link to="/?category=cat" className="text-foreground hover:text-petshop-purple transition">
            Cats
          </Link>
          <Link to="/?category=bird" className="text-foreground hover:text-petshop-purple transition">
            Birds
          </Link>
          <Link to="/?category=small-pet" className="text-foreground hover:text-petshop-purple transition">
            Small Pets
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="text-foreground">
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-petshop-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg overflow-hidden">
          <div className="flex flex-col p-4 space-y-3">
            <Link 
              to="/" 
              className="p-2 rounded-md hover:bg-petshop-gray text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/?category=dog" 
              className="p-2 rounded-md hover:bg-petshop-gray text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Dogs
            </Link>
            <Link 
              to="/?category=cat" 
              className="p-2 rounded-md hover:bg-petshop-gray text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Cats
            </Link>
            <Link 
              to="/?category=bird" 
              className="p-2 rounded-md hover:bg-petshop-gray text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Birds
            </Link>
            <Link 
              to="/?category=small-pet" 
              className="p-2 rounded-md hover:bg-petshop-gray text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Small Pets
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
