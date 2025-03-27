import React from "react";
import { useNavigate } from "react-router";
import { FaPlay } from "react-icons/fa"; // Icon nút Play

const Favorites = ({ favoriteSongs }) => {
  const navigate = useNavigate();

  const handleSongClick = (song) => {
    navigate("/player", { state: { song } }); // Chuyển sang Player và truyền bài hát
  };

  return (
    <div className="w-[calc(100%-100px)] h-full bg-[#1E2A3E] rounded-[30px] p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        ❤️ Favorite Songs
      </h2>

      {favoriteSongs.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          Bạn chưa thích bài hát nào.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteSongs.map((song) => (
            <div
              key={song.id}
              className="relative flex items-center gap-4 p-4 bg-[#27354D] rounded-xl 
                cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleSongClick(song)}
            >
              {/* Ảnh bài hát */}
              <div className="relative">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                {/* Hiệu ứng Play khi hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black 
                    bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg"
                >
                  <FaPlay className="text-white text-lg" />
                </div>
              </div>

              {/* Thông tin bài hát */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{song.name}</h3>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
