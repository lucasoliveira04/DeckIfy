
import { UseDeck } from "../hook/useDeck";

export const HeaderComponent = () => {
  const { deckName, cards } = UseDeck();

  return (
    <div>
      <header className="w-full bg-gray-800 text-white p-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto items-center">
            <div className="flex-1">
              <p>
                Nome do Deck:
                <span> {deckName}</span>
              </p>
            </div>

            <div className="flex-1">
              <p>
                Quantidade de perguntas:
                <span> {cards.length}</span>
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
