import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import AudioPlayer from "../components/audioPlayer";
import Queue from "../components/queue";
import SongCard from "../components/songCard";
import apiClient from "../../spotify";
import "./Player.css";

const Player = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const songFromTrending = location.state?.song || null;
  const playlist = location.state?.playlist || null;
  console.log("Bài hát : ", songFromTrending);
  console.log("Playlist : ", playlist);

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Nếu chọn playlist, lấy danh sách bài hát từ playlist
  useEffect(() => {
    if (songFromTrending) {
      setTracks([songFromTrending]); // Chỉ phát bài từ Trending
      setCurrentTrack(songFromTrending);
      setCurrentIndex(0);
    } else if (playlist && playlist.songs) {
      setTracks(playlist.songs);
      setCurrentIndex(0);
      setCurrentTrack(playlist.songs[0]);
    }
  }, [playlist, songFromTrending]);

  // Cập nhật bài hát hiện tại khi đổi index
  useEffect(() => {
    if (
      tracks.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < tracks.length
    ) {
      setCurrentTrack(tracks[currentIndex]);
      console.log("Cập nhật bài hát:", tracks[currentIndex]); // Kiểm tra bài hát
    }
  }, [currentIndex, tracks]);

  const backToTrending = () => {
    navigate("/trending");
  };

  const backgroundImage = songFromTrending?.cover;

  return (
    <div
      className="player-container w-[calc(100%-100px)] max-h-full rounded-[30px] flex justify-between relative"
      style={{
        background: backgroundImage
          ? `linear-gradient(to bottom, rgba(30,42,62,0.6), rgba(30,42,62,1)), url(${backgroundImage})`
          : "#1E2A3E", // Default background color
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Nếu không có bài hát nào */}
      {!currentTrack ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-white text-2xl font-bold">
            Không có bài hát nào được phát
          </p>
        </div>
      ) : (
        <>
          {/* Nếu chọn bài từ Trending */}
          {songFromTrending ? (
            <div className="w-full flex justify-center items-center">
              <IoMdArrowRoundBack
                onClick={backToTrending}
                className="text-white text-4xl cursor-pointer hover:scale-110"
              />
              <AudioPlayer
                currentTrack={currentTrack}
                total={tracks}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            </div>
          ) : (
            <>
              {/* Player khi chọn playlist */}
              <div className="left-player-body">
                <AudioPlayer
                  currentTrack={currentTrack}
                  total={tracks}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              </div>

              <div className="right-player-body">
                {currentTrack?.album && <SongCard album={currentTrack.album} />}
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Player;
