import { PERSONA_LABELS, type MatchLevel, type Persona, type Product } from "./types";

export function matchPersona(product: Product, persona: Persona): MatchLevel {
  if (persona === "all") {
    return "low";
  }

  const label = PERSONA_LABELS[persona];

  if (product.targetUsers.includes(label)) {
    return "high";
  }

  if (product.targetUsers.includes("通用用户")) {
    return "medium";
  }

  return "low";
}

export function shouldShowPersonaMatch(persona: Persona): boolean {
  return persona !== "all";
}
