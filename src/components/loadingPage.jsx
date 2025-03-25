import { useEffect, useState } from "react";
import { UseDeck } from "../hook/useDeck";

const LoadingModal = ({ progress }) => {
  const { deckName } = UseDeck();
  const [dots, setDots] = useState("");
  const [message, setMessage] = useState("Flashcards carregando... 📚");
  const [isLeaving, setIsLeaving] = useState(false);
  const [lastProgress, setLastProgress] = useState(progress);
  const [staticTime, setStaticTime] = useState(0);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    const messageInterval = setInterval(() => {
      setIsLeaving(true);

      setTimeout(() => {
        const messages = [
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
          "Fique atento, seu aprendizado está sendo carregado! 🔄",
          "A chave para o sucesso está nos flashcards! 🔑",
          "A mente afiada começa com bons cartões! 🧠✨",
          "Cartões prontos para revisar... 📚",
          "Prepare-se para revisar como um mestre! 🏆",
          "Memória de longo prazo, aqui vamos nós! 📅",
          "Não desista, o aprendizado está em movimento! 🚀",
          "Foco nos estudos! Seu cérebro está sendo ativado! 💥",
          "Seu esforço vai valer a pena! 📖",
          "É hora de reter o conhecimento! 📘",
        ];
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
        setIsLeaving(false);
      }, 500);
    }, 10000);

    if (progress === lastProgress) {
      setStaticTime((prevTime) => prevTime + 1);
    } else {
      setStaticTime(0);
    }

    if (staticTime >= 3) {
      setLastProgress(progress);
      setStaticTime(0);
      setLastProgress((prev) => Math.min(prev + 15, 100));
    }

    return () => {
      clearInterval(dotsInterval);
      clearInterval(messageInterval);
    };
  }, [progress, lastProgress, staticTime]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 w-96">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="absolute text-lg font-bold">{progress}%</span>
        </div>

        <p className="text-lg font-semibold text-center animate-typing">
          Preparando seu deck:{" "}
          <span className="text-blue-600 font-bold">{deckName}</span>
          {dots}
        </p>

        <p
          className={`text-gray-600 text-center italic transition-all duration-500 ${
            isLeaving
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          {message}
        </p>

        <div className="w-full bg-gray-300 h-2 rounded-full">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-red-500 text-sm font-bold animate-shake">
          🚀 Servidores no limite! Jogando carvão na máquina! 🔥
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
