export interface Nutrition {
  kcal: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  calories: number;
  category: "classic" | "fruity" | "premium";
  available: boolean;
  nutrition: {
    perServing: Nutrition;
    per100g: Nutrition;
  };
}
