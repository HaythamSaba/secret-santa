import { useContext } from "react";
import secretSantaContext from "../context/SecretSantaContext";

export function useSecretSanta() {
  const context = useContext(secretSantaContext);
  if (!context) {
    throw new Error("useSecretSanta must be used within SecretSantaProvider");
  }
  return context;
}
