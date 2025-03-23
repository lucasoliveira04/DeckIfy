import { useState } from "react";
import { generateApkg } from "../services/generateApkg";

const AnkiCardGenerator = () => {
  // Estado para armazenar os cartões e o nome do deck
  const [cards, setCards] = useState([{ front: "", back: "" }]);
  const [deckName, setDeckName] = useState("MeuDeck");

  // Função para adicionar um novo cartão
  const addCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  // Função para remover um cartão
  const removeCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  // Função para atualizar os campos do cartão (Frente ou Verso)
  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  // Função para exportar os dados e gerar o arquivo .apkg
  const handleFileUpload = async () => {
    await generateApkg(deckName, cards); // Chama a função de API para gerar o arquivo
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">
        Gerador de Cartões Anki
      </h2>

      {/* Campo para digitar o nome do deck */}
      <input
        type="text"
        placeholder="Nome do Deck"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      {/* Renderiza os cartões */}
      {cards.map((card, index) => (
        <div
          key={index}
          className="mb-4 p-6 bg-gray-100 rounded-lg shadow relative"
        >
          {/* Campo para digitar a frente do cartão */}
          <input
            type="text"
            placeholder="Frente"
            value={card.front}
            onChange={(e) => updateCard(index, "front", e.target.value)}
            className="w-full p-2 mb-2 border rounded-lg"
          />
          {/* Campo para digitar o verso do cartão */}
          <input
            type="text"
            placeholder="Verso"
            value={card.back}
            onChange={(e) => updateCard(index, "back", e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          {/* Botão para remover o cartão */}
          <button
            onClick={() => removeCard(index)}
            className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition"
          >
            X
          </button>
        </div>
      ))}

      {/* Botões de adicionar e exportar */}
      <div className="flex justify-between mt-4">
        <button
          onClick={addCard}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Adicionar Cartão
        </button>

        <button
          onClick={handleFileUpload}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Exportar
        </button>
      </div>
    </div>
  );
};

export default AnkiCardGenerator;
