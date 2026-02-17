import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Défilement instantané vers le haut à chaque changement d'URL
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;