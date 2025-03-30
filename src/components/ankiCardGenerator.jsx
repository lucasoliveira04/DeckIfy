import { useEffect, useState } from "react";
import { generateApkg } from "../services/generateApkg";
import { UseDeck } from "../hook/useDeck";
import { FaTrash } from "react-icons/fa6";
import LoadingModal from "./loadingPage";
import { AlertMessage } from "./alertMessage";
import ModalIA from "./modal-IA";

const AnkiCardGenerator = () => {
  const { deckName, setDeckName, cards, addCard, removeCard, removeAllCard } =
    UseDeck();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [frontInput, setFrontInput] = useState("");
  const [backInput, setBackInput] = useState("");
  const [alert, setAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [alert]);

  const handleFileUpload = async () => {
    if (cards.length === 0) {
      setAlert({
        message: "Crie no mínimo 1 cartão.",
        typeMessage: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await generateApkg(deckName, cards, setProgress);
      setAlert({
        message: `Cartão criado com sucesso!`,
        typeMessage: "success",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = () => {
    if (frontInput.trim() === "" || backInput.trim() === "") {
      alert("Preencha ambos os campos antes de adicionar um cartão.");
      return;
    }

    addCard(frontInput, backInput);
    setFrontInput("");
    setBackInput("");
  };

  const filteredCards = cards.filter(
    (card) =>
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearCards = () => {
    console.log("A");
    removeAllCard();
  };

  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-green-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1020) {
        console.log("Resolução é 1023px");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading && <LoadingModal progress={progress} />}

      {alert && (
        <AlertMessage message={alert.message} typeMessage={alert.typeMessage} />
      )}

      <div className="flex flex-col lg:flex-row p-6 bg-white rounded-lg shadow-md h-screen border">
        <div className="flex flex-col gap-6 lg:w-1/2 w-full border p-5">
          <div>
            <button
              onClick={openModal}
              className="h-[50px] w-full lg:w-[200px] cursor-pointer border bg-blue-600 m-2 rounded-2xl text-xl uppercase font-semibold text-white hover:bg-blue-700 transition-all duration-300"
            >
              Usar IA 🤖
            </button>
          </div>

          <div className="flex flex-col mb-6 m-2">
            <label className="text-lg font-semibold text-gray-700 mb-2">
              Nome do Deck
            </label>
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="w-full lg:w-[400px] py-3 px-4 bg-transparent border-b-2 hover:border-blue-500 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-900 rounded-md transition-all duration-300"
              placeholder="Digite o nome do seu deck..."
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                Frente
              </label>
              <textarea
                className="w-full lg:w-[400px] h-32 p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none"
                value={frontInput}
                onChange={(e) => setFrontInput(e.target.value)}
                placeholder="Coloque a pergunta aqui..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                Verso
              </label>
              <textarea
                className="w-full lg:w-[400px] h-42 p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none"
                value={backInput}
                onChange={(e) => setBackInput(e.target.value)}
                placeholder="Coloque a resposta aqui..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row justify-center p-6 gap-4">
              <button
                onClick={handleAddCard}
                className="h-[50px] w-full sm:w-[300px] cursor-pointer border bg-blue-600 m-2 rounded-2xl text-xl uppercase font-semibold text-white hover:bg-blue-700 transition-all duration-300"
              >
                Adicionar Cartão
              </button>

              <button
                onClick={handleFileUpload}
                className="h-[50px] w-full sm:w-[200px] cursor-pointer border bg-blue-600 m-2 rounded-2xl text-xl uppercase font-semibold text-white hover:bg-blue-700 transition-all duration-300"
              >
                {loading ? "Gerando..." : "Gerar Anki"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 border p-5 max-h-screen overflow-y-auto">
          <div className="flex w-full justify-between items-center p-4 bg-white rounded-md shadow-md mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-0">
                Pré-visualização
              </h2>
              <button
                onClick={handleClearCards}
                className="text-sm text-red-600 hover:text-red-700 focus:outline-none transition-all duration-300 cursor-pointer"
              >
                Apagar todos os Cards
              </button>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Filtrar cartão"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[250px] py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {filteredCards.length === 0 ? (
            <p className="text-gray-500">Nenhum cartão adicionado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredCards.map((card, index) => (
                <div
                  key={index}
                  className={`p-4 mb-2 rounded-md shadow w-full cursor-pointer hover:bg-gray-100 transition-all`}
                >
                  <div className="flex justify-end">
                    <FaTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCard(index);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-300"
                    />
                  </div>

                  <p className="font-semibold break-words select-text hover:bg-gray-200 p-1 rounded-md">
                    Frente: {highlightText(card.front, searchQuery)}
                  </p>
                  <p className="text-gray-600 break-words select-text hover:bg-gray-200 p-1 rounded-md">
                    Verso: {highlightText(card.back, searchQuery)}
                  </p>

                  {card.isIA && (
                    <div className="flex justify-end">
                      <span
                        className="text-gray-600 text-xl ml-2"
                        title="Gerado com IA"
                      >
                        🤖
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ModalIA isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default AnkiCardGenerator;
