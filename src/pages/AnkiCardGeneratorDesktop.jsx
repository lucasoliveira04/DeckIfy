import { FaTrash } from "react-icons/fa6";
import { AlertMessage } from "../components/alertMessage";
import LoadingModal from "../components/loadingPage";
import ModalIA from "../components/modal-IA";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";

const AnkiCardGeneratorDesktop = () => {
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
    removeCard,
    removeAllCard,
    loading,
    progress,
    alert,
    isModalOpen,
    openModal,
    closeModal,
    searchQuery,
    setSearchQuery,
    highlightText,
  } = useAnkiCardGenerator();

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading && <LoadingModal progress={progress} />}

      {alert && (
        <AlertMessage message={alert.message} typeMessage={alert.typeMessage} />
      )}

      <div className="flex flex-row p-6 bg-white rounded-lg shadow-md h-screen border">
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
          <div className="flex flex-col w-full justify-between items-center p-4 bg-white rounded-md shadow-md mb-4">
            <div className="flex mb-4 w-full justify-between">
              <div className="">
                <h2 className="text-xl font-semibold text-gray-800 mb-0">
                  Pré-visualização
                </h2>
              </div>

              <div>
                <button
                  onClick={removeAllCard}
                  className="text-sm text-red-600 hover:text-red-700 focus:outline-none transition-all duration-300 cursor-pointer"
                >
                  Apagar todos os Cards
                  <hr className="bg-red-950" />
                </button>
              </div>
            </div>

            <div className="flex w-full">
              <input
                type="text"
                placeholder="Filtrar cartão"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
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

export default AnkiCardGeneratorDesktop;
