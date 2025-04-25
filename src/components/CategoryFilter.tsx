
import { Button } from "@/components/ui/button";
import { usePetShop } from "@/context/PetShopContext";
import { PetCategory } from "@/types/PetTypes";
import { Dog, Cat, Bird, Rabbit } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CategoryFilter = () => {
  const { filterByCategory, activeCategory } = usePetShop();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const categoryParam = searchParams.get("category") as PetCategory | null;
    if (categoryParam) {
      filterByCategory(categoryParam);
    } else {
      filterByCategory("all");
    }
  }, [searchParams, filterByCategory]);

  const handleCategoryChange = (category: PetCategory | "all") => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const categories = [
    { id: "all", name: "All Pets", icon: null },
    { id: "dog", name: "Dogs", icon: Dog },
    { id: "cat", name: "Cats", icon: Cat },
    { id: "bird", name: "Birds", icon: Bird },
    { id: "small-pet", name: "Small Pets", icon: Rabbit },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Browse by Category</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              onClick={() => handleCategoryChange(category.id as PetCategory | "all")}
              variant={isActive ? "default" : "outline"}
              className={`rounded-full px-5 ${
                isActive
                  ? "bg-petshop-purple hover:bg-petshop-dark-purple"
                  : "border-petshop-purple text-petshop-purple hover:bg-petshop-gray hover:text-petshop-purple"
              }`}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
