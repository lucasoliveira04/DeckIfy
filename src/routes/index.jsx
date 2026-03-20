import { Route, Routes } from "react-router-dom";

import { CreatedDackPage } from "../pages/CreatedDackPage";
import HomePage from "../components/home";

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createdDeck" element={<CreatedDackPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
