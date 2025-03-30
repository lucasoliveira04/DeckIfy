export const AlertMessage = ({ message, typeMessage }) => {
  const alertClass =
    typeMessage === "success"
      ? "bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
      : "bg-red-100 border-l-4 border-red-500 text-red-700 p-4";

  return (
    <div
      className={`${alertClass} fixed bottom-4 right-4 z-50 w-[300px] rounded-lg shadow-md transition-opacity duration-500 opacity-100`}
      role="alert"
    >
      <strong className="font-bold">
        {typeMessage === "success" ? "Sucesso!" : "Erro!"}
      </strong>
      <span className="block">{message}</span>
    </div>
  );
};
