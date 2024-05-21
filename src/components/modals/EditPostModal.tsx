import { Dispatch, SetStateAction, useState } from "react";
import { VideoProps } from "../../types";

interface EditPostModalProps {
  videoData: VideoProps;
  setEditPost: Dispatch<SetStateAction<boolean>>;
  refreshPosts: () => void;
  togglePostModal: () => void;
}

function EditPostModal({
  videoData,
  setEditPost,
  refreshPosts,
  togglePostModal,
}: EditPostModalProps) {
  const [title, setTitle] = useState<string>(videoData.title);
  const [description, setDescription] = useState<string>(videoData.description);
  const [error, setError] = useState<string | null>(null);
  console.log("in edit post", videoData);

  // useEffect(()=> {
  //   setTitle(videoData.title);
  //   setDescription(videoData.description);

  // }, [videoData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || description.length === 0) {
      setError("Please fill out all fields");
      return;
    }
    await fetch("http://localhost:3000/api/videos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: videoData.id,
        title: title,
        description: description,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        alert("Post edited successfully");
        setEditPost(false);
        togglePostModal();
        refreshPosts();
      })
      .catch(() => setError("Error in creating post"));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[90vw] md:w-[40vw] flex flex-col">
        <button
          onClick={() => setEditPost(false)}
          className="text-black text-xl place-self-end"
        >
          x
        </button>
        <div className="min-h-[60vh] bg-gray-50 flex flex-col justify-start py-12 sm:px-6 lg:px-8 px-6">
          <div className=" sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form>
                <div>
                  {error ? (
                    <p className="block text-sm mb-1 font-medium leading-5 text-[#ff0000]">
                      {error}
                    </p>
                  ) : null}

                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1 mb-3 relative rounded-md shadow-sm">
                    <input
                      placeholder="Enter a title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    ></input>
                  </div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1 mb-3 relative rounded-md shadow-sm ">
                    <textarea
                      className="block w-full p-4 text-base border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-start"
                      id="exampleFormControlTextarea1"
                      rows={3}
                      placeholder="Enter a description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      onClick={handleSubmit}
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-main hover:bg-main/60 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-black-100 transition duration-150 ease-in-out"
                    >
                      Edit Post
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

export default EditPostModal;
