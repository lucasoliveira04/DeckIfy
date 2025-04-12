import { useState, useEffect } from "react";
import axios from "axios";

export const useCardGeneration = (addMultipleCards) => {
  const [contexto, setContexto] = useState("");
  const [quantityCards, setQuantityCards] = useState(1);
  const [loading, setLoading] = useState(false);
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
  };

  return {
    contexto,
    setContexto,
    quantityCards,
    setQuantityCards,
    loading,
    handleContextoChange,
    handleQuantityChange,
    handleGenerate,
    maxCards,
  };
};
