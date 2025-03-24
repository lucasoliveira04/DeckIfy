import "./styles/fonts.css";
import "./styles/globals.css";
import { AppRoutes } from "./routes";
import { DeckProvider } from "./context/DeckProvider";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <DeckProvider>
          <AppRoutes />
        </DeckProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
