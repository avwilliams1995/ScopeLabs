import { useEffect, useState } from "react";
import { VideoProps, UserProps } from "../../types";

function AddComment({
  videoData,
  currentUser,
  refreshComments,
}: {
  videoData: VideoProps;
  currentUser: UserProps;
  refreshComments: () => void;
}) {
  // add comment component
  const [comment, setComment] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    setComment("");
  }, [focused]);

  // handle cancel comment to set focused to false to remove input
  const handleCancel = () => {
    setFocused(false);
  };

  // handle submit comment
  const handleSubmit = async () => {
    // check if comment is empty or more than 100 characters
    if (comment.length === 0 || comment.length > 100) {
      alert("Comment must be between 1 and 100 characters");
      return;
    }

    await fetch("http://localhost:3000/api/videos/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.name,
        video_id: videoData.id,
        content: comment,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        alert("Comment added successfully");
        setComment("");
        refreshComments();
      })
      .catch((error) => {
        console.log(error);
        alert("Error in commenting on post");
      });
  };

  return (
    <div className="flex flex-row items-center mt-4 ">
      <img
        src={currentUser?.avatar}
        alt="avatar"
        className="h-[8vh] rounded-full"
      />
      <div className="flex flex-row">
        <div className="flex flex-col">
          <input
            type="text"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add a comment"
            className="ml-3 w-[30vw] h-10 bg-transparent placeholder-black/80 border-none focus:outline-none"
          />
          <div className="w-full ml-2 border-b border-black"></div>
        </div>
        {
          <>
            <button
              className="ml-5 text-[.8rem] px-3 py-1 bg-main rounded-md hover:brightness-110 cursor-pointer "
              onClick={handleSubmit}
            >
              Comment
            </button>
            <button
              className="ml-2 text-[.8rem] px-3 py-1 bg-black/20 rounded-md hover:bg-black/25 cursor-pointer "
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        }
      </div>
    </div>
  );
}

export default AddComment;
