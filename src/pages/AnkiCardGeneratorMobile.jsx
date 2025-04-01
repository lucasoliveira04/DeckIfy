import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTrash } from "react-icons/fa6";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import ModalIA from "../components/modal-IA";
import LoadingModal from "../components/loadingPage";
import { AlertMessage } from "../components/alertMessage";
import AnkiCardCarousel from "../components/AnkiCardCarousel";

export const AnkiCardGeneratorMobile = () => {
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

  // Estado para controlar a visibilidade dos cartões
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // Função para alternar a visibilidade
  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {loading && <LoadingModal progress={progress} />}

      {alert && (
        <AlertMessage message={alert.message} typeMessage={alert.typeMessage} />
      )}

      <ModalIA isOpen={isModalOpen} closeModal={closeModal} />

      {/* Botões fixos */}
      <div className="flex gap-4 bottom-0 left-0 right-0 p-4 justify-center bg-gray-900">
        <Button
          onClick={openModal}
          className="transition-all duration-300 h-[50px] w-[60px] bg-blue-600 rounded-2xl text-white"
        >
          🤖
        </Button>
        <Button
          onClick={togglePreview} // Altera a visibilidade
          className="transition-all duration-300 h-[50px] w-[60px] bg-blue-600 rounded-2xl text-white"
        >
          📚
        </Button>
      </div>

      {/* Formulários para criar o deck */}
      <div className="flex flex-col p-4 space-y-4">
        <Input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-400 transition-all duration-300"
          placeholder="Digite o nome do seu deck..."
        />

        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Frente
            </label>
            <textarea
              className="w-full h-24 p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none"
              value={frontInput}
              onChange={(e) => setFrontInput(e.target.value)}
              placeholder="Coloque a pergunta aqui..."
            ></textarea>
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-700">Verso</label>
            <textarea
              className="w-full h-24 p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none"
              value={backInput}
              onChange={(e) => setBackInput(e.target.value)}
              placeholder="Coloque a resposta aqui..."
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Button
            onClick={handleAddCard}
            className="w-full py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Adicionar Cartão
          </Button>

          <Button
            onClick={handleFileUpload}
            className="w-full py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            {loading ? "Gerando..." : "Gerar Anki"}
          </Button>
        </div>
      </div>

      {/* Pré-visualização e cards */}
      {isPreviewVisible ? (
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Pré-visualização
            </h2>
            <Button
              onClick={removeAllCard}
              className="text-sm text-red-600 hover:text-red-700 focus:outline-none transition-all duration-300"
            >
              Apagar todos os Cards
            </Button>
          </div>

          <input
            type="text"
            placeholder="Filtrar cartões"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          />

          {/* Carrossel de Cartões */}
          <AnkiCardCarousel filteredCards={filteredCards} />
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Pré-visualização oculta. Clique no botão de visualização para mostrar
          os cartões.
        </p>
      )}
    </div>
  );
};

export default AnkiCardGeneratorMobile;
