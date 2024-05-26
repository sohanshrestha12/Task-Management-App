import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const onToggleMenu = () => {
     setIsMenuOpen((prevState) => !prevState);
   };
  return (
    <nav className="bg-white flex justify-between items-center py-8 px-12">
      <div>
        <h1 className="font-bold">Task Management Application</h1>
      </div>
      <div
        className={`md:static absolute md:min-h-fit bg-white min-h-[60vh] left-0 ${
          isMenuOpen ? "top-[9%]" : "top-[-100%]"
        }  md:w-auto w-full flex items-center px-5`}
      >
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
          <li>
            <Link to="/" className="hover:text-gray-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-500">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-500">
              Help
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-500">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-500">
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6 md:hidden" onClick={onToggleMenu}>
        {isMenuOpen ? (
          <IoMdClose className="text-3xl cursor-pointer " />
        ) : (
          <IoMdMenu className="text-3xl cursor-pointer" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
