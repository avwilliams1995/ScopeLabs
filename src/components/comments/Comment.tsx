import React from "react";
import { CommentProps } from "../../types";
import { AvatarGenerator } from "random-avatar-generator";
import { useEffect, useState } from "react";

function Comment({ comment }: { comment: CommentProps }) {
  // individual comment component
  const [randomAvatar, setRandomAvatar] = useState<string>("");
  const daysBetween =
    new Date().getDate() - new Date(comment.created_at || "").getDate();

  // Use the useEffect hook to generate a random avatar
  useEffect(() => {
    const generator = new AvatarGenerator();
    const randomAvatar = generator.generateRandomAvatar();
    setRandomAvatar(randomAvatar);
  }, []);

  return (
    <div className="flex flex-row items-center mt-4 ">
      <img src={randomAvatar} alt="avatar" className="h-[8vh] rounded-full" />
      <div className="p-3 flex flex-col justify-center">
        <div className="flex flex-row items-center ">
          <p className="text-[1rem] font-medium">{`@${comment.user_id}`}</p>
          <p className="ml-2 mt-1 text-[.6rem]  text-black/80 ">
            {daysBetween === 0 ? "Today" : `${daysBetween} days ago`}
          </p>
        </div>
        <p className="text-sm font-light">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
