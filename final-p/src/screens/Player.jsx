import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import apiClient from "../../spotify";
import Queue from "../components/queue";
import SongCard from "../components/songCard";
import AudioPlayer from "../components/audioPlayer";
import Widgets from "../components/widgets";
import "./Player.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const Player = () => {
  const location = useLocation();
  const songFromTrending = location.state?.song || null;
  const navigate = useNavigate();

  console.log("songFromTrending : ", location.state);

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lấy danh sách bài hát từ playlist (nếu có id)
  useEffect(() => {
    if (location.state?.id) {
      apiClient
        .get(`playlists/${location.state.id}/tracks`)
        .then((response) => {
          if (response.data.items.length > 0) {
            setTracks(response.data.items);
            setCurrentTrack(response.data.items[0]?.track);
          }
        });
    }
  }, [location.state]);

  // Cập nhật bài hát hiện tại khi `currentIndex` hoặc `tracks` thay đổi
  useEffect(() => {
    if (!songFromTrending && tracks.length > 0) {
      setCurrentTrack(tracks[currentIndex]?.track || null);
    }
  }, [currentIndex, tracks, songFromTrending]);

  // Cập nhật bài hát hiện tại nếu `songFromTrending` thay đổi
  useEffect(() => {
    if (songFromTrending) {
      setCurrentTrack(songFromTrending);
    }
  }, [songFromTrending]);

  const backgroundImage = songFromTrending ? songFromTrending?.cover : null;

  const backToTrending = () => {
    navigate("/trending"); // Chuyển hướng đến trang /trending
  };

  return (
    <div
      className="w-[calc(100%-100px)] h-full rounded-[30px] flex justify-between relative"
      style={{
        background: backgroundImage
          ? `linear-gradient(to bottom, rgba(30,42,62,0.6), rgba(30,42,62,1)), url(${backgroundImage})`
          : "#1E2A3E",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {songFromTrending ? (
        // Nếu đang phát bài hát từ Trending
        <div className="w-full flex justify-center items-center">
          <IoMdArrowRoundBack
            onClick={backToTrending}
            className="text-white text-4xl cursor-pointer hover:scale-110"
          />
          {currentTrack && (
            <AudioPlayer
              currentTrack={currentTrack}
              total={tracks}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          )}
        </div>
      ) : (
        // Nếu đang phát playlist
        <>
          <div className="left-player-body">
            {currentTrack && (
              <AudioPlayer
                currentTrack={currentTrack}
                total={tracks}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            )}
            {currentTrack?.album && <Widgets artistID={currentTrack.album} />}
          </div>

          <div className="right-player-body">
            {currentTrack?.album && <SongCard album={currentTrack.album} />}
            <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
