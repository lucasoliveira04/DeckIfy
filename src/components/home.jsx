import { useState, useEffect } from "react";
import { FormForTestingNotIA } from "./formForTesting";
import { Link } from "react-router";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FormDeckWithIA } from "./formDeckTestingForIA";

export const HomeComponent = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [activeForm, setActiveForm] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
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
    <div className="flex flex-col w-full min-h-screen bg-gray-50 font-inter">
      <header className="flex items-center justify-between bg-gray-50 text-green-600 h-20 px-5 sm:px-10 shadow-md transition-all ease-in-out duration-300 hover:bg-green-100">
        <h1 className="font-bold text-3xl sm:text-4xl font-winky cursor-pointer transform transition-all duration-500 ease-out hover:text-green-700">
          DeckIfy
        </h1>

        <div className="flex sm:hidden items-center space-x-5">
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

      <div className="flex flex-col sm:flex-row w-full flex-grow">
        <div className="flex flex-col justify-center items-start w-full sm:w-[60%] xs:justify-start xs:pt-14 xs:h-screen bg-gray-50 p-5 sm:p-10 md:p-16 shadow-2xl border border-gray-200">
          <h2 className="text-4xl sm:text-6xl md:text-[80px] xs:text-7xl text-gray-900 font-semibold mb-6 font-anton">
            Agora a IA pode automatizar seus estudos
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-10">
            {animatedText}
          </h3>

          <div className="xs:flex xs:w-full xs:h-[270px] xs:justify-center xs:mt-9">
            <Link to={"/createdDeck"}>
              <button className="bg-green-500 p-3 sm:p-4 md:p-5 rounded-xl text-lg sm:text-xl md:text-2xl font-bold text-white hover:bg-green-600 transition-all">
                CRIAR FLASHCARDS
              </button>
            </Link>
          </div>
        </div>

        <div
          className={`flex flex-col w-full sm:w-[40%] max-w-full ${
            activeForm === null ? "items-center pt-4" : ""
          }`}
        >
          {activeForm === null && (
            <div className="flex flex-col items-center justify-center pb-[400px] w-full h-full">
              <div className="flex w-full justify-end">
                <div className="bg-green-50 bg-opacity-30 shadow-lg rounded-l-3xl rounded-r-none px-8 py-12 w-full max-w-[600px] flex flex-col items-center">
                  <h2 className="text-xl sm:text-2xl md:text-[32px] font-permanent font-semibold text-gray-800 mb-6">
                    Faça um teste antes de começar
                  </h2>

                  <div className="flex space-x-4">
                    <button
                      className="w-36 sm:w-44 h-14 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md text-lg sm:text-xl font-semibold transition hover:scale-105"
                      onClick={() => setActiveForm("ia")}
                    >
                      💡 Usar IA
                    </button>
                    <button
                      className="w-36 sm:w-44 h-14 sm:h-16 bg-gray-300 text-gray-800 rounded-xl shadow-md text-lg sm:text-xl font-semibold transition hover:scale-105"
                      onClick={() => setActiveForm("noIA")}
                    >
                      🚫 Sem IA
                    </button>
                  </div>
                </div>
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

            {activeForm === "ia" && (
              <FormDeckWithIA setActiveForm={setActiveForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
