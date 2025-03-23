import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

export const HeaderComponent = () => {
  return (
    <div>
      <footer className="w-full bg-gray-800 text-white p-2">
        <div className="flex justify-end space-x-4">
          <Link>
            <FaGithub className="text-xl hover:opacity-50" />
          </Link>
          <Link>
            <FaInstagram className="text-xl hover:opacity-50" />
          </Link>
          <Link>
            <FaTwitter className="text-xl hover:opacity-50" />
          </Link>
        </div>
      </footer>
    </div>
  );
};
