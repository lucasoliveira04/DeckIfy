import { useEffect, useState } from "react";
import { UseDeck } from "./useDeck";
import { generateApkg } from "../services/generateApkg";

export const useAnkiCardGenerator = () => {
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
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleFileUpload = async () => {
    if (cards.length === 0) {
      setAlert({ message: "Crie no mínimo 1 cartão.", typeMessage: "error" });
      return;
    }

    setLoading(true);
    try {
      await generateApkg(deckName, cards, setProgress);
      setAlert({
        message: "Cartão criado com sucesso!",
        typeMessage: "success",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = () => {
    if (!frontInput.trim() || !backInput.trim()) {
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

  return {
    deckName,
    setDeckName,
    cards,
    addCard,
    removeCard,
    removeAllCard,
    loading,
    progress,
    frontInput,
    setFrontInput,
    backInput,
    setBackInput,
    alert,
    setAlert,
    isModalOpen,
    openModal,
    closeModal,
    searchQuery,
    setSearchQuery,
    handleFileUpload,
    handleAddCard,
    filteredCards,
    highlightText,
  };
};
