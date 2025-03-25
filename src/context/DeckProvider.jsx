import React, { createContext, useState, useEffect, useContext } from "react";

// Criação do contexto
export const DeckContext = createContext();

export const useDeck = () => {
  return useContext(DeckContext);
};

export const DeckProvider = ({ children }) => {
  const [deckName, setDeckName] = useState(
    localStorage.getItem("deckName") || ""
  );
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards")) || [{ front: "", back: "" }]
  );

  // Função para atualizar o nome do deck
  const updateDeckName = (name) => {
    setDeckName(name);
    localStorage.setItem("deckName", name);
  };

  // Função para adicionar um novo cartão
  const addCard = (front, back) => {
    const newCards = [...cards, { front, back }];
    setCards(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
  };

  // Função para remover um cartão
  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
  };

  // Função para atualizar os campos do cartão
  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
  };

  useEffect(() => {
    const savedDeckName = localStorage.getItem("deckName");
    if (savedDeckName) {
      setDeckName(savedDeckName);
    }
  }, []);

  return (
    <DeckContext.Provider
      value={{
        deckName,
        setDeckName: updateDeckName,
        cards,
        addCard,
        removeCard,
        updateCard,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
