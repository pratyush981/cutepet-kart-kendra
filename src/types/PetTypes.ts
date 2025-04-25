
export interface Pet {
  id: string;
  name: string;
  category: PetCategory;
  image: string;
  price: number;
  description: string;
  age: string;
  breed: string;
}

export type PetCategory = 'dog' | 'cat' | 'bird' | 'small-pet' | 'exotic';

export interface CartItem {
  pet: Pet;
  quantity: number;
}

export type SortOption = 'price-low' | 'price-high' | 'name-asc' | 'name-desc' | 'age-low' | 'age-high';
