
import { Button } from "@/components/ui/button";
import { usePetShop } from "@/context/PetShopContext";
import { SortOption } from "@/types/PetTypes";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

const SortOptions = () => {
  const { sortPets, activeSortOption } = usePetShop();

  const options: { value: SortOption; label: string; icon?: React.ReactNode }[] = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z", icon: <ArrowDownAZ className="h-4 w-4" /> },
    { value: "name-desc", label: "Name: Z to A", icon: <ArrowUpAZ className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => sortPets(option.value)}
          variant={activeSortOption === option.value ? "default" : "outline"}
          className="rounded-full"
        >
          {option.icon && <span className="mr-2">{option.icon}</span>}
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default SortOptions;
