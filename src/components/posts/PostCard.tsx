import React, { useEffect, useState } from "react";
import { VideoProps } from "../../types";
import { AvatarGenerator } from "random-avatar-generator";
import ReactPlayer from "react-player";
import useGetComments from "../../hooks/useGetComments";

function PostCard({ videoData, setCurrentPost }: { videoData: VideoProps, setCurrentPost: React.Dispatch<React.SetStateAction<VideoProps | null>>}) {
  const [avatar, setAvatar] = useState<string>("");
  const [openPostModal, setOpenPostModal] = useState(false);

  useEffect(() => {
    const generator = new AvatarGenerator();
    const randomAvatar = generator.generateRandomAvatar();
    setAvatar(randomAvatar);
  }, []);



  return (
    <>
    <div
      onClick={() => {
        setCurrentPost({ ...videoData, avatar });
      }}
      className="py-3 px-3 bg-gradient-to-b from-secondary from-10% to-white h-[45vh] w-[30vw] flex flex-col justify-between items-center rounded-lg cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
    >
      <ReactPlayer
        url={videoData.video_url}
        width="95%"
        height="75%"
        controls={true}
      />
      <p className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[1rem] font-bold text-black self-start mt-1">{`${videoData.title}`}</p>
      <div className="flex flex-row items-center self-start pl-1 mt-1">
        <img src={avatar} alt="avatar" className="h-[8vh] rounded-full" />
        <div className="flex flex-col ">
          <p className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-medium text-black">{`${videoData.user_id}`}</p>
          <p
            onClick={() => {
              setCurrentPost({ ...videoData, avatar });
            }}
            className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-light text-black hover:underline cursor-pointer"
          >{`${videoData.num_comments} comments`}</p>
        </div>
      </div>
      
    </div>
   
    </>
  );
}

export default PostCard;
