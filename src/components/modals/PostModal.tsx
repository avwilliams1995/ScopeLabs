import { useState } from "react";
import { GetCommentProps, UserProps, VideoProps } from "../../types";
import ReactPlayer from "react-player";
import CommentSection from "../comments/CommentSection";
import useGetComments from "../../hooks/useGetComments";
import Button from "../Button";
import EditPostModal from "./EditPostModal";

interface PostModalProps {
  videoData: VideoProps;
  currentUser: UserProps;
  togglePostModal: () => void;
  refreshPosts: () => void;
}

function PostModal({
  videoData,
  togglePostModal,
  currentUser,
  refreshPosts,
}: PostModalProps) {
  // post modal component for when a post card is selected

  // fetch comments for video post
  const { comments, error, getComments, isLoading }: GetCommentProps =
    useGetComments({ video_id: videoData.id });
  // calculate days between todays date and post created date
  const daysBetween =
    new Date().getDate() - new Date(videoData.created_at).getDate();
  const [editPost, setEditPost] = useState(false);

  // refresh comments for when new comment added
  const refreshComments = async () => {
    try {
      getComments();
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  return (
    <div className="fixed w-full h-full h-screen bg-black bg-opacity-45 flex justify-center items-center ">
      <div className="fixed top-20 flex flex-col h-full overflow-scroll">
        <button
          onClick={togglePostModal}
          className="text-black text-xl place-self-end cursor:pointer"
        >
          X
        </button>
        {/* display edit post modal when edit button clicked */}
        {editPost ? (
          <EditPostModal
            videoData={videoData}
            refreshPosts={refreshPosts}
            togglePostModal={togglePostModal}
            setEditPost={setEditPost}
          />
        ) : null}
        {/* if not laoding, display the post content. If loading, display wheel */}
        {!isLoading ? (
          <div className="w-[60vw]  bg-gradient-to-b from-secondary from-60% to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 rounded-md mb-40">
            <div className="self-center bg-white w-full h-[50vh]">
              <ReactPlayer
                url={videoData.video_url}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>

            <p className="ml-3 text-[.7rem] sm:text-[.8rem] md:text-[1rem] font-bold text-black self-start mt-1">{`${videoData.title}`}</p>
            <div className="flex flex-row items-center justify-between pl-1 mt-1">
              <div className="flex flex-row items-center">
                <img
                  src={videoData.avatar}
                  alt="avatar"
                  className="h-[8vh] rounded-full"
                />
                <div className="flex flex-col ">
                  <p className="ml-3 mr-3 text-[.7rem] sm:text-[.8rem] md:text-[.9rem] font-medium text-black">{`${videoData.user_id}`}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setEditPost(true);
                }}
                color={"bg-darkerMain "}
              >
                <span className="text-black text-[.6rem] sm:text-[.8rem] md:text-[.9rem] tracking-wide h-full w-full block  ">
                  Edit
                </span>
              </Button>
            </div>
            <div className="bg-white rounded-md mt-5 p-3">
              <p className="text-md font-semibold">
                {daysBetween === 0 ? "Today" : `${daysBetween} days ago`}
              </p>
              <p className="text-sm font-light">{videoData.description}</p>
            </div>
            <CommentSection
              refreshComments={refreshComments}
              currentUser={currentUser}
              comments={comments}
              videoData={videoData}
            />
          </div>
        ) : (
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

export default PostModal;
