import MenuClient from "./MenuClient";
import { products } from "@/lib/products";

export const metadata = {
  title: "Meniu — Donut Studio",
  description: "Descoperă toate aromele noastre artizanale de gogoși premium.",
};

export default function MenuPage() {
  return <MenuClient products={products} />;
}
