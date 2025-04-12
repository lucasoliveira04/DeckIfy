import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export const FooterComponent = () => {
  return (
    <footer className="relative w-full bg-gray-300 text-gray-900 p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Deck<span className="text-green-600">ify</span>
          </h1>
          <p className="text-gray-950 text-sm font-bold">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://github.com/lucasoliveira04"
            className="text-gray-600 hover:text-green-600 transition duration-300"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/lucasoliveira.04_/"
            className="text-gray-600 hover:text-green-600 transition duration-300"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-oliveira-campos/"
            className="text-gray-600 hover:text-green-600 transition duration-300"
          >
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};
