import AnkiCardGenerator from "../components/ankiCardGenerator";
import { FooterComponent } from "../components/footer";
import { HeaderComponent } from "../components/header";

export const CreatedDackPage = () => {
  return (
    <div className="flex flex-col">
      <HeaderComponent />
      <AnkiCardGenerator />
      <FooterComponent />
    </div>
  );
};
