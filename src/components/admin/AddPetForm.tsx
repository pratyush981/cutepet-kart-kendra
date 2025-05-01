
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { usePetShop } from "@/context/PetShopContext";
import { PetCategory } from "@/types/PetTypes";

const AddPetForm = () => {
  const { addPet } = usePetShop();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [petData, setPetData] = useState({
    name: "",
    category: "" as PetCategory,
    image: "",
    price: "",
    description: "",
    age: "",
    breed: "",
    likes: "",
    personality: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!petData.name || !petData.category || !petData.price || !petData.description || !petData.age || !petData.breed) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Parse price to number
      const price = parseFloat(petData.price);
      if (isNaN(price) || price <= 0) {
        toast({
          title: "Invalid price",
          description: "Please enter a valid price",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create new pet
      const newPet = {
        id: `pet-${Date.now()}`,
        name: petData.name,
        category: petData.category,
        image: petData.image || "https://placehold.co/400x300?text=Pet+Image",
        price,
        description: petData.description,
        age: petData.age,
        breed: petData.breed,
        likes: petData.likes,
        personality: petData.personality,
      };

      // Add the pet
      addPet(newPet);

      // Reset form
      setPetData({
        name: "",
        category: "" as PetCategory,
        image: "",
        price: "",
        description: "",
        age: "",
        breed: "",
        likes: "",
        personality: "",
      });

      toast({
        title: "Pet added successfully",
        description: `${newPet.name} has been added to the pet shop.`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding pet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Pet Name *</Label>
          <Input
            id="name"
            name="name"
            value={petData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Max"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={petData.category}
            onValueChange={(value) => handleSelectChange(value, "category")}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="bird">Bird</SelectItem>
              <SelectItem value="small-pet">Small Pet</SelectItem>
              <SelectItem value="exotic">Exotic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="breed">Breed *</Label>
          <Input
            id="breed"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            required
            placeholder="e.g., Golden Retriever"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            name="age"
            value={petData.age}
            onChange={handleChange}
            required
            placeholder="e.g., 2 years"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={petData.price}
            onChange={handleChange}
            required
            placeholder="e.g., 10000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={petData.image}
            onChange={handleChange}
            placeholder="https://example.com/pet-image.jpg"
          />
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={petData.description}
            onChange={handleChange}
            required
            placeholder="Describe the pet..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="likes">Likes</Label>
          <Input
            id="likes"
            name="likes"
            value={petData.likes}
            onChange={handleChange}
            placeholder="e.g., Playing fetch, cuddles"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="personality">Personality</Label>
          <Input
            id="personality"
            name="personality"
            value={petData.personality}
            onChange={handleChange}
            placeholder="e.g., Friendly, energetic"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-petshop-purple hover:bg-petshop-dark-purple"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding Pet..." : "Add Pet"}
      </Button>
    </form>
  );
};

export default AddPetForm;
