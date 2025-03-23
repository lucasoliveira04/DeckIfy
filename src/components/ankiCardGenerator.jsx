import { useEffect } from "react";
import { generateApkg } from "../services/generateApkg";
import { FaTrash } from "react-icons/fa";
import { UseDeck } from "../hook/useDeck";

const AnkiCardGenerator = () => {
  const { deckName, setDeckName, cards, addCard, removeCard, updateCard } =
    UseDeck();

  const handleFileUpload = async () => {
    await generateApkg(deckName, cards);
  };

  useEffect(() => {}, [deckName, cards]);

  return (
    <div>
      <div className="container mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">
          Criador de Cartões Anki
        </h1>

        <div className="flex gap-8">
          <div className="w-2/3 p-6 bg-white shadow-lg rounded-lg">
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Digite o nome do seu deck..."
              className="w-full text-xl font-semibold p-3 border border-gray-300 rounded-md"
            />

            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 mt-4 rounded-lg shadow-sm"
              >
                <input
                  type="text"
                  value={card.front}
                  onChange={(e) => updateCard(index, "front", e.target.value)}
                  placeholder="Digite o conteúdo da frente do cartão..."
                  className="w-full p-2 border rounded-md mb-2"
                />
                <textarea
                  placeholder="Escreva o verso do cartão..."
                  className="w-full h-[100px] resize-none bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  value={card.back}
                  onChange={(e) => updateCard(index, "back", e.target.value)}
                />
                <button
                  onClick={() => removeCard(index)}
                  className="mt-2 text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrash className="mr-1" /> Remover
                </button>
              </div>
            ))}

            <button
              onClick={addCard}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
            >
              Adicionar Novo Cartão
            </button>
          </div>

          <div className="flex flex-col w-1/3 p-6 bg-white">
            <h2 className="text-xl font-semibold mb-4">Pré-visualização</h2>
            {cards.length === 0 ? (
              <p className="text-gray-500">Nenhum cartão adicionado.</p>
            ) : (
              cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-4 mb-2 rounded-md shadow"
                >
                  <p className="font-semibold">Frente: {card.front}</p>
                  <p className="text-gray-600 break-words">
                    Verso: {card.back}
                  </p>
                </div>
              ))
            )}
            <button
              onClick={handleFileUpload}
              className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded-lg"
            >
              Exportar Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnkiCardGenerator;
