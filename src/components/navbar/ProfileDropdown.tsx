import { Menu, Transition } from "@headlessui/react";
import {  Fragment } from "react";;
import { NavbarProps } from "../../types";

const ProfileDropdown = ({ currentUser, setCurrentUser, refreshPosts }: NavbarProps) => {
  // profile dropdown component using headless ui
  
  return (
    <>
      <div>
        <Menu as="div" className={`relative inline-block text-clip text-left sm:ml-5 `}>
          <div>
            <Menu.Button className="inline-flex truncate px-1 py-1  justify-center items-center rounded-lg bg-transparent text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-medium text-black hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <img src={currentUser.avatar} alt="avatar" className="h-[6vh] rounded-full mr-2" />
              {`@${currentUser.name}`}
              
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-black/10 text-black" : "text-gray-900"
                      } group flex w-full items-start rounded-md px-1 py-1 text-[.8rem]`}
                      onClick={() => {
                        setCurrentUser({ name: "", avatar: "" }) 
                        alert("Log out successful")
                        refreshPosts()
                        
                      }}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default ProfileDropdown;
