// Desc: Navbar component for the application
import { Dispatch, SetStateAction, useState } from "react";
import Learnwell_Dark_Logo from "../../assets/FULL_LOGO_DARK.png";
import Button from "../Button";
import ProfileDropdown from "./ProfileDropdown";
import { NavbarProps } from "../../types";
import CreatePostModal from "../modals/CreatePostModal";
import LoginModal from "../modals/LoginModal";

function Navbar({ currentUser, setCurrentUser, refreshPosts }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createPost, setCreatePost] = useState<boolean>(false);

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
        {/* check if logged in */}
        {currentUser.name === "" ? (
          <div className="">
            <Button onClick={() => setIsModalOpen(true)}>
              <span className="text-black text-[.7rem] sm:text-[.8rem] md:text-[.9rem] tracking-wide h-full w-full block relative linear-mask">
                LOGIN
              </span>
            </Button>
            {/* check if login is clicked, if so, display login modal */}
            {isModalOpen ? (
              <LoginModal
                setIsModalOpen={setIsModalOpen}
                setCurrentUser={setCurrentUser}
              />
            ) : null}
          </div>
        ) : (
          // if logged in, display create button
          <div className="flex flex-row justify-between items-center ">
            <Button onClick={()=> setCreatePost(true)} >
              {/* when clicked, open create post modal */}
              <span className="text-black text-[.6rem] sm:text-[.8rem] md:text-[.9rem] tracking-wide h-full w-full block  linear-mask ">
                CREATE
              </span>
            </Button>
            {/* profile dropdown to be able to sign out */}
            <ProfileDropdown refreshPosts={refreshPosts} currentUser={currentUser} setCurrentUser={setCurrentUser} />
            { createPost ? <CreatePostModal currentUser={currentUser} refreshPosts={refreshPosts} setCreatePost={setCreatePost} /> : null}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
