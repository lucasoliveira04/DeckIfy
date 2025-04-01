import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
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

          <div className="flex space-x-4">
            <Link to="https://github.com/lucasoliveira04" target="_blank">
              <FaGithub className="text-xl hover:opacity-50" />
            </Link>
            <Link
              to="https://www.instagram.com/lucasoliveira.04_/"
              target="_blank"
            >
              <FaInstagram className="text-xl hover:opacity-50" />
            </Link>
            <Link to="https://x.com/lucasoli04" target="_blank">
              <FaTwitter className="text-xl hover:opacity-50" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};
