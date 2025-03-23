import AnkiCardGenerator from "../components/ankiCardGenerator";
import { FooterComponent } from "../components/footer";
import { HeaderComponent } from "../components/header";

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeaderComponent />
      <div>
        <AnkiCardGenerator />
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
};
