// AnkiCardGenerator.jsx — Unified responsive component (replaces Desktop + Mobile versions)
// Drop-in replacement: same hook interface, no separate Mobile/Desktop files needed.

import { useState } from "react";
import { FaTrash, FaGithub, FaInstagram } from "react-icons/fa";
import { useAnkiCardGenerator } from "../hook/useAnkiCardGenerator";
import ModalIA from "../components/modal-IA";
import LoadingModal from "../components/loadingPage";
import { AlertMessage } from "../components/alertMessage";
import AnkiCardCarousel from "../components/AnkiCardCarousel";

/* ─── tiny helpers ─────────────────────────────────────────────── */
const Field = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
      {label}
    </label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full resize-none rounded-xl border border-slate-700 bg-slate-800/60
        px-4 py-3 text-sm text-slate-100 placeholder-slate-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition-all duration-200
      "
    />
  </div>
);

const PrimaryBtn = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white
      hover:bg-indigo-500 active:scale-95
      transition-all duration-200 cursor-pointer
      ${className}
    `}
  >
    {children}
  </button>
);

const GhostBtn = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-400
      hover:border-red-500 hover:text-red-400
      transition-all duration-200 cursor-pointer
      ${className}
    `}
  >
    {children}
  </button>
);

/* ─── card preview item ─────────────────────────────────────────── */
const CardItem = ({ card, index, onRemove, searchQuery, highlightText }) => (
  <div
    className="
    group relative rounded-2xl border border-slate-700 bg-slate-800/50
    p-4 hover:border-indigo-500/50 hover:bg-slate-800
    transition-all duration-200
  "
  >
    <button
      onClick={() => onRemove(index)}
      className="
        absolute top-3 right-3 opacity-0 group-hover:opacity-100
        text-slate-500 hover:text-red-400 transition-all duration-150
      "
    >
      <FaTrash size={12} />
    </button>

    <p className="text-xs font-semibold text-indigo-400 mb-1 uppercase tracking-wider">
      Frente
    </p>
    <p className="text-sm text-slate-200 break-words mb-3 select-text leading-relaxed">
      {highlightText ? highlightText(card.front, searchQuery) : card.front}
    </p>

    <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
      Verso
    </p>
    <p className="text-sm text-slate-400 break-words select-text leading-relaxed">
      {highlightText ? highlightText(card.back, searchQuery) : card.back}
    </p>

    {card.isIA && (
      <span
        className="absolute bottom-3 right-3 text-base"
        title="Gerado com IA"
      >
        🤖
      </span>
    )}
  </div>
);

/* ─── main component ────────────────────────────────────────────── */
const AnkiCardGenerator = () => {
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
    removeCard,
    removeAllCard,
    loading,
    progress,
    alert,
    isModalOpen,
    openModal,
    closeModal,
    searchQuery,
    setSearchQuery,
    highlightText,
  } = useAnkiCardGenerator();

  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {loading && <LoadingModal progress={progress} />}
      {alert && (
        <AlertMessage message={alert.message} typeMessage={alert.typeMessage} />
      )}
      <ModalIA isOpen={isModalOpen} closeModal={closeModal} />

      {/* ── top bar ── */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between
        border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 h-16"
      >
        <span className="text-lg font-bold tracking-tight">
          Deck<span className="text-indigo-400">ify</span>
        </span>
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-xl border border-slate-700
            bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200
            hover:border-indigo-500 hover:text-indigo-300
            transition-all duration-200 cursor-pointer"
        >
          <span>🤖</span>
          <span className="hidden sm:inline">Usar IA</span>
        </button>
      </header>

      {/* ── two-column layout on lg, single column on mobile ── */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* ── LEFT: form panel ── */}
        <aside
          className="
          flex flex-col gap-6 p-6
          lg:w-[420px] lg:min-w-[420px] lg:border-r lg:border-slate-800
          lg:overflow-y-auto
        "
        >
          {/* deck name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">
              Nome do Deck
            </label>
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Digite o nome do seu deck..."
              className="
                rounded-xl border border-slate-700 bg-slate-800/60
                px-4 py-3 text-sm text-slate-100 placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-200
              "
            />
          </div>

          <Field
            label="Frente"
            value={frontInput}
            onChange={setFrontInput}
            placeholder="Coloque a pergunta aqui..."
          />
          <Field
            label="Verso"
            value={backInput}
            onChange={setBackInput}
            placeholder="Coloque a resposta aqui..."
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <PrimaryBtn onClick={handleAddCard} className="flex-1">
              + Adicionar Cartão
            </PrimaryBtn>
            <PrimaryBtn
              onClick={handleFileUpload}
              className="flex-1 bg-slate-700 hover:bg-slate-600"
            >
              {loading ? "Gerando…" : "Gerar Anki"}
            </PrimaryBtn>
          </div>

          {/* mobile: toggle preview button */}
          <button
            onClick={() => setPreviewOpen((v) => !v)}
            className="
              lg:hidden flex items-center justify-center gap-2
              rounded-xl border border-slate-700 py-2.5 text-sm text-slate-400
              hover:border-indigo-500 hover:text-indigo-300
              transition-all duration-200 cursor-pointer
            "
          >
            📚
            <span>
              {previewOpen
                ? "Ocultar cartões"
                : `Ver cartões (${filteredCards.length})`}
            </span>
          </button>
        </aside>

        {/* ── RIGHT: preview panel ── */}
        {/* On desktop: always visible. On mobile: toggled. */}
        <main
          className={`
          flex-1 flex flex-col overflow-hidden
          ${previewOpen ? "flex" : "hidden lg:flex"}
        `}
        >
          {/* sticky search + actions bar */}
          <div
            className="
            flex items-center gap-3 px-6 py-4
            border-b border-slate-800 bg-slate-900/60 backdrop-blur-sm
          "
          >
            <input
              type="text"
              placeholder="Filtrar cartões…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                flex-1 rounded-xl border border-slate-700 bg-slate-800/60
                px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                transition-all duration-200
              "
            />
            <span className="hidden sm:block text-xs text-slate-500 whitespace-nowrap">
              {filteredCards.length} cartão
              {filteredCards.length !== 1 ? "s" : ""}
            </span>
            {filteredCards.length > 0 && (
              <GhostBtn onClick={removeAllCard}>Apagar todos</GhostBtn>
            )}
          </div>

          {/* cards area */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
                <span className="text-5xl">🃏</span>
                <p className="text-sm">Nenhum cartão adicionado ainda.</p>
              </div>
            ) : (
              <>
                {/* grid on desktop */}
                <div className="hidden lg:grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                  {filteredCards.map((card, i) => (
                    <CardItem
                      key={i}
                      card={card}
                      index={i}
                      onRemove={removeCard}
                      searchQuery={searchQuery}
                      highlightText={highlightText}
                    />
                  ))}
                </div>
                {/* carousel on mobile */}
                <div className="lg:hidden">
                  <AnkiCardCarousel filteredCards={filteredCards} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnkiCardGenerator;
