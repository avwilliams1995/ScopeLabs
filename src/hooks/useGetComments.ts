import { CommentProps, GetCommentProps } from "../types";
import { useState, useEffect } from "react";

export default function useGetComments({
  video_id,
}: {
  video_id: string;
}): GetCommentProps {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getComments() {
    await fetch(`http://localhost:3000/api/videos/comments/${video_id}`)
      .then((r) => r.json())
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch(() => setError("Error in fetching comments"));
  }

  useEffect(() => {
    getComments();
  }, []);

  return { comments, error, getComments, isLoading };
}
