import { Link } from "react-router-dom";

export const HomeComponent = () => {
  return (
    <div className="flex w-full h-screen bg-gray-900 font-inter">
      <div className="flex flex-col justify-evenly w-full px-10 items-center gap-y-10">
        <div className="relative bottom-2 flex flex-col h-[25%] w-full justify-end pb-6 pl-6 items-start bg-gradient-to-r from-violet-600 to-blue-600 rounded-b-3xl border border-blue-500">
          <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 transform -rotate-2">
            Dack
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
              Ify
            </span>
          </h1>
        </div>

        <div className="flex flex-col justify-center h-[80%]">
          <h2 className="text-[100px] text-white font-anton font-bold text-center leading-tight">
            Crie FlashCards com{" "}
            <span className="text-yellow-400 animate-glow hover:text-yellow-500 hover:scale-110 transform transition-all duration-300">
              IA
            </span>{" "}
            para
            <br />
            Estudar de forma mais eficiente <br />
            <span className="text-yellow-500 animate-glow hover:text-yellow-400 hover:scale-110 transform transition-all duration-300">
              TUDO DE GRAÇA
            </span>
          </h2>
        </div>

        <div className="flex h-[70%] w-full justify-center items-center">
          <Link
            to={"/createdDeck"}
            className="bg-gradient-to-r from-violet-800 to-indigo-600 rounded-3xl w-[300px] h-[80px] text-[34px] font-bold uppercase text-white flex items-center justify-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-400"
          >
            Começar
          </Link>
        </div>
      </div>
    </div>
  );
};
