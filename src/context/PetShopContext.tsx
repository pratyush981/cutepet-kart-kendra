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
}

const PetShopContext = createContext<PetShopContextType | undefined>(undefined);

// Sample pet data
const petsData: Pet[] = [
  {
    id: "dog1",
    name: "Raja",
    category: "dog",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    price: 15000,
    description: "A playful Labrador retriever who loves to run and fetch.",
    age: "2 years",
    breed: "Labrador Retriever"
  },
  {
    id: "dog2",
    name: "Sheru",
    category: "dog",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
    price: 12000,
    description: "An energetic Beagle who loves to play with toys.",
    age: "1 year",
    breed: "Beagle"
  },
  {
    id: "dog3",
    name: "Moti",
    category: "dog",
    image: "https://images.unsplash.com/photo-1583511655826-05700a84f4c8",
    price: 18000,
    description: "A gentle Golden Retriever who loves everyone.",
    age: "3 years",
    breed: "Golden Retriever"
  },
  {
    id: "cat1",
    name: "Billi",
    category: "cat",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    price: 8000,
    description: "A curious Siamese cat who loves to explore.",
    age: "1 year",
    breed: "Siamese"
  },
  {
    id: "cat2",
    name: "Rani",
    category: "cat",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5",
    price: 9500,
    description: "A lazy Persian cat who loves to sleep all day.",
    age: "2 years",
    breed: "Persian"
  },
  {
    id: "cat3",
    name: "Mittens",
    category: "cat",
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d",
    price: 7500,
    description: "A playful domestic cat with a love for toys.",
    age: "8 months",
    breed: "Domestic Shorthair"
  },
  {
    id: "bird1",
    name: "Mithu",
    category: "bird",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3",
    price: 5000,
    description: "A colorful parrot who can mimic sounds.",
    age: "1 year",
    breed: "Indian Ringneck Parrot"
  },
  {
    id: "bird2",
    name: "Chitti",
    category: "bird",
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890",
    price: 3000,
    description: "A melodious canary with beautiful song.",
    age: "6 months",
    breed: "Canary"
  },
  {
    id: "bird3",
    name: "Rio",
    category: "bird",
    image: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f",
    price: 6000,
    description: "A beautiful Blue Macaw with vibrant feathers.",
    age: "2 years",
    breed: "Blue Macaw"
  },
  {
    id: "small1",
    name: "Chuha",
    category: "small-pet",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca",
    price: 1500,
    description: "An adorable hamster who loves to run on his wheel.",
    age: "3 months",
    breed: "Syrian Hamster"
  },
  {
    id: "small2",
    name: "Bunty",
    category: "small-pet",
    image: "https://images.unsplash.com/photo-1591561582301-7ce6588cc286",
    price: 4000,
    description: "A fluffy rabbit who loves to hop around.",
    age: "8 months",
    breed: "Holland Lop Rabbit"
  },
  {
    id: "small3",
    name: "Tommy",
    category: "small-pet",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c",
    price: 2500,
    description: "A curious guinea pig who loves fresh vegetables.",
    age: "1 year",
    breed: "American Guinea Pig"
  }
];

export const PetShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets] = useState<Pet[]>(petsData);
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
    if (category === 'all') {
      setFilteredPets(pets);
    } else {
      setFilteredPets(pets.filter(pet => pet.category === category));
    }
  };

  const sortPets = (option: SortOption) => {
    setActiveSortOption(option);
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
      default:
        return result;
    }
  }, [pets, activeCategory, activeSortOption]);

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
    activeSortOption
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
