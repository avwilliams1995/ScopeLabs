import React, { useRef, useState, useEffect } from "react";
import { CommentProps, UserProps, VideoProps } from "../../types";
import Comment from "./Comment";
import AddComment from "./AddComment";

function CommentSection({
  comments,
  videoData,
  currentUser,
  refreshComments
}: {
  comments: CommentProps[];
  videoData: VideoProps;
  currentUser: UserProps;
  refreshComments: () => void;
}) {
  // comment section component
  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-md font-semibold">{`${comments.length} ${
        comments.length > 1 ? "comments" : "comment"
      }`}</h1>
      
        <AddComment refreshComments={refreshComments} currentUser={currentUser} videoData={videoData}/>

      <div className="mt-10">
        {/* map through comments, create comment to display for each individual comment */}
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
