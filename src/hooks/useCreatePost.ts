import { useEffect, useState } from "react";
import { PostProps } from "../types";

export async function useCreatePost(postInfo: PostProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInfo),
    })
      .then((r) => r.json())
      .then((data) => {
        setResponse(data);
        setIsLoading(false);
      })
      .catch(() => setError("Error in creating post"));
  });
  return { response, error, isLoading };
}


