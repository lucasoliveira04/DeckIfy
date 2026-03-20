// LoadingModal.jsx

import { useEffect, useState } from "react";
import { UseDeck } from "../hook/useDeck";

const MESSAGES = [
  "Flashcards carregando... 📚",
  "Quase lá, seus estudos estão prestes a começar! ⏳",
  "Preparando seus cartões de memorização... 🧠",
  "Estudo a todo vapor! 💡",
  "Os flashcards estão sendo organizados... 🃏",
  "Lembre-se: a memória é treinada com consistência! 💪",
  "O aprendizado está prestes a acontecer! 📝",
  "Cartões em processo... isso vai ser épico! ⚡",
  "Em breve você vai dominar o conteúdo! 🎯",
  "Seu cérebro está prestes a ser desafiado! 🧠🔥",
  "A chave para o sucesso está nos flashcards! 🔑",
  "A mente afiada começa com bons cartões! 🧠✨",
  "Prepare-se para revisar como um mestre! 🏆",
  "Memória de longo prazo, aqui vamos nós! 📅",
  "Foco nos estudos! Seu cérebro está sendo ativado! 💥",
];

const LoadingModal = ({ progress }) => {
  const { deckName } = UseDeck();
  const [dots, setDots] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const [visible, setVisible] = useState(true); // for message fade

  // animated dots
  useEffect(() => {
    const id = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(id);
  }, []);

  // rotating motivational message every 6 s with fade transition
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        setVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="
        w-full max-w-sm
        rounded-2xl border border-slate-700 bg-slate-900
        p-7 shadow-2xl shadow-black/50
        flex flex-col items-center gap-5
      "
      >
        {/* spinner + percentage */}
        <div className="relative flex items-center justify-center">
          {/* track */}
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#1e293b"
              strokeWidth="5"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#6366f1"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          <span className="absolute text-base font-bold text-slate-100">
            {progress}%
          </span>
        </div>

        {/* deck name */}
        <p className="text-sm font-semibold text-slate-300 text-center">
          Preparando{" "}
          <span className="text-indigo-400">{deckName || "seu deck"}</span>
          {dots}
        </p>

        {/* progress bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* rotating message */}
        <p
          className={`
          text-xs text-slate-400 text-center italic leading-relaxed
          transition-opacity duration-400
          ${visible ? "opacity-100" : "opacity-0"}
        `}
        >
          {message}
        </p>

        {/* fun status */}
        <p className="text-xs text-amber-400/80 font-medium">
          🚀 Jogando carvão na máquina!
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
