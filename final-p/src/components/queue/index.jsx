import React, { useEffect } from "react";
import "./queue.css";

const Queue = ({ tracks, setCurrentIndex, currentIndex }) => {
  useEffect(() => {
    console.log("Danh sách bài hát trong Queue:", tracks);
  }, [tracks]);

  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className={`queue-item flex ${
                index === currentIndex ? "now-playing" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <p className="track-name">{track?.name}</p>
              <p className="track-artist">{track?.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Queue;
