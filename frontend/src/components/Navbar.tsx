import { logout } from "@/api/Auth";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./Auth/ProtectedRoutes";
import { ActivityLog } from "./ActivityLog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const [isActivityDialogOpen, setActivityDialogOpen] = useState(false);
  const handleUpdateDialogOpen = () => {
    setActivityDialogOpen(true);
  };
  const handleUpdateDialogClose = () => setActivityDialogOpen(false);

  const onToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      auth.logout();
      toast.success("Logged out Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-white md:fixed md:w-full top-0 left-0 flex justify-between items-center py-7 px-10 z-10">
        <div>
          <h1 className="font-bold text-green-500 text-2xl">
            Task Management Application
          </h1>
        </div>
        <div
          className={`md:static absolute md:min-h-fit bg-white min-h-[60vh] left-0 ${
            isMenuOpen ? "top-[9%]" : "top-[-100%]"
          }  md:w-auto w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <Link to="/" className="hover:text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-100">
                Tasks
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-100">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleUpdateDialogOpen}>
                Activity Logs
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-gray-100">
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative inline-block">
          <div
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer"
          >
            {auth.user?.username}
            {dropdownVisible ? (
              <FaChevronUp className="ml-2" />
            ) : (
              <FaChevronDown className="ml-2" />
            )}
          </div>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-2">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </div>
                <div
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="flex items-center gap-6 md:hidden"
          onClick={onToggleMenu}
        >
          {isMenuOpen ? (
            <IoMdClose className="text-3xl cursor-pointer " />
          ) : (
            <IoMdMenu className="text-3xl cursor-pointer" />
          )}
        </div>
      </nav>
      <ActivityLog
        isOpen={isActivityDialogOpen}
        onClose={handleUpdateDialogClose}
      />
    </>
  );
};

export default Navbar;
