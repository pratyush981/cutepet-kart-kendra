import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Pet, CartItem, PetCategory, SortOption } from "@/types/PetTypes";
import { toast } from "sonner";

interface PetShopContextType {
  pets: Pet[];
  cart: CartItem[];
  addToCart: (pet: Pet) => void;
  removeFromCart: (petId: string) => void;
  updateQuantity: (petId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
  filterByCategory: (category: PetCategory | 'all') => void;
  filteredPets: Pet[];
  activeCategory: PetCategory | 'all';
  sortPets: (option: SortOption) => void;
  activeSortOption: SortOption;
  addPet: (pet: Pet) => void;
}

const PetShopContext = createContext<PetShopContextType | undefined>(undefined);

// Sample pet data
const petsData: Pet[] = [
  // Dogs
  {
    id: "dog1",
    name: "Raja",
    category: "dog",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    price: 15000,
    description: "A playful Labrador retriever who loves to run and fetch. Raja enjoys swimming, playing with tennis balls, and cuddling with his humans. He's great with children and other pets.",
    age: "2 years",
    breed: "Labrador Retriever"
  },
  {
    id: "dog2",
    name: "Sheru",
    category: "dog",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    price: 12000,
    description: "An energetic Beagle who loves to play with toys. Sheru has a keen sense of smell and enjoys tracking scents. He's food-motivated and would make a great companion for an active family.",
    age: "1 year",
    breed: "Beagle"
  },
  {
    id: "dog4",
    name: "Bruno",
    category: "dog",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
    price: 20000,
    description: "A gentle German Shepherd with excellent guard dog instincts. Bruno is highly intelligent, easy to train, and incredibly loyal. He enjoys puzzle toys and agility training.",
    age: "1.5 years",
    breed: "German Shepherd"
  },
  {
    id: "dog5",
    name: "Lucy",
    category: "dog",
    image: "https://images.unsplash.com/photo-1615233500064-caa995e2f9dd",
    price: 22000,
    description: "A beautiful Husky with striking blue eyes. Lucy loves cold weather and is very vocal. She needs an active family who can provide lots of exercise and mental stimulation.",
    age: "8 months",
    breed: "Siberian Husky"
  },
  // Cats
  {
    id: "cat1",
    name: "Billi",
    category: "cat",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    price: 8000,
    description: "A curious Siamese cat who loves to explore. Billi is very vocal and will tell you all about her day. She enjoys window watching and playing with string toys.",
    age: "1 year",
    breed: "Siamese"
  },
  {
    id: "cat4",
    name: "Shadow",
    category: "cat",
    image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec",
    price: 6500,
    description: "A mysterious black cat with golden eyes. Shadow is quiet and dignified, enjoys peaceful naps in sunbeams, and is an excellent mouser. Perfect for those who appreciate elegant cats.",
    age: "3 years",
    breed: "Bombay"
  },
  {
    id: "cat5",
    name: "Luna",
    category: "cat",
    image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
    price: 12000,
    description: "A gorgeous Maine Coon with a luxurious coat. Luna is gentle despite her large size, loves being brushed, and gets along well with dogs. She's known for her chirping sounds.",
    age: "1.5 years",
    breed: "Maine Coon"
  },
  // Birds
  {
    id: "bird1",
    name: "Mithu",
    category: "bird",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3",
    price: 5000,
    description: "A colorful Indian Ringneck who can mimic sounds and words. Mithu loves dancing to music, enjoys head scratches, and has already learned several phrases. Very social and interactive.",
    age: "1 year",
    breed: "Indian Ringneck Parrot"
  },
  {
    id: "bird4",
    name: "Sunny",
    category: "bird",
    image: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55",
    price: 7500,
    description: "A vibrant Sun Conure with a bold personality. Sunny loves attention, makes great alarm clock with morning chirps, and enjoys learning tricks for treats. Very affectionate with family.",
    age: "9 months",
    breed: "Sun Conure"
  },
  {
    id: "bird5",
    name: "Koko",
    category: "bird",
    image: "https://images.unsplash.com/photo-1544181093-c712fb401bdc",
    price: 15000,
    description: "An intelligent African Grey Parrot. Koko has an extensive vocabulary and can mimic household sounds perfectly. Enjoys puzzle toys and requires mental stimulation.",
    age: "2 years",
    breed: "African Grey"
  },
  // Small Pets
  {
    id: "small1",
    name: "Chuha",
    category: "small-pet",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca",
    price: 1500,
    description: "An adorable hamster who loves to run on his wheel. Chuha enjoys collecting sunflower seeds, building intricate nests, and being hand-fed treats. Perfect first pet for responsible children.",
    age: "3 months",
    breed: "Syrian Hamster"
  },
  {
    id: "small4",
    name: "Pip",
    category: "small-pet",
    image: "https://images.unsplash.com/photo-1626176576506-1188be7c37c9",
    price: 3000,
    description: "A friendly gerbil who loves to dig tunnels. Pip is social, enjoys climbing, and makes an entertaining pet. Best kept in pairs or small groups for companionship.",
    age: "4 months",
    breed: "Mongolian Gerbil"
  },
  // Exotic Pets
  {
    id: "exotic1",
    name: "Ziggy",
    category: "exotic",
    image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47",
    price: 25000,
    description: "A captivating Bearded Dragon with a gentle temperament. Ziggy enjoys basking under his heat lamp, eating fresh vegetables, and being handled. Great for reptile enthusiasts.",
    age: "2 years",
    breed: "Central Bearded Dragon"
  },
  {
    id: "exotic2",
    name: "Monty",
    category: "exotic",
    image: "https://images.unsplash.com/photo-1582454235987-8ded7d90f5b7",
    price: 18000,
    description: "A beautiful Ball Python with stunning patterns. Monty is docile, easy to handle, and perfect for first-time snake owners. Enjoys exploring and gentle handling.",
    age: "3 years",
    breed: "Ball Python"
  },
  {
    id: "exotic3",
    name: "Flash",
    category: "exotic",
    image: "https://images.unsplash.com/photo-1584553421349-3557471bed79",
    price: 35000,
    description: "A rare Green Iguana with vibrant coloring. Flash enjoys climbing, basking in sunlight, and eating fresh greens. Requires specialized care and environment.",
    age: "4 years",
    breed: "Green Iguana"
  }
];

export const PetShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>(petsData);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<PetCategory | 'all'>('all');
  const [activeSortOption, setActiveSortOption] = useState<SortOption>('name-asc');

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('petShopCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('petShopCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pet: Pet) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.pet.id === pet.id);
      
      if (existingItem) {
        toast.success(`Added another ${pet.name} to your cart!`);
        return prevCart.map(item => 
          item.pet.id === pet.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        toast.success(`${pet.name} added to your cart!`);
        return [...prevCart, { pet, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (petId: string) => {
    setCart(prevCart => {
      const petToRemove = prevCart.find(item => item.pet.id === petId);
      if (petToRemove) {
        toast.success(`${petToRemove.pet.name} removed from your cart!`);
      }
      return prevCart.filter(item => item.pet.id !== petId);
    });
  };

  const updateQuantity = (petId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(petId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.pet.id === petId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Your cart has been cleared!');
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.pet.price * item.quantity), 0);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filterByCategory = (category: PetCategory | 'all') => {
    setActiveCategory(category);
  };

  const sortPets = (option: SortOption) => {
    setActiveSortOption(option);
  };

  // Helper function to parse age strings for comparison
  const parseAge = (ageString: string): number => {
    const years = /(\d+)\s*years?/.exec(ageString);
    const months = /(\d+)\s*months?/.exec(ageString);
    
    let totalMonths = 0;
    if (years) totalMonths += parseInt(years[1]) * 12;
    if (months) totalMonths += parseInt(months[1]);
    
    return totalMonths;
  };

  const filteredPets = useMemo(() => {
    let result = activeCategory === 'all' ? pets : pets.filter(pet => pet.category === activeCategory);

    switch (activeSortOption) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case 'age-low':
        return result.sort((a, b) => parseAge(a.age) - parseAge(b.age));
      case 'age-high':
        return result.sort((a, b) => parseAge(b.age) - parseAge(a.age));
      default:
        return result;
    }
  }, [pets, activeCategory, activeSortOption]);

  const addPet = (pet: Pet) => {
    setPets(prevPets => [...prevPets, pet]);
    toast.success(`${pet.name} has been added to the pet shop!`);
  };

  const value = {
    pets,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalAmount,
    totalItems,
    filterByCategory,
    filteredPets,
    activeCategory,
    sortPets,
    activeSortOption,
    addPet
  };

  return <PetShopContext.Provider value={value}>{children}</PetShopContext.Provider>;
};

export const usePetShop = () => {
  const context = useContext(PetShopContext);
  if (context === undefined) {
    throw new Error('usePetShop must be used within a PetShopProvider');
  }
  return context;
};
