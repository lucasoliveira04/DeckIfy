import React, { useState } from "react";
import { UseDeck } from "../hook/useDeck";
import { FaTimes } from "react-icons/fa";

const ModalIA = ({ isOpen, closeModal }) => {
  const { addMultipleCards } = UseDeck();
  const [contexto, setContexto] = useState("");
  const [quantityCards, setQuantityCards] = useState(1);

  if (!isOpen) return null;

  const handleContextoChange = (e) => {
    setContexto(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, e.target.value);
    setQuantityCards(value);
  };

  const handleGenerate = () => {
    if (!contexto.trim()) {
      alert("Por favor, insira um contexto para gerar os cartões.");
      return;
    }

    console.log("Contexto fornecido:", contexto);
    console.log("Quantidade de cartões:", quantityCards);

    addMultipleCards(contexto, quantityCards);

    closeModal();
  };

  return (
    <div className="fixed w-[100%] inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
        <div className="flex justify-end">
          <FaTimes
            onClick={closeModal}
            className="text-gray-600 cursor-pointer hover:text-red-800"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Gerar Cartões com IA 🤖
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Preencha os campos abaixo para gerar cartões automaticamente com base
          no seu contexto.
        </p>

        <div className="mb-6">
          <label
            htmlFor="contexto"
            className="text-lg font-semibold text-gray-700 mb-2 block"
          >
            Contexto
          </label>
          <textarea
            id="contexto"
            value={contexto}
            onChange={handleContextoChange}
            className="w-full h-56 p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-0 resize-none transition-all duration-300"
            placeholder="Digite um resumo do conteúdo que você deseja que a IA utilize para gerar os cartões..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Exemplo: "Resumo sobre a Revolução Francesa" ou "Explicação dos
            princípios da física."
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="quantityCards"
            className="text-lg font-semibold text-gray-700 mb-2 block"
          >
            Quantidade de Cartões
          </label>
          <input
            type="number"
            id="quantityCards"
            value={quantityCards}
            onChange={handleQuantityChange}
            min="1"
            max="50"
            className="w-full p-2 bg-gray-200 text-gray-800 rounded-md border border-gray-400 focus:outline-none focus:border-blue-400 focus:ring-0 transition-all duration-300"
            placeholder="Quantos cartões você deseja gerar?"
          />
          <p className="text-sm text-gray-500 mt-2">
            Você pode gerar até 50 cartões por vez.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGenerate}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Gerar Cartões
          </button>
          <button
            onClick={closeModal}
            className="px-6 py-2 bg-red-300 text-dark rounded-lg hover:bg-red-400 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalIA;
