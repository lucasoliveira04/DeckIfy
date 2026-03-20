export const FooterComponent = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 px-6 py-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-lg font-bold text-slate-100">
            Deck<span className="text-indigo-400">ify</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
