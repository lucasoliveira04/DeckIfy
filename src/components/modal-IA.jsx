// ModalIA.jsx

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { UseDeck } from "../hook/useDeck";

const MAX_CARDS = 20;
const API_URL = "https://api-dackify-ia-1.onrender.com/api/generate_quests";

const ModalIA = ({ isOpen, closeModal }) => {
  const { addMultipleCards } = UseDeck();
  const [contexto, setContexto] = useState("");
  const [quantityCards, setQuantityCards] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeModal]);

  // reset state when reopened
  useEffect(() => {
    if (isOpen) {
      setContexto("");
      setQuantityCards(5);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQuantityChange = (e) => {
    setQuantityCards(Math.min(MAX_CARDS, Math.max(1, Number(e.target.value))));
  };

  const handleGenerate = async () => {
    if (!contexto.trim()) {
      setError("Insira um contexto antes de gerar.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(API_URL, {
        context: contexto,
        quantidade_tasks: quantityCards,
      });

      if (data.message === "Ok") {
        addMultipleCards(data.flashcards);
        closeModal();
      } else {
        setError("Falha ao gerar cartões. Tente novamente.");
      }
    } catch {
      setError("Falha ao gerar cartões. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* panel */}
      <div
        className="
        relative w-full max-w-md
        rounded-2xl border border-slate-700 bg-slate-900
        p-6 shadow-2xl shadow-black/40
        animate-[fadeSlideUp_0.2s_ease-out]
      "
      >
        {/* close button */}
        <button
          onClick={closeModal}
          aria-label="Fechar"
          className="
            absolute top-4 right-4
            p-1.5 rounded-lg text-slate-500
            hover:text-slate-200 hover:bg-slate-800
            transition-all duration-150
          "
        >
          <FaTimes size={14} />
        </button>

        {/* heading */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400 mb-1">
            Inteligência Artificial
          </p>
          <h2 className="text-xl font-bold text-slate-100">Gerar Cartões 🤖</h2>
          <p className="text-sm text-slate-400 mt-1">
            Descreva o conteúdo e a IA cria os flashcards para você.
          </p>
        </div>

        {/* context */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
            Contexto
          </label>
          <textarea
            rows={4}
            value={contexto}
            onChange={(e) => setContexto(e.target.value)}
            placeholder='Ex: "A Revolução Francesa foi um movimento social e político entre 1789 e 1799..."'
            className="
              w-full resize-none rounded-xl border border-slate-700 bg-slate-800/60
              px-4 py-3 text-sm text-slate-100 placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition-all duration-200
            "
          />
        </div>

        {/* quantity */}
        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
              Quantidade de Cartões
            </label>
            <span className="text-xs text-slate-500">máx. {MAX_CARDS}</span>
          </div>
          <input
            type="number"
            value={quantityCards}
            onChange={handleQuantityChange}
            min={1}
            max={MAX_CARDS}
            inputMode="numeric"
            className="
              rounded-xl border border-slate-700 bg-slate-800/60
              px-4 py-3 text-sm text-slate-100
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition-all duration-200
            "
          />
        </div>

        {/* inline error */}
        {error && (
          <p className="mb-4 rounded-xl bg-red-900/30 border border-red-700/50 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* actions */}
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="
              flex-1 rounded-xl bg-indigo-600 py-3
              text-sm font-semibold text-white
              hover:bg-indigo-500 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            {loading ? "Gerando…" : "Gerar cartões"}
          </button>
          <button
            onClick={closeModal}
            className="
              px-5 rounded-xl border border-slate-700 text-slate-400
              hover:border-slate-500 hover:text-slate-200
              active:scale-95 transition-all duration-200
            "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalIA;
