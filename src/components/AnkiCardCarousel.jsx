import { useState } from "react";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import { FaTrash } from "react-icons/fa6";

const AnkiCardCarousel = ({ filteredCards }) => {
  const { highlightText, removeCard, searchQuery } = useAnkiCardGenerator();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === filteredCards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? filteredCards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {filteredCards.length === 0 ? (
        <p className="text-gray-500">Nenhum cartão adicionado.</p>
      ) : (
        <div className="flex flex-col items-center w-full max-w-full">
          {/* Card atual */}
          <div className="relative w-full p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  removeCard(currentCardIndex);
                }}
                className="cursor-pointer text-red-500 hover:text-red-600"
              />
            </div>

            <p className="font-semibold text-gray-800">
              Frente:{" "}
              {highlightText(
                filteredCards[currentCardIndex].front,
                searchQuery
              )}
            </p>
            <p className="text-gray-600">
              Verso:{" "}
              {highlightText(filteredCards[currentCardIndex].back, searchQuery)}
            </p>

            {filteredCards[currentCardIndex].isIA && (
              <div className="flex justify-end">
                <span className="text-gray-600 text-xl">🤖</span>
              </div>
            )}
          </div>

          {/* Botões de navegação */}
          <div className="flex justify-between w-full max-w-full mt-4">
            <button
              onClick={prevCard}
              className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            >
              &lt;
            </button>

            <button
              onClick={nextCard}
              className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnkiCardCarousel;
