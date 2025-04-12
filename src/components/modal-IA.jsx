import React, { useState, useEffect } from "react";
import { UseDeck } from "../hook/useDeck";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const ModalIA = ({ isOpen, closeModal }) => {
  const { addMultipleCards } = UseDeck();
  const [contexto, setContexto] = useState("");
  const [quantityCards, setQuantityCards] = useState(1);
  const [loading, setLoading] = useState(false);

  const maxCards = 20;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

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
      alert("Por favor, insira um contexto para gerar os cartões.");
      return;
    }

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

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-6 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] relative animate-slideIn border border-blue-300">
        {/* Botão de Fechar */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-blue-500 transition"
          aria-label="Fechar"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Título */}
        <h2 className="text-xl font-semibold text-blue-500">
          Gerar Cartões 🤖
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Digite um contexto e gere flashcards rapidamente.
        </p>

        {/* Campo de Contexto */}
        <div className="mt-4">
          <textarea
            id="contexto"
            value={contexto}
            onChange={handleContextoChange}
            className="w-full h-24 p-2 bg-blue-50 text-gray-800 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 transition resize-none"
            placeholder="Digite um resumo do conteúdo..."
          />
          <p className="text-gray-600 text-sm mt-2">
            Exemplo:{" "}
            <span className="text-blue-500">
              "A Revolução Francesa foi um movimento social e político que
              ocorreu entre 1789 e 1799..."
            </span>
          </p>
        </div>

        {/* Quantidade de Cartões */}
        <div className="mt-3">
          <input
            type="number"
            id="quantityCards"
            value={quantityCards}
            onChange={handleQuantityChange}
            min="1"
            max={maxCards}
            inputMode="numeric"
            className="w-full p-2 bg-blue-50 text-gray-800 rounded-md border border-blue-300 focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Quantos cartões?"
          />

          <label className="font-bold text-gray-950">
            Você só pode criar {maxCards} cartões de uma vez
            <hr />
          </label>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleGenerate}
            className={`px-4 py-2 rounded-md text-white transition duration-300 cursor-pointer ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Gerando..." : "Gerar"}
          </button>

          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-900 transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalIA;
