import React, { useEffect, useState } from "react";
import { VideoProps, UserProps } from "../../types";
import { AvatarGenerator } from "random-avatar-generator";
import ReactPlayer from "react-player";
import useGetComments from "../../hooks/useGetComments";
import Button from "../Button";

function PostCard({
  videoData,
  setCurrentPost,
  currentUser,
}: {
  videoData: VideoProps;
  setCurrentPost: React.Dispatch<React.SetStateAction<VideoProps | null>>;
  currentUser: UserProps;
}) {
  // using random avatars for now, initially had though the post feed would show all posts, not just the users posts, which is why they are random
  const [avatar, setAvatar] = useState<string>("");
  // create random avatar for each post
  useEffect(() => {
    const generator = new AvatarGenerator();
    const randomAvatar = generator.generateRandomAvatar();
    setAvatar(randomAvatar);
  }, []);

  return (
    <>
      <div
        onClick={() => {
          // checking if user is logged in, if so, set the current post to the post clicked on. Like earlier, had thought all posts would display, not just user posts, was going to have user have to sign in to comment on post
          currentUser.name !== ""
            ? setCurrentPost({ ...videoData, avatar })
            : alert("Please login to join the conversation!");
        }}
        className="py-3 px-3 mt-5 sm:mt-0 bg-gradient-to-b from-secondary from-10% to-white h-[45vh] w-[90vw] sm:w-[30vw] flex flex-col justify-between items-center rounded-lg cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
      >
        <ReactPlayer
          url={videoData.video_url}
          width="95%"
          height="75%"
          controls={true}
        />
        <p className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[1rem] font-bold text-black self-start mt-1">{`${videoData.title}`}</p>
        <div className="flex flex-row items-center justify-between self-start  pl-3 pr-3 mt-1 w-full">
          <div className="flex flex-row items-center">
            <img src={avatar} alt="avatar" className="h-[8vh] rounded-full" />
            <div className="flex flex-col">
              <p className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-medium text-black">{`${videoData.user_id}`}</p>
              <p
                onClick={() => {
                  currentUser.name !== ""
                    ? setCurrentPost({ ...videoData, avatar })
                    : alert("Please login to join the conversation!");
                }}
                className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-light text-black hover:underline cursor-pointer"
              >{`${videoData.num_comments} ${
                videoData.num_comments === 1 ? "comment" : "comments"
              }`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
