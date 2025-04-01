import { useEffect, useState } from "react";
import AnkiCardGeneratorDesktop from "../pages/AnkiCardGeneratorDesktop";
import { AnkiCardGeneratorMobile } from "../pages/AnkiCardGeneratorMobile";

const AnkiCardGenerator = () => {
  const [isMobile, setMobile] = useState(window.innerWidth <= 1250);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 1250);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <AnkiCardGeneratorMobile /> : <AnkiCardGeneratorDesktop />;
};

export default AnkiCardGenerator;
