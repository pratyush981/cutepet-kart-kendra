
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { usePetShop } from "@/context/PetShopContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const PetDetailsPage = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { pets, addToCart } = usePetShop();
  
  const pet = pets.find(p => p.id === petId);
  
  if (!pet) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Pet not found</h1>
          <p className="text-muted-foreground mb-6">Sorry, we couldn't find the pet you're looking for.</p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-petshop-purple hover:bg-petshop-dark-purple"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={pet.image} 
              alt={pet.name} 
              className="w-full h-[400px] object-cover" 
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
            <div className="flex items-center mb-4">
              <span className="bg-petshop-purple/10 text-petshop-purple px-3 py-1 rounded-full text-sm font-medium">
                {pet.category === "small-pet" ? "Small Pet" : pet.category.charAt(0).toUpperCase() + pet.category.slice(1)}
              </span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-muted-foreground">{pet.breed}</span>
            </div>
            
            <div className="mb-6">
              <p className="text-3xl font-bold text-petshop-purple mb-1">
                ₹{pet.price.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Includes basic starter kit and vaccination</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">About {pet.name}</h2>
              <p className="text-muted-foreground">{pet.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-petshop-gray p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{pet.age}</p>
              </div>
              <div className="bg-petshop-gray p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Breed</p>
                <p className="font-medium">{pet.breed}</p>
              </div>
            </div>
            
            <Button 
              onClick={() => addToCart(pet)}
              className="w-full bg-petshop-purple hover:bg-petshop-dark-purple"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Care Instructions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Feeding</h3>
              <p className="text-muted-foreground">
                {pet.category === "dog" && "Feed your dog premium quality dog food 2-3 times a day. Always provide fresh water."}
                {pet.category === "cat" && "Feed your cat premium quality cat food 2-3 times a day. Always provide fresh water."}
                {pet.category === "bird" && "Provide a mix of seeds, pellets, and fresh fruits/vegetables daily. Always provide fresh water."}
                {pet.category === "small-pet" && "Feed your pet specialized food designed for their species. Always provide fresh water."}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Housing</h3>
              <p className="text-muted-foreground">
                {pet.category === "dog" && "Provide a comfortable bed in a quiet area. Allow outdoor time daily for exercise."}
                {pet.category === "cat" && "Provide a litter box, scratching post, and cozy sleeping area. Cats enjoy elevated resting spots."}
                {pet.category === "bird" && "Keep the cage in a bright area away from drafts. Provide perches of varying thickness and toys."}
                {pet.category === "small-pet" && "Provide a spacious cage with bedding, hiding spots, and toys. Keep in a quiet area."}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Health Care</h3>
              <p className="text-muted-foreground">
                {pet.category === "dog" && "Regular vet check-ups, vaccines, and parasite prevention are essential. Exercise daily."}
                {pet.category === "cat" && "Regular vet check-ups, vaccines, and parasite prevention are essential. Keep indoors for safety."}
                {pet.category === "bird" && "Regular vet check-ups with an avian specialist. Keep the cage clean and provide fresh air."}
                {pet.category === "small-pet" && "Find a vet who specializes in exotic pets. Monitor diet, behavior, and maintain clean habitat."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PetDetailsPage;
