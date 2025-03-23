import "./styles/fonts.css";
import "./styles/globals.css";
import { AppRoutes } from "./routes";
import { DeckProvider } from "./context/DeckProvider";

function App() {
  return (
    <>
      <DeckProvider>
        <AppRoutes />
      </DeckProvider>
    </>
  );
}

export default App;
