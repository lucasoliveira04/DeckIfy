// FormForTestingNotIA.jsx

import { FaArrowLeft } from "react-icons/fa";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import AnkiCardCarousel from "./AnkiCardCarousel";
import LoadingModal from "./loadingPage";

/* ─── shared primitives (local) ─────────────────────────────────── */
const Label = ({ children }) => (
  <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
    {children}
  </label>
);

const Textarea = ({ value, onChange, placeholder, rows = 6 }) => (
  <textarea
    rows={rows}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="
      w-full resize-none rounded-xl border border-slate-700 bg-slate-800/60
      px-4 py-3 text-sm text-slate-100 placeholder-slate-500
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      transition-all duration-200
    "
  />
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

/* ─── component ─────────────────────────────────────────────────── */
export const FormForTestingNotIA = ({ setActiveForm }) => {
  const {
    deckName,
    setDeckName,
    frontInput,
    setFrontInput,
    backInput,
    setBackInput,
    filteredCards,
    handleFileUpload,
    handleAddCard,
    loading,
    progress,
    isModalOpen,
    openModal,
    closeModal,
  } = useAnkiCardGenerator();

  const canAddCard = frontInput && backInput;
  const canGenerate = filteredCards.length > 0;

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-10 py-6 bg-slate-900 min-h-full text-slate-100">
      {loading && <LoadingModal progress={progress} />}
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

      {/* deck name input */}
      <div className="flex flex-col gap-1.5">
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

      {/* front / back */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Frente</Label>
          <Textarea
            value={frontInput}
            onChange={(e) => setFrontInput(e.target.value)}
            placeholder="Coloque a pergunta aqui..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Verso</Label>
          <Textarea
            value={backInput}
            onChange={(e) => setBackInput(e.target.value)}
            placeholder="Coloque a resposta aqui..."
          />
        </div>
      </div>

      {/* actions */}
      <div className="flex flex-wrap gap-3">
        <Btn onClick={handleAddCard} disabled={!canAddCard}>
          + Adicionar ao Deck
        </Btn>
        <Btn onClick={handleFileUpload} disabled={!canGenerate}>
          {loading ? "Gerando…" : "Gerar Deck"}
        </Btn>
        <Btn onClick={openModal} variant="ghost">
          📚 Pré-visualização{" "}
          {filteredCards.length > 0 && `(${filteredCards.length})`}
        </Btn>
      </div>
    </div>
  );
};
