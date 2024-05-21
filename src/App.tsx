import { useEffect, useState } from "react";
import useGetVideos from "./hooks/useGetVideos";
import {GetVideoProps, VideoProps} from "./types";
import { users } from "./userData/userData";
import Navbar from "./components/navbar/Navbar";
import PostCard from "./components/posts/PostCard";
import PostModal from "./components/modals/PostModal";

function App() {
  // fetch video posts upon component mounting
  const { videoData, error, isLoading, getVideos }: GetVideoProps =
    useGetVideos();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentPost, setCurrentPost] = useState<VideoProps | null>(null);

  const refreshPosts = async () => {
    try {
      getVideos();
    } catch (error) {
      console.error("Error refreshing posts:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-main from-40% to-white h-screen mb-20">
      {currentPost ? (
        <PostModal videoData={currentPost} togglePostModal={() => setCurrentPost(null)} />
      ) : null}
      <Navbar user={currentUser} setCurrentUser={setCurrentUser} />
      
      <div className="flex flex-col items-center px-20 mt-5">
      <h1 className="text-[2.5rem] font-medium">Welcome to Learnwell!</h1>
      {currentUser ? <p>Click on a card below to join a conversation</p> : <p>Login to join a conversation</p>}
      
      {!isLoading ? (
        <section className="grid grid-cols-3 gap-1 mt-10">
          {videoData ? videoData.map((video, index) => (
            <PostCard setCurrentPost={setCurrentPost} key={index} videoData={video} />
          )):null}
        </section>
      ) : null}
      </div>
    </div>
  );
}

export default App;
