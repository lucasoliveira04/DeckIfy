import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FormForTestingNotIA } from "../components/formForTesting";
import { FormDeckWithIA } from "../components/formDeckTestingForIA";
import { FooterComponent } from "./footer";

/* ─── constants ──────────────────────────────────────────────────── */
const FULL_TEXT = "C rie seus Flashcards com auxílio da IA";
const SOCIAL = [
  { href: "https://github.com/lucasoliveira04", icon: FaGithub },
  { href: "https://www.instagram.com/lucasoliveira.04_/", icon: FaInstagram },
  {
    href: "https://www.linkedin.com/in/lucas-oliveira-campos/",
    icon: FaLinkedin,
  },
];

/* ─── sub-components ─────────────────────────────────────────────── */
const SocialLinks = () => (
  <div className="flex items-center gap-5">
    {SOCIAL.map(({ href, icon: Icon }) => (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-400 hover:text-indigo-400 transition-colors duration-200"
      >
        <Icon size={20} />
      </a>
    ))}
  </div>
);

const Header = () => (
  <header
    className="
    sticky top-0 z-20
    flex items-center justify-between
    border-b border-slate-800 bg-slate-900/80 backdrop-blur-md
    px-6 h-16
  "
  >
    <span className="text-xl font-bold tracking-tight text-slate-100">
      Deck<span className="text-indigo-400">ify</span>
    </span>
  </header>
);

const TestPanel = ({ activeForm, setActiveForm }) => {
  if (activeForm === "noIA")
    return <FormForTestingNotIA setActiveForm={setActiveForm} />;
  if (activeForm === "ia")
    return <FormDeckWithIA setActiveForm={setActiveForm} />;

  return (
    <div className="flex h-full items-center justify-center p-8">
      <div
        className="
        rounded-3xl border border-slate-700 bg-slate-800/50
        px-8 py-10 flex flex-col items-center gap-6 w-full max-w-sm
      "
      >
        <p className="text-base font-semibold text-slate-200 text-center">
          Faça um teste antes de começar
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => setActiveForm("ia")}
            className="
              flex-1 h-14 rounded-xl
              bg-gradient-to-br from-indigo-500 to-indigo-700
              text-white font-semibold text-sm
              hover:from-indigo-400 hover:to-indigo-600
              active:scale-95 transition-all duration-200 cursor-pointer
            "
          >
            💡 Usar IA
          </button>
          <button
            onClick={() => setActiveForm("noIA")}
            className="
              flex-1 h-14 rounded-xl
              border border-slate-600 bg-slate-700
              text-slate-200 font-semibold text-sm
              hover:border-slate-500 hover:bg-slate-600
              active:scale-95 transition-all duration-200 cursor-pointer
            "
          >
            🚫 Sem IA
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── page ───────────────────────────────────────────────────────── */
export const HomePage = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [activeForm, setActiveForm] = useState(null);

  // typewriter effect
  useEffect(() => {
    let i = 0;
    setAnimatedText("");
    const id = setInterval(() => {
      setAnimatedText((prev) => prev + FULL_TEXT.charAt(i));
      i++;
      if (i === FULL_TEXT.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, []);

  // clear localStorage on unmount
  useEffect(() => () => localStorage.clear(), []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      <Header />

      <main className="flex flex-col lg:flex-row flex-1">
        {/* ── hero ── */}
        <section
          className="
          flex flex-col justify-center
          lg:w-[58%] p-8 sm:p-12 md:p-16
          border-b lg:border-b-0 lg:border-r border-slate-800
        "
        >
          {/* accent line */}
          <div className="w-12 h-1 rounded-full bg-indigo-500 mb-8" />

          <h1
            className="
            text-4xl sm:text-5xl md:text-6xl lg:text-[64px]
            font-black leading-[1.05] tracking-tight text-slate-50 mb-6
          "
          >
            Agora a IA pode <span className="text-indigo-400">automatizar</span>{" "}
            seus estudos
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 min-h-[1.75rem]">
            {animatedText}
            <span className="animate-pulse text-indigo-400">|</span>
          </p>

          <Link to="/createdDeck">
            <button
              className="
              inline-flex items-center gap-2
              rounded-2xl bg-indigo-600 px-8 py-4
              text-base font-bold text-white uppercase tracking-wider
              hover:bg-indigo-500 active:scale-95
              transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-900/40
            "
            >
              Criar Flashcards →
            </button>
          </Link>
        </section>

        {/* ── test panel ── */}
        <section className="flex flex-col lg:w-[42%]">
          <TestPanel activeForm={activeForm} setActiveForm={setActiveForm} />
        </section>
      </main>

      <FooterComponent />
    </div>
  );
};

export default HomePage;
