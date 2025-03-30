import React, { createContext, useState, useEffect, useContext } from "react";

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

  // Função para adicionar múltiplos cartões de uma vez
  const addMultipleCards = (context, quantity) => {
    const newCards = [];

    for (let i = 0; i < quantity; i++) {
      newCards.push({ front: `Cartão #${i + 1}`, back: context, isIA: true });
    }

    const updatedCards = [...cards, ...newCards];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  // Removendo todos os cartões
  const removeAllCard = () => {
    setCards([]);
    localStorage.setItem("cards", JSON.stringify([]));
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
        addMultipleCards,
        removeCard,
        updateCard,
        removeAllCard,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
