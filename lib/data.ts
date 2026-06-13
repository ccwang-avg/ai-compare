import products from "@/data/products.json";
import cases from "@/data/cases.json";
import type { Product, UseCase } from "@/lib/types";

export function getProducts(): Product[] {
  return products as Product[];
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function getUseCases(): UseCase[] {
  return cases as UseCase[];
}
