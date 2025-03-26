import React, { useEffect, useRef, useState } from "react";
import ProgressCircle from "./ProgressCircle";
import "./AudioPlayer.css";
import WaveAnimation from "./WaveAnimation";
import Controls from "./Controls";
import { useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

const AudioPlayer = ({ currentIndex, setCurrentIndex, total }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const songFromTrending = location.state?.song || null;

  const currentTrack = songFromTrending || total[currentIndex]?.track;
  const audioSrc = currentTrack?.preview_url;
  const youtubeID = songFromTrending?.youtubeID;

  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isYouTubePlaying, setIsYouTubePlaying] = useState(false);

  const audioRef = useRef(new Audio(audioSrc));
  const youtubeRef = useRef(null);
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const handleSongEnd = () => {
    // Nếu đang phát từ Trending, điều hướng về trang trending
    navigate("/trending");
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (audioSrc && !youtubeID) {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
      setTrackProgress(0); // Reset thời gian phát

      if (isReady.current) {
        audioRef.current.play();
        setIsPlaying(true);
        startTimer();
      } else {
        isReady.current = true;
      }
    }

    if (youtubeID && youtubeRef.current) {
      youtubeRef.current.internalPlayer.loadVideoById(youtubeID);
      setIsYouTubePlaying(true);
    }
  }, [currentIndex, songFromTrending]);

  useEffect(() => {
    if (!youtubeID) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlayPause = () => {
    if (youtubeID) {
      if (youtubeRef.current) {
        if (isYouTubePlaying) {
          youtubeRef.current.internalPlayer.pauseVideo();
          setIsPlaying(false); // Cập nhật trạng thái chung
        } else {
          youtubeRef.current.internalPlayer.playVideo();
          setIsPlaying(true); // Cập nhật trạng thái chung
        }
      }
      setIsYouTubePlaying(!isYouTubePlaying);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const addZero = (n) => (n > 9 ? "" + n : "0" + n);

  const songImage =
    songFromTrending?.cover ||
    currentTrack?.album?.images[0]?.url ||
    "default-image.jpg";
  const artists = songFromTrending
    ? [songFromTrending.artist]
    : currentTrack?.album?.artists.map((artist) => artist.name) || [];

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={75}
          isPlaying={isPlaying || isYouTubePlaying}
          image={songImage}
          size={300}
          color="#fff"
        />
      </div>

      <div className="player-right-body flex">
        <p className="song-title">
          {currentTrack?.name || songFromTrending?.title}
        </p>
        <p className="song-artist my-[20px]">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          {songFromTrending ? (
            <YouTube
              videoId={youtubeID}
              ref={youtubeRef}
              opts={{
                height: "0",
                width: "0",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                },
              }}
              onPlay={() => setIsYouTubePlaying(true)}
              onPause={() => setIsYouTubePlaying(false)}
              onEnd={handleSongEnd}
            />
          ) : (
            <WaveAnimation isPlaying={isPlaying} />
          )}
          <Controls
            isPlaying={isPlaying || isYouTubePlaying} // Đảm bảo cập nhật đúng trạng thái
            setIsPlaying={togglePlayPause}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
