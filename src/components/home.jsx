import { useState, useEffect } from "react";
import { FormForTestingNotIA } from "./formForTesting";
import { Link } from "react-router";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const HomeComponent = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [activeForm, setActiveForm] = useState(null);
  const fullText = "C rie seus Flashcards com auxílio da IA";

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setAnimatedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) {
        clearInterval(intervalId);
      }
    }, 140);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 font-inter">
      <header className="flex items-center justify-between bg-gray-50 text-green-600 h-20 px-10 shadow-md transition-all ease-in-out duration-300 hover:bg-green-100">
        <h1 className="font-bold text-3xl sm:text-4xl font-winky cursor-pointer transform transition-all duration-500 ease-out hover:text-green-700">
          DeckIfy - Crie Flashcards com IA
        </h1>

        <div className="hidden sm:flex items-center space-x-5">
          <Link
            to={"https://github.com/lucasoliveira04"}
            className="text-lg font-medium text-green-600 hover:text-green-800"
          >
            <FaGithub />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/lucas-oliveira-campos"}
            className="text-lg font-medium text-green-600 hover:text-green-800"
          >
            <FaLinkedin />
          </Link>
        </div>
      </header>

      <div className="flex w-full h-full">
        <div className="flex flex-col justify-center items-start w-[60%] bg-gray-50 p-10 md:p-16 shadow-2xl border border-gray-200">
          <h2 className="text-6xl md:text-[80px] text-gray-900 font-semibold mb-6 font-anton">
            Agora a IA pode automatizar seus estudos
          </h2>
          <h3 className="text-2xl md:text-3xl text-gray-700 font-medium mb-10">
            {animatedText}
          </h3>

          <Link to={"/createdDeck"}>
            <button className="bg-green-500 p-5 md:p-7 rounded-xl text-xl md:text-2xl font-bold text-white hover:bg-green-600 transition-all">
              CRIAR FLASHCARDS
            </button>
          </Link>
        </div>
        <div
          className={`flex flex-col border ${
            activeForm === null ? "place-items-center pt-4" : ""
          } w-[40%] bg-gray-50`}
        >
          {activeForm === null && (
            <div className="flex flex-col items-center justify-center pb-[400px] w-full h-full border-black">
              <h2 className="text-[40px] font-poppins">Faça um teste</h2>
              <div className="flex space-x-5 mt-10">
                <button
                  className="w-52 h-20 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-md text-2xl font-bold transform transition duration-500 ease-smooth hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={() => setActiveForm("ia")}
                >
                  💡 Usar IA
                </button>
                <button
                  className="w-52 h-20 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-xl shadow-md text-2xl font-bold transform transition duration-500 ease-smooth hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
                  onClick={() => setActiveForm("noIA")}
                >
                  🚫 Sem IA
                </button>
              </div>
            </div>
          )}

          <div
            className={`transition-opacity duration-500 ease-in-out transform ${
              activeForm === null
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            {activeForm === "noIA" && (
              <FormForTestingNotIA setActiveForm={setActiveForm} />
            )}

            {activeForm === "ia" && <FormForTestingNotIA />}
          </div>
        </div>
      </div>
    </div>
  );
};
