import { Route, Routes } from "react-router-dom";

import { CreatedDackPage } from "../pages/CreatedDackPage";
import { HomePage } from "./Home";

export const AppRoutes = () => {
  // const { cards } = UseDeck();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (cards.length > 0) {
  //     navigate("/createdDeck");
  //   }
  // }, [cards, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createdDeck" element={<CreatedDackPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
