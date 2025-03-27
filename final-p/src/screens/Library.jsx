import React, { useState, useEffect } from "react";
import {
  AiFillPlayCircle,
  AiOutlinePlus,
  AiOutlineDelete,
} from "react-icons/ai";
import { useNavigate } from "react-router";
import songs from "../data";
import { FaEdit } from "react-icons/fa";
import "./Library.css";

const Library = () => {
  const [customPlaylists, setCustomPlaylists] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedPlaylists = JSON.parse(localStorage.getItem("customPlaylists"));
    if (savedPlaylists) {
      setCustomPlaylists(savedPlaylists);
    }
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (playlist) => {
    navigate("/player", { state: { playlist } });
  };

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedSongs([]);
    setPlaylistName("");
    setEditingPlaylist(null);
  };

  const toggleSongSelection = (song) => {
    if (selectedSongs.some((s) => s.id === song.id)) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const removeSongFromPlaylist = (songId) => {
    setSelectedSongs(selectedSongs.filter((song) => song.id !== songId));
  };

  const savePlaylist = () => {
    if (selectedSongs.length === 0 || playlistName.trim() === "") return;

    let updatedPlaylists;
    if (editingPlaylist) {
      // Cập nhật playlist đã chọn
      updatedPlaylists = customPlaylists.map((p) =>
        p.id === editingPlaylist.id
          ? { ...p, name: playlistName, songs: selectedSongs }
          : p
      );
    } else {
      // Thêm playlist mới
      const newPlaylist = {
        id: `custom-${Date.now()}`,
        name: playlistName,
        songs: selectedSongs,
      };
      updatedPlaylists = [...customPlaylists, newPlaylist];
    }

    setCustomPlaylists(updatedPlaylists);
    localStorage.setItem("customPlaylists", JSON.stringify(updatedPlaylists));

    // Reset lại state
    setIsSelecting(false);
    setEditingPlaylist(null);
    setSelectedSongs([]);
    setPlaylistName("");
  };

  const editPlaylist = (playlist) => {
    console.log("🔧 Đang chỉnh sửa playlist:", playlist);
    setEditingPlaylist(playlist);
    setIsSelecting(true);
    setSelectedSongs(playlist.songs);
    setPlaylistName(playlist.name);
  };

  const deletePlaylist = (playlistId) => {
    const updatedPlaylists = customPlaylists.filter((p) => p.id !== playlistId);
    setCustomPlaylists(updatedPlaylists);
    localStorage.setItem("customPlaylists", JSON.stringify(updatedPlaylists));
  };

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[calc(100%-100px)] max-h-full bg-[#1E2A3E] rounded-[30px] p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold text-white">Your Playlist</h1>
        {!isSelecting ? (
          <button
            className="text-white bg-gray-500 p-2 rounded-full hover:bg-gray-400 cursor-pointer"
            onClick={toggleSelectMode}
          >
            <AiOutlinePlus size={24} />
          </button>
        ) : (
          <button
            className="text-white bg-red-500 p-2 rounded-lg hover:bg-red-600 cursor-pointer"
            onClick={toggleSelectMode}
          >
            Cancel
          </button>
        )}
      </div>

      {isSelecting ? (
        <div className="p-5 bg-gray-800 rounded-lg">
          {/* 🔍 Ô tìm kiếm bài hát */}
          <input
            type="text"
            placeholder="Search for a song..."
            className="w-full p-2 rounded-md text-white bg-gray-700 border border-gray-500 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Danh sách bài hát */}
          <div className="grid grid-cols-2 gap-3">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedSongs.some((s) => s.id === song.id)
                    ? "bg-blue-500"
                    : "bg-gray-800"
                }`}
                onClick={() => toggleSongSelection(song)}
              >
                <p className="text-white">{song.name}</p>
              </div>
            ))}
          </div>

          {/* 📝 Ô nhập tên playlist và lưu */}
          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Enter playlist name"
              className="p-2 rounded-md text-white border-white-10"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <button
              className="text-white bg-gray-500 p-2 rounded-lg hover:bg-gray-600 cursor-pointer"
              onClick={savePlaylist}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="library-body">
          {customPlaylists.map((playlist) => (
            <div className="playlist-card relative" key={playlist.id}>
              {/* Nút xóa */}
              <button
                className="absolute bottom-2 left-2 text-white bg-gray-500 p-1 rounded-full hover:bg-gray-600 cursor-pointer"
                onClick={() => deletePlaylist(playlist.id)}
              >
                <AiOutlineDelete size={20} />
              </button>

              {/* Nút chỉnh sửa */}
              <button
                className="absolute text-white bottom-2 left-12 bg-gray-500 p-1 rounded-full hover:bg-gray-600 cursor-pointer"
                onClick={() => editPlaylist(playlist)}
              >
                <FaEdit size={20} />
              </button>

              {/* Ảnh Playlist */}
              <img
                src={
                  playlist.songs[0]?.cover || "https://via.placeholder.com/150"
                }
                className="playlist-image"
                onClick={() => playPlaylist(playlist)}
              />

              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.songs.length} Songs</p>

              <div className="playlist-fade">
                <AiFillPlayCircle onClick={() => playPlaylist(playlist)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
