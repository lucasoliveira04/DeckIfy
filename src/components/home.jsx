import { Link } from "react-router-dom";

export const HomeComponent = () => {
  return (
    <div className="flex w-full h-screen bg-gray-50 font-inter">
      <div className="flex flex-col justify-evenly w-full px-6 items-center gap-y-8">
        {/* Cabeçalho */}
        <div className="relative flex flex-col h-[20%] w-full justify-end pb-4 pl-4 items-start bg-gradient-to-r from-green-500 to-green-700 rounded-b-3xl border border-green-600 shadow-lg">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wide">
            Deck<span className="text-green-200">Ify</span>
          </h1>
        </div>

        {/* Texto principal */}
        <div className="flex flex-col justify-center h-[60%] px-2">
          <h2 className="text-3xl md:text-5xl text-gray-900 font-semibold text-center leading-tight">
            Crie FlashCards com{" "}
            <span className="text-green-600 font-bold">IA</span> para
            <br />
            Estudar de forma mais eficiente <br />
            <span className="text-green-700 border-b-4 border-green-500">
              100% Gratuito
            </span>
          </h2>
        </div>

        {/* Botão de ação */}
        <div className="flex h-[50%] w-full justify-center items-center">
          <Link
            to={"/createdDeck"}
            className="bg-green-600 hover:bg-green-700 rounded-lg w-[220px] md:w-[280px] h-[60px] md:h-[70px] text-[22px] md:text-[28px] font-semibold uppercase text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Começar
          </Link>
        </div>
      </div>
    </div>
  );
};
