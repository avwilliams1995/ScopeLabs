import React, {useState, useEffect} from "react";

function AddComment() {
  const [comment, setComment] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleCancel = () => {
    setFocused(false);
  };

  useEffect(() => {
    setComment("");
  }, [focused])
  
  return (
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
      {focused && (
        <>
          <button
            className="ml-5 text-[.8rem] px-3 py-1 bg-main rounded-md hover:brightness-110 cursor-pointer "
            disabled={comment.length > 0}
            onClick={() => {}}
          >
            Comment
          </button>
          <button
            className="ml-2 text-[.8rem] px-3 py-1 bg-black/20 rounded-md hover:brightness-110 cursor-pointer "
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default AddComment;
