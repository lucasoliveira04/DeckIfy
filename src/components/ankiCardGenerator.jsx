import { useState } from "react";
import { generateApkg } from "../services/generateApkg";
import { UseDeck } from "../hook/useDeck";
import { FaTrash } from "react-icons/fa6";
import LoadingModal from "./loadingPage";

const AnkiCardGenerator = () => {
  const { deckName, setDeckName, cards, addCard, removeCard } = UseDeck();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [frontInput, setFrontInput] = useState("");
  const [backInput, setBackInput] = useState("");

  const handleFileUpload = async () => {
    setLoading(true);
    try {
      await generateApkg(deckName, cards, setProgress);
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {loading && <LoadingModal progress={progress} />}

      <div className="flex p-6 bg-white rounded-lg shadow-md h-screen border">
        <div className="flex flex-col gap-6 w-[50%] border p-5">
          <div>
            <button className="h-[50px] w-[200px] cursor-pointer border bg-violet-600 m-2 rounded-2xl text-2xl uppercase font-semibold text-white hover:bg-violet-700 transition-all duration-300">
              Usar IA 🤖
            </button>
          </div>

          <div className="flex flex-col mb-6 m-2">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-800 mb-2">
              Nome do Deck
            </label>
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="peer w-[400px] py-3 px-4 bg-transparent border-b-2 hover:border-blue-600 hover:cursor-default border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 dark:text-black rounded-md transition-all duration-300"
              placeholder="Digite o nome do seu deck..."
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-700 dark:text-gray-800 mb-2">
                Frente
              </label>
              <textarea
                className="w-[400px] h-32 p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-0 transition-all duration-300 resize-none"
                value={frontInput}
                onChange={(e) => setFrontInput(e.target.value)}
                placeholder="Coloque a pergunta aqui..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-gray-700 dark:text-gray-800 mb-2">
                Verso
              </label>
              <textarea
                className="w-[400px] h-42 p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-0 transition-all duration-300 resize-none"
                value={backInput}
                onChange={(e) => setBackInput(e.target.value)}
                placeholder="Coloque a resposta aqui..."
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[50%] border p-5">
          <h2 className="text-xl font-semibold mb-4">Pré-visualização</h2>
          {cards.length === 0 ? (
            <p className="text-gray-500">Nenhum cartão adicionado.</p>
          ) : (
            cards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-4 mb-2 rounded-md shadow w-[400px] cursor-pointer hover:bg-gray-100 transition-all"
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

                <p className="font-semibold break-words">
                  Frente: {card.front}
                </p>
                <p className="text-gray-600 break-words">Verso: {card.back}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-center p-6 bg-blue-100">
        <button
          onClick={handleAddCard}
          className="h-[50px] w-[300px] cursor-pointer border bg-violet-600 m-2 rounded-2xl text-2xl uppercase font-semibold text-white hover:bg-violet-700 transition-all duration-300"
        >
          Adicionar Cartão
        </button>

        <button
          onClick={handleFileUpload}
          className="h-[50px] w-[200px] cursor-pointer border bg-violet-600 m-2 rounded-2xl text-2xl uppercase font-semibold text-white hover:bg-violet-700 transition-all duration-300"
        >
          {loading ? "Gerando..." : "Gerar Anki"}
        </button>
      </div>
    </div>
  );
};

export default AnkiCardGenerator;
