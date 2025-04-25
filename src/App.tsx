
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PetShopProvider } from "./context/PetShopContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import SuccessPage from "./pages/SuccessPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PetShopProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/pet/:petId" element={<PetDetailsPage />} />
            <Route path="/success" element={<SuccessPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PetShopProvider>
  </QueryClientProvider>
);

export default App;
