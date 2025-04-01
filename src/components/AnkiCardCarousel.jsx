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
    <div className="relative">
      {filteredCards.length === 0 ? (
        <p className="text-gray-500">Nenhum cartão adicionado.</p>
      ) : (
        <div className="flex justify-center items-center">
          {/* Botão de navegação anterior */}
          <button
            onClick={prevCard}
            className="absolute left-0 p-4 bg-gray-800 border text-white rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            &lt;
          </button>

          {/* Exibindo apenas o cartão atual */}
          <div className="w-80 p-4  bg-white rounded-md shadow-md">
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

          {/* Botão de navegação próximo */}
          <button
            onClick={nextCard}
            className="absolute right-0 p-4 bg-gray-800 border text-white rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default AnkiCardCarousel;
