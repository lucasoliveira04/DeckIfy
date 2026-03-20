// FormDeckWithIA.jsx

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import { UseDeck } from "../hook/useDeck";
import { AlertMessage } from "./alertMessage";
import AnkiCardCarousel from "./AnkiCardCarousel";
import LoadingModal from "./loadingPage";

/* ─── shared primitives (same as FormForTestingNotIA) ────────────── */
const Label = ({ children }) => (
  <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
    {children}
  </label>
);

const Btn = ({ onClick, disabled, variant = "primary", children }) => {
  const base =
    "px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer";
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed",
    ghost:
      "border border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

const PreviewModal = ({ filteredCards, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
      <h2 className="mb-4 text-center text-lg font-bold text-slate-100">
        Pré-visualização
      </h2>
      <AnkiCardCarousel filteredCards={filteredCards} />
      <button
        onClick={onClose}
        className="mt-4 w-full rounded-xl bg-red-600/80 py-2.5 text-sm font-semibold text-white hover:bg-red-500 transition-all duration-200"
      >
        Fechar
      </button>
    </div>
  </div>
);

/* ─── constants ──────────────────────────────────────────────────── */
const MAX_CARDS = 20;
const API_URL = "https://api-dackify-ia-1.onrender.com/api/generate_quests";

/* ─── component ─────────────────────────────────────────────────── */
export const FormDeckWithIA = ({ setActiveForm }) => {
  const { addMultipleCards } = UseDeck();
  const {
    deckName,
    setDeckName,
    filteredCards,
    handleFileUpload,
    loading: loadingGenerator,
    progress,
    isModalOpen,
    openModal,
    closeModal,
  } = useAnkiCardGenerator();

  const [contexto, setContexto] = useState("");
  const [quantityCards, setQuantityCards] = useState(5);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { message, typeMessage }

  // auto-dismiss alert
  useEffect(() => {
    if (!alert) return;
    const id = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(id);
  }, [alert]);

  const handleQuantityChange = (e) => {
    const v = Math.min(MAX_CARDS, Math.max(1, Number(e.target.value)));
    setQuantityCards(v);
  };

  const handleGenerate = async () => {
    if (!contexto.trim()) {
      setAlert({
        message: "Adicione um contexto antes de gerar.",
        typeMessage: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(API_URL, {
        context: contexto,
        quantidade_tasks: quantityCards,
      });

      if (data.message === "Ok") {
        addMultipleCards(data.flashcards);
        setAlert({
          message: "Cartões gerados com sucesso!",
          typeMessage: "success",
        });
      } else {
        setAlert({
          message: "Falha ao gerar cartões. Tente novamente.",
          typeMessage: "error",
        });
      }
    } catch {
      setAlert({
        message: "Falha ao gerar cartões. Verifique sua conexão.",
        typeMessage: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const canGenerate = filteredCards.length > 0;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10 py-6 bg-slate-900 min-h-full text-slate-100">
      {(loading || loadingGenerator) && <LoadingModal progress={progress} />}
      {alert && (
        <AlertMessage message={alert.message} typeMessage={alert.typeMessage} />
      )}
      {isModalOpen && (
        <PreviewModal filteredCards={filteredCards} onClose={closeModal} />
      )}

      {/* header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveForm(null)}
          className="p-2 rounded-xl border border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-300 transition-all duration-200 cursor-pointer"
        >
          <FaArrowLeft size={14} />
        </button>
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest">
            Deck
          </p>
          <p className="text-base font-semibold text-slate-100 truncate max-w-[220px]">
            {deckName || "Sem nome"}
          </p>
        </div>
      </div>

      {/* deck name + quantity */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <Label>Nome do Deck</Label>
          <input
            type="text"
            placeholder="Nome do deck..."
            onChange={(e) => setDeckName(e.target.value)}
            className="
              rounded-xl border border-slate-700 bg-slate-800/60
              px-4 py-3 text-sm text-slate-100 placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition-all duration-200
            "
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:w-36">
          <Label>Qtd. de Cartões</Label>
          <input
            type="number"
            value={quantityCards}
            onChange={handleQuantityChange}
            min={1}
            max={MAX_CARDS}
            className="
              rounded-xl border border-slate-700 bg-slate-800/60
              px-4 py-3 text-sm text-slate-100
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* context textarea */}
      <div className="flex flex-col gap-1.5">
        <Label>Contexto</Label>
        <textarea
          rows={6}
          value={contexto}
          onChange={(e) => setContexto(e.target.value)}
          placeholder="Digite um resumo do conteúdo para a IA gerar os cartões..."
          className="
            w-full resize-none rounded-xl border border-slate-700 bg-slate-800/60
            px-4 py-3 text-sm text-slate-100 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-all duration-200
          "
        />
      </div>

      {/* actions */}
      <div className="flex flex-wrap gap-3">
        <Btn onClick={handleGenerate} disabled={!contexto.trim() || loading}>
          {loading ? "Gerando…" : "🤖 Gerar perguntas"}
        </Btn>
        <Btn
          onClick={handleFileUpload}
          disabled={!canGenerate || loadingGenerator}
        >
          {loadingGenerator ? "Gerando…" : "Gerar Deck"}
        </Btn>
        <Btn onClick={openModal} variant="ghost">
          📚 Pré-visualização{" "}
          {filteredCards.length > 0 && `(${filteredCards.length})`}
        </Btn>
      </div>
    </div>
  );
};
