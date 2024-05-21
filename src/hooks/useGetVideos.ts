import { VideoProps } from "../types";
import { useState, useEffect } from "react";
import { GetVideoProps } from "../types";

export default function useGetVideos():GetVideoProps {
  const [videoData, setVideoData] = useState<VideoProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getVideos = async () => {
    fetch("http://localhost:3000/api/videos")
      .then((r) => r.json())
      .then((data) => {
        setIsLoading(false);
        setVideoData(data.videos);
      })
      .catch(() => setError("Error in fetching videos"));
  }

  useEffect(() => {
    getVideos()
  }, []);

  return { videoData, error, isLoading, getVideos };
}
