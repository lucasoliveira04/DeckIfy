import { Route, Routes, useNavigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { CreatedDackPage } from "../pages/CreatedDackPage";
import { UseDeck } from "../hook/useDeck";
import { useEffect } from "react";

export const AppRoutes = () => {
  const { cards } = UseDeck();
  const navigate = useNavigate();

  useEffect(() => {
    if (cards.length > 0) {
      navigate("/createdDeck");
    }
  }, [cards, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createdDeck" element={<CreatedDackPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};
