import { useState } from "react";

export const useCarousel = (items) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasItems = items.length > 0;
  const currentItem = hasItems ? items[currentIndex] : null;

  const next = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goTo = (index) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
    }
  };

  return {
    currentItem,
    currentIndex,
    next,
    prev,
    goTo,
    hasItems,
    total: items.length,
  };
};
