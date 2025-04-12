import { FaArrowLeft } from "react-icons/fa";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import { useCardGeneration } from "../hook/useCardGenerationAI";
import { UseDeck } from "../hook/useDeck";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertMessage } from "./alertMessage";
import AnkiCardCarousel from "./AnkiCardCarousel";
import LoadingModal from "./loadingPage";

export const FormDeckWithIA = ({ setActiveForm }) => {
  const { addMultipleCards } = UseDeck();
  const [contexto, setContexto] = useState("");
  const [quantityCards, setQuantityCards] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState({ message: "", typeMessage: "" });

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
    loading: loadingGenerator,
    progress,
    alert,
    isModalOpen,
    openModal,
    closeModal,
    searchQuery,
    setSearchQuery,
  } = useAnkiCardGenerator();

  const handleArrowClick = () => {
    setActiveForm(null);
  };

  const maxCards = 20;

  const handleContextoChange = (e) => {
    setContexto(e.target.value);
  };

  const handleQuantityChange = (e) => {
    let value = Math.max(1, e.target.value);
    value = Math.min(maxCards, value);
    setQuantityCards(value);
  };

  const handleGenerate = async () => {
    if (!contexto.trim()) {
      setShowAlert(true);
      setAlertType({ message: "Erro", typeMessage: "error" });
      return;
    }

    setShowAlert(false);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-dackify-ia-1.onrender.com/api/generate_quests",
        {
          context: contexto,
          quantidade_tasks: quantityCards,
        }
      );

      if (response.data.message === "Ok") {
        setShowAlert(true);
        setAlertType({ message: "Funciona", typeMessage: "success" });
        addMultipleCards(response.data.flashcards);
      } else {
        alert("Falha ao gerar cartões. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao gerar cartões:", error);
      alert("Falha ao gerar cartões. Verifique sua conexão.");
    }

    setLoading(false);
    closeModal();
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const isGenerateButtonDisabled = filteredCards.length === 0;
  const isGenertedTaskIA = !contexto;
  const disabledClass = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex flex-col items-center px-14">
      {loading && <LoadingModal progress={progress} />}
      {showAlert && (
        <AlertMessage
          message={alertType.message}
          typeMessage={alertType.typeMessage}
        />
      )}

      <div className="flex w-full justify-between items-center">
        <button>
          <FaArrowLeft onClick={handleArrowClick} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold mb-8 pr-36 mx-auto pt-2 overflow-hidden">
            Nome do Deck: {deckName}
          </h2>
        </div>
      </div>

      {/* Titulo */}
      <div className="flex flex-col w-full space-y-6 pt-10">
        <div className="flex flex-row w-full gap-10">
          <input
            type="text"
            placeholder="Nome do Deck Aqui"
            onChange={(e) => setDeckName(e.target.value)}
            className="w-[90%] h-12 text-center self-center font-inter placeholder:text-gray-400 placeholder:shadow-3d border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 transition-all duration-300"
          />

          <div className="flex flex-col mb-6 w-full">
            <label htmlFor="quantityCards" className="text-sm text-gray-600">
              Quantidade de Cartões
            </label>
            <input
              type="number"
              id="quantityCards"
              value={quantityCards}
              onChange={handleQuantityChange}
              min={1}
              inputMode="numeric"
              className="w-[20%] p-2 bg-blue-50 text-gray-800 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <textarea
            id="contexto"
            onChange={handleContextoChange}
            className="w-full h-44 p-2 bg-white text-gray-800 rounded-md border border-green-500 focus:outline-none focus:border-green-700 transition-all duration-300"
            placeholder="Digite um resumo do conteúdo..."
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 gap-10">
        <button
          className={`w-44 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isGenertedTaskIA ? disabledClass : ""
          }`}
          onClick={handleGenerate}
          disabled={isGenertedTaskIA}
        >
          Gerar perguntas
        </button>

        <div className="flex gap-2">
          <button
            className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isGenerateButtonDisabled ? disabledClass : ""
            }`}
            onClick={handleFileUpload}
            disabled={isGenerateButtonDisabled}
          >
            {loading ? "Gerando..." : "Gerar Deck"}
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
    </div>
  );
};
