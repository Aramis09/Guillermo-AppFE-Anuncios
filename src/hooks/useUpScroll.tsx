import { useEffect } from "react";
import { useLocation } from "react-router-dom";
//?este hook pone el scrool arriba del todo cuando se cambia la location, no se porque a veces no pasa
export default function useUpScroll() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}
