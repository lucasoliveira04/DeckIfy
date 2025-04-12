import { FaArrowLeft } from "react-icons/fa";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import AnkiCardCarousel from "./AnkiCardCarousel";

export const FormForTestingNotIA = ({ setActiveForm }) => {
  const {
    deckName,
    setDeckName,
    frontInput,
    setFrontInput,
    backInput,
    setBackInput,
    filteredCards,
    handleFileUpload,
    handleAddCard,
    removeAllCard,
    loading,
    progress,
    alert,
    isModalOpen,
    openModal,
    closeModal,
    searchQuery,
    setSearchQuery,
  } = useAnkiCardGenerator();

  const isGenerateButtonDisabled = !deckName || filteredCards.length === 0;
  const isAddCardButtonDisabled = !frontInput || !backInput;
  const disabledClass = "opacity-50 cursor-not-allowed";

  const handleArrowClick = () => {
    setActiveForm(null);
  };

  return (
    <div className="flex flex-col h-full items-center px-14">
      <div className="flex w-full justify-between items-center">
        <button>
          <FaArrowLeft onClick={handleArrowClick} />
        </button>
        <h2 className="text-3xl font-semibold mb-8 pr-20 mx-auto pt-2">
          Nome do Deck: {deckName}
        </h2>
      </div>

      <div className="flex flex-col w-full space-y-6 pt-10">
        <input
          type="text"
          placeholder="Nome do Deck Aqui"
          onChange={(e) => setDeckName(e.target.value)}
          className="w-[50%] h-12 text-center self-center font-inter placeholder:text-gray-400 placeholder:shadow-3d border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 transition-all duration-300"
        />

        <div className="space-y-4">
          {/* Input de Frente */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Frente
            </label>
            <textarea
              className="w-full h-56 p-2 bg-white text-gray-800 rounded-md border border-green-500 focus:outline-none focus:border-green-700 transition-all duration-300"
              value={frontInput}
              onChange={(e) => setFrontInput(e.target.value)}
              placeholder="Coloque a pergunta aqui..."
            ></textarea>
          </div>

          {/* Input de Verso */}
          <div>
            <label className="text-lg font-semibold text-gray-700">Verso</label>
            <textarea
              className="w-full h-56 p-2 bg-white text-gray-800 rounded-md border border-green-500 focus:outline-none focus:border-green-700 transition-all duration-300"
              value={backInput}
              onChange={(e) => setBackInput(e.target.value)}
              placeholder="Coloque a resposta aqui..."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex space-x-10 mt-5">
        <button
          className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isGenerateButtonDisabled ? disabledClass : ""
          }`}
          onClick={handleFileUpload}
          disabled={isGenerateButtonDisabled}
        >
          Gerar Deck
        </button>
        <button
          className={`px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 ${
            isAddCardButtonDisabled ? disabledClass : ""
          }`}
          onClick={handleAddCard}
          disabled={isAddCardButtonDisabled}
        >
          Adicionar ao Deck
        </button>
        <button
          onClick={openModal}
          className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Pré visualização
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
              Pré visualização
            </h1>

            <AnkiCardCarousel filteredCards={filteredCards} />

            <button
              onClick={closeModal}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
