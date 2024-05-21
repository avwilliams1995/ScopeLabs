import { useState } from "react";
import useGetVideos from "./hooks/useGetVideos";
import { GetVideoProps, VideoProps, UserProps } from "./types";
import Navbar from "./components/navbar/Navbar";
import PostCard from "./components/posts/PostCard";
import PostModal from "./components/modals/PostModal";

function App() {
  // fetch video posts upon username added

  const [currentUser, setCurrentUser] = useState<UserProps>({
    name: "",
    avatar: "",
  });
  const { videoData, error, isLoading, getVideos }: GetVideoProps =
    useGetVideos({ user_id: currentUser.name });
  const [currentPost, setCurrentPost] = useState<VideoProps | null>(null);

  // be able to refresh posts after editing, new post, etc.
  const refreshPosts = async () => {
    try {
      getVideos();
    } catch (error) {
      alert("Error refreshing posts");
    }
  };

  return (
    <div className="bg-gradient-to-b from-main from-40% to-white h-screen mb-20">
      {/* open post modal if there is currentPost data, meaning post was selected */}
      {currentPost ? (
        <PostModal
          currentUser={currentUser}
          videoData={currentPost}
          togglePostModal={() => setCurrentPost(null)}
          refreshPosts={refreshPosts}
        />
      ) : null}

      <Navbar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        refreshPosts={refreshPosts}
      />

      <div className="flex flex-col items-center px-15 mt-5">
        <h1 className="text-[2.5rem] font-medium">Welcome to Learnwell!</h1>
        {currentUser.name !== "" ? (
          <p>Click on a card below to join a conversation</p>
        ) : (
          <p>Login to see user's posts</p>
        )}
        {/* if loading, have load wheel display. If not, display videos */}
        {!isLoading ? (
          <section
            className={
              videoData.length > 0
                ? "grid grid-cols-3 gap-12 mt-10"
                : "flex items-center mt-20"
            }
          >
            {videoData?.length > 0 || currentUser.name == "" ? (
              videoData.map((video, index) => (
                <PostCard
                  currentUser={currentUser}
                  setCurrentPost={setCurrentPost}
                  key={index}
                  videoData={video}
                />
              ))
            ) : (
              <div>
                <p>No posts yet</p>
              </div>
            )}
          </section>
        ) : (
          // loading wheel
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
