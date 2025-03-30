import { Link } from "react-router-dom";

export const HomeComponent = () => {
  return (
    <div className="flex w-full h-screen bg-gray-50 font-inter">
      <div className="flex flex-col justify-evenly w-full px-10 items-center gap-y-10">
        {/* Header com branding */}
        <div className="relative flex flex-col h-[25%] w-full justify-end pb-6 pl-6 items-start bg-gradient-to-r from-green-500 to-green-700 rounded-b-3xl border border-green-600 shadow-lg">
          <h1 className="text-7xl font-bold text-white tracking-wide">
            Dack
            <span className="text-green-200">Ify</span>
          </h1>
        </div>

        {/* Texto principal */}
        <div className="flex flex-col justify-center h-[80%]">
          <h2 className="text-[60px] text-gray-900 font-semibold text-center leading-tight">
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
        <div className="flex h-[70%] w-full justify-center items-center">
          <Link
            to={"/createdDeck"}
            className="bg-green-600 hover:bg-green-700 rounded-lg w-[280px] h-[70px] text-[28px] font-semibold uppercase text-white flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Comecar
          </Link>
        </div>
      </div>
    </div>
  );
};
