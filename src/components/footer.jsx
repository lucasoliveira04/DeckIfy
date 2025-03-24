import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export const FooterComponent = () => {
  return (
    <footer className="w-full bg-gray-900 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 ">
            Deck{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
              ify
            </span>
          </h1>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>

        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-300 hover:text-gray-500 transition duration-300"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-gray-500 transition duration-300"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-gray-500 transition duration-300"
          >
            <FaTwitter className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};
