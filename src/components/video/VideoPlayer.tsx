import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  return (
    <>
      <ReactPlayer url={videoUrl} width="95%" height="75%" controls={true} />
    </>
  );
}

export default VideoPlayer;
