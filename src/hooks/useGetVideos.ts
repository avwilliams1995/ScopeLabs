import { VideoProps } from "../types";
import { useState, useEffect } from "react";
import { GetVideoProps } from "../types";

export default function useGetVideos({user_id}:{user_id:string}):GetVideoProps {
  const [videoData, setVideoData] = useState<VideoProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  const getVideos = async () => {
    setIsLoading(true);
    if (user_id===""){
      setIsLoading(false);
      return;
    }
    fetch(`http://localhost:3000/api/videos/${user_id}`)
      .then((r) => r.json())
      .then((data) => {
        setIsLoading(false);
        setVideoData(data.videos);
      })
      .catch(() => setError("Error in fetching videos"));
      return videoData;
  }

  useEffect(() => {
    getVideos();
  }, [user_id]);

  return { videoData, error, isLoading, getVideos };
}
