import React, { Dispatch, SetStateAction, useState } from "react";
import LOGO_ICON from "../../assets/LOGO_ICON.png";

interface LoginModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<string | null>>;
}

function LoginModal({ setIsModalOpen, setCurrentUser }: LoginModalProps) {
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length === 0 || userName.includes(" ")) {
      setError("Invalid username");
    } else {
      setCurrentUser(userName);
      setIsModalOpen(false);
    }
  };

  return (
    // only doing username since this is a mockup
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[90vw] md:w-[40vw] flex flex-col">
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-black text-xl place-self-end"
        >
          x
        </button>
        <div className="min-h-[60vh] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-14 w-auto"
              src={LOGO_ICON}
              alt="Workflow"
            ></img>
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form>
                <div>
                  {error ? (
                    <p className="block text-sm mb-1 font-medium leading-5 text-[#ff0000]">
                      {error}
                    </p>
                  ) : null}
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      placeholder="drew_williams"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    ></input>
                    <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col  sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember"
                      type="checkbox"
                      value="1"
                      className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    ></input>
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm leading-5 text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-xs sm:text-small leading-5 mt-2 sm:mt-0 ">
                    <a
                      href="#"
                      className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                      Forgot your username?
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      onClick={handleSubmit}
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-main hover:bg-main/60 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-black-100 transition duration-150 ease-in-out"
                    >
                      Sign in
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
