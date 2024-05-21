import React, { useRef, useState, useEffect } from "react";
import { CommentProps, VideoProps } from "../../types";
import Comment from "./Comment";
import AddComment from "./AddComment";

function CommentSection({
  comments,
  videoData,
}: {
  comments: CommentProps[];
  videoData: VideoProps;
}) {
  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-md font-semibold">{`${comments.length} ${
        comments.length > 1 ? "comments" : "comment"
      }`}</h1>
      <div className="flex flex-row items-center mt-4 ">
        <img
          src={videoData.avatar}
          alt="avatar"
          className="h-[8vh] rounded-full"
        />
        <AddComment />
      </div>
      <div className="mt-10">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
