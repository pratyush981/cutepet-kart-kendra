
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, LogIn } from "lucide-react";
import { usePetShop } from "@/context/PetShopContext";
import { useMobile } from "@/hooks/use-mobile";

const Header = () => {
  const { cart } = usePetShop();
  const { isMobile } = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-petshop-purple rounded-full p-1.5 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 001 11a1 1 0 11-2 0 8.97 8.97 0 014.662-7.869z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 10a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7 10a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M13 10a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl">Cutupet Center</span>
            </Link>
          </div>

          {!isMobile ? (
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-petshop-purple">
                Home
              </Link>
              <Link
                to="/#pets"
                className="text-foreground hover:text-petshop-purple"
              >
                Shop
              </Link>
              <Link
                to="/login"
                className="text-foreground hover:text-petshop-purple flex items-center"
              >
                <LogIn className="mr-1 h-4 w-4" />
                Login
              </Link>
              <Link to="/cart" className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-petshop-purple text-petshop-purple hover:bg-petshop-purple/10"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-petshop-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </nav>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/cart" className="relative mr-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-petshop-purple text-petshop-purple hover:bg-petshop-purple/10"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-petshop-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-white z-30 p-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-lg py-2 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#pets"
                className="text-lg py-2 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/login"
                className="text-lg py-2 border-b flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
