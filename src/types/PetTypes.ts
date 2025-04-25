
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

export type PetCategory = 'dog' | 'cat' | 'bird' | 'small-pet';

export interface CartItem {
  pet: Pet;
  quantity: number;
}
