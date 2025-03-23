import AnkiCardGenerator from "../components/ankiCardGenerator";
import { HeaderComponent } from "../components/header";

export const HomePage = () => {
  return (
    <div>
      <HeaderComponent />
      <AnkiCardGenerator />
    </div>
  );
};
