// Desc: Navbar component for the application
import { Dispatch, SetStateAction, useState } from "react";
import Learnwell_Dark_Logo from "../../assets/FULL_LOGO_DARK.png";
import Button from "../Button";
import ProfileDropdown from "./ProfileDropdown";
import { ProfileDropdownProps } from "../../types";
import LoginModal from "../modals/LoginModal";

function Navbar({ user, setCurrentUser }: ProfileDropdownProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="sticky top-0 py-10 px-3 sm:px-10 md:px-20 flex justify-between items-center  h-[7vh] max-lg:py-5 bg-black/5">
      <a
        className="w-28 md:w-32 lg:w-40"
        href="/"
        target="_blank"
      >
        <img src={Learnwell_Dark_Logo} alt="Learnwell Logo" />
      </a>
      <div>
        {!user ? (
          <div className="">
            <Button onClick={() => setIsModalOpen(true)}>
              <span className="text-black text-[.7rem] sm:text-[.8rem] md:text-[.9rem] tracking-wide h-full w-full block relative linear-mask">
                LOGIN
              </span>
            </Button>
            {isModalOpen ? (
              <LoginModal
                setIsModalOpen={setIsModalOpen}
                setCurrentUser={setCurrentUser}
              />
            ) : null}
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center ">
            <Button>
              <span className="text-black text-[.6rem] sm:text-[.8rem] md:text-[.9rem] tracking-wide h-full w-full block relative linear-mask ">
                CREATE
              </span>
            </Button>
            <ProfileDropdown user={user} setCurrentUser={setCurrentUser} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
