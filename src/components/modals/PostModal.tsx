import React, { useEffect, useState } from "react";
import { GetCommentProps, VideoProps } from "../../types";
import ReactPlayer from "react-player";
import CommentSection from "../comments/CommentSection";
import useGetComments from "../../hooks/useGetComments";
import { CommentProps } from "../../types";

interface PostModalProps {
  videoData: VideoProps;
  togglePostModal: () => void;
}

function PostModal({ videoData, togglePostModal }: PostModalProps) {
  const { comments, error, getComments, isLoading }: GetCommentProps =
    useGetComments({ video_id: videoData.id });
  const daysBetween =
    new Date().getDate() - new Date(videoData.created_at).getDate();

  const refreshComments = async () => {
    try {
      getComments();
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  return (
    <div className="fixed w-full h-full h-screen bg-black bg-opacity-35 flex justify-center items-center ">
      <div className="fixed top-12 flex flex-col overflow-scroll h-full ">
        <button
          onClick={togglePostModal}
          className="text-black text-xl place-self-end cursor:pointer "
        >
          x
        </button>
        {!isLoading ? (
          <div className="w-[60vw] bg-gradient-to-b from-secondary from-60% to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 rounded-md mb-40">
            <div className="self-center bg-white w-full h-[50vh]">
              <ReactPlayer
                url={videoData.video_url}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>

            <p className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[1rem] font-bold text-black self-start mt-1">{`${videoData.title}`}</p>
            <div className="flex flex-row items-center self-start pl-1 mt-1">
              <img
                src={videoData.avatar}
                alt="avatar"
                className="h-[8vh] rounded-full"
              />
              <div className="flex flex-col ">
                <p className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-medium text-black">{`${videoData.user_id}`}</p>
              </div>
            </div>
            <div className="bg-white rounded-md mt-5 p-3">
              <p className="text-md font-semibold">
                {daysBetween === 0 ? "Today" : `${daysBetween} days ago`}
              </p>
              <p className="text-sm font-light">{videoData.description}</p>
            </div>
            <CommentSection comments={comments} videoData={videoData} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PostModal;
