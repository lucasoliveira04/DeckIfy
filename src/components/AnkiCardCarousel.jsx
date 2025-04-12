import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import { FaTrash } from "react-icons/fa6";
import { useCarousel } from "../hook/useCarousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AnkiCardCarousel = ({ filteredCards }) => {
  const { highlightText, removeCard, searchQuery } = useAnkiCardGenerator();
  const { currentItem, currentIndex, next, prev, hasItems, total } =
    useCarousel(filteredCards);

  if (!hasItems) {
    return <p className="text-gray-500">Nenhum cartão adicionado.</p>;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-full">
      <div className="relative w-full p-4 bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-2">
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              removeCard(currentIndex);
            }}
            className="cursor-pointer text-red-500 hover:text-red-600"
          />
        </div>

        {/* Frente */}
        <p className="font-semibold text-gray-800 whitespace-normal break-words">
          Frente: {highlightText(currentItem.front, searchQuery)}
        </p>

        {/* Verso */}
        <p className="text-gray-600 whitespace-normal break-words">
          Verso: {highlightText(currentItem.back, searchQuery)}
        </p>
      </div>

      <div className="flex space-x-6 mt-4">
        <button onClick={prev}>
          <FaArrowLeft className="text-2xl text-blue-500 hover:text-blue-700" />
        </button>
        <span className="text-gray-600">
          {currentIndex + 1} / {total}
        </span>
        <button onClick={next}>
          <FaArrowRight className="text-2xl text-blue-500 hover:text-blue-700" />
        </button>
      </div>
    </div>
  );
};

export default AnkiCardCarousel;
