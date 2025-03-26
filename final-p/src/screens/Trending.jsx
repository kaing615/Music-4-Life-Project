import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PlayCircle, PauseCircle, Heart, HeartOff } from "lucide-react";
import { motion } from "framer-motion";
import "./Trending.css";

const Trending = ({ favoriteSongs, setFavoriteSongs }) => {
  const [songs, setSongs] = useState([]);
  const [playingId, setPlayingId] = useState(null);
  // Giả lập API lấy danh sách nhạc
  useEffect(() => {
    setTimeout(() => {
      setSongs([
        {
          id: 1,
          title: "Blinding Lights",
          artist: "The Weeknd",
          cover: "https://f4.bcbits.com/img/a2542331661_10.jpg",
          duration: "3:22",
          youtubeID: "fHI8X4OXluQ",
        },
        {
          id: 2,
          title: "Save Your Tears",
          artist: "The Weeknd",
          cover:
            "https://th.bing.com/th/id/OIP.xvdUNmPvcZWHO6d-OA-BNQHaHa?rs=1&pid=ImgDetMain",
          duration: "3:35",
          youtubeID: "XXYlFuWEuKI",
        },
        {
          id: 3,
          title: "Peaches",
          artist: "Justin Bieber",
          cover:
            "https://th.bing.com/th/id/OIP.c3Xp52DZFuvGmx9xesaBsgHaHa?rs=1&pid=ImgDetMain",
          duration: "3:18",
          youtubeID: "tQ0yjYUFKAE",
        },
        {
          id: 4,
          title: "Levitating",
          artist: "Dua Lipa",
          cover:
            "https://th.bing.com/th/id/OIP.69emigpmj81jmPmS9OFOTQHaHa?rs=1&pid=ImgDetMain",
          duration: "3:23",
          youtubeID: "TUVcZfQe-Kw",
        },
        {
          id: 5,
          title: "Industry Baby",
          artist: "Lil Nas X",
          cover:
            "https://wallpapers.com/images/hd/lil-nas-x-industry-baby-clip-ywyxlbbwbb9xdgwj.jpg",
          duration: "3:32",
          youtubeID: "UTHLKHL_whs",
        },
        {
          id: 6,
          title: "Stay",
          artist: "The Kid LAROI, Justin Bieber",
          cover:
            "https://th.bing.com/th/id/OIP.2b49jg3RTUotEwRD_JV7WQHaHa?rs=1&pid=ImgDetMain",
          duration: "2:37",
          youtubeID: "kTJczUoc26U",
        },
        {
          id: 7,
          title: "Good 4 U",
          artist: "Olivia Rodrigo",
          cover:
            "https://th.bing.com/th/id/OIP.u_MK9J5gbqof3Yxhcd4UagHaHa?rs=1&pid=ImgDetMain",
          duration: "2:58",
          youtubeID: "gNi_6U5Pm_o",
        },
        {
          id: 8,
          title: "Heat Waves",
          artist: "Glass Animals",
          cover:
            "https://images.genius.com/25ffad8f4a6804e3efc869253f030baf.1000x1000x1.jpg",
          duration: "3:59",
          youtubeID: "mRD0-GxqHVo",
        },
        {
          id: 9,
          title: "Montero (Call Me By Your Name)",
          artist: "Lil Nas X",
          cover:
            "https://th.bing.com/th/id/OIP.GcHbcFJ02C9HNrK4ZzaVyQHaJO?rs=1&pid=ImgDetMain",
          duration: "2:17",
          youtubeID: "6swmTBVI83k",
        },
        {
          id: 10,
          title: "Kiss Me More",
          artist: "Doja Cat ft. SZA",
          cover:
            "https://th.bing.com/th/id/OIP.ZJC4qxkHffAyvV8sy-b0yQHaHa?rs=1&pid=ImgDetMain",
          duration: "3:28",
          youtubeID: "0EVVKs6DQLo",
        },
        {
          id: 11,
          title: "Dù Cho Tận Thế",
          artist: "Erik",
          cover:
            "https://i1.sndcdn.com/artworks-YGzrJaJTmPjMMNi3-nUyrTw-t1080x1080.png",
          duration: "5:01",
          youtubeID: "js6JBdLzNn4",
        },
        {
          id: 12,
          title: "Ghé Qua",
          artist: "Dick x PC x Tofu",
          cover:
            "https://th.bing.com/th/id/OIP.YJ-RenYyFLhKpzvXgOSKzAHaEK?rs=1&pid=ImgDetMain",
          duration: "4:28",
          youtubeID: "zEWSSod0zTY",
        },
        {
          id: 13,
          title: "Có Hẹn Với Thanh Xuân",
          artist: "MONSTAR",
          cover:
            "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/6b/45/48/6b4548ac-5dee-ec1b-1132-b2366d738566/190296526817.jpg/1200x1200bf-60.jpg",
          duration: "4:25",
          youtubeID: "vpRi8S6uXAg",
        },
        {
          id: 14,
          title: "Em Đồng Ý (I Do)",
          artist: "Đức Phúc ft. 911",
          cover:
            "https://tailieumoi.vn/storage/uploads/images/post/banner/mv-i-do-cua-duc-phuc-va-bai-hoc-dinh-cao-khi-lam-thuong-hieu-ca-nhan-1676343099-1695220102.jpg",
          duration: "3:41",
          youtubeID: "IOe0tNoUGv8",
        },
        {
          id: 15,
          title: "Hãy Trao Cho Anh",
          artist: "Sơn Tùng M-TP",
          cover: "https://i.ytimg.com/vi/knW7-x7Y7RE/maxresdefault.jpg",
          duration: "4:05",
          youtubeID: "knW7-x7Y7RE",
        },
        {
          id: 16,
          title: "Chạy Về Khóc Với Anh",
          artist: "ERIK",
          cover:
            "https://th.bing.com/th/id/OIP.QMHF8_44GeNqmDj6iVE5CAAAAA?rs=1&pid=ImgDetMain",
          duration: "3:46",
          youtubeID: "EBpp2VTSI2Q",
        },
        {
          id: 17,
          title: "Bắc Bling (Bắc Ninh)",
          artist: "HOÀ MINZY ft NS XUÂN HINH x MASEW x TUẤN CRY",
          cover:
            "https://vcdn1-dulich.vnecdn.net/2025/03/06/BN7-1741233511.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=BC4flmyHxeLE-kfwnGBK8g",
          duration: "4:19",
          youtubeID: "CL13X-8o4h0",
        },
        {
          id: 18,
          title: "Waiting For You",
          artist: "MONO",
          cover:
            "https://th.bing.com/th/id/OIP.2twT0owDKYXhDNAHY68MowHaHa?rs=1&pid=ImgDetMain",
          duration: "4:25",
          youtubeID: "CHw1b_1LVBA",
        },
        {
          id: 19,
          title: "Nơi Này Có Anh",
          artist: "Sơn Tùng MTP",
          cover:
            "https://th.bing.com/th/id/OIP.lKSgInvTECkC-Ki116PVqgHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7",
          duration: "4:39",
          youtubeID: "FN7ALfpGxiI",
        },
        {
          id: 20,
          title: "Đừng Làm Trái Tim Anh Đau",
          artist: "Sơn Tùng MTP",
          cover:
            "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e3/0b/38/e30b383e-5818-321a-7626-557b7b0f8ba3/24UMGIM61359.rgb.jpg/1200x1200bf-60.jpg",
          duration: "5:25",
          youtubeID: "abPmZCZZrFA",
        },
      ]);
    }, 1000);
  }, []);

  const navigate = useNavigate();

  const handleSongClick = (song) => {
    navigate("/player", { state: { song, source: "trending" } }); // Gửi dữ liệu bài hát đến Player
  };

  // Hàm xử lý phát / dừng nhạc
  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  const toggleFavorite = (song) => {
    if (favoriteSongs.some((fav) => fav.id === song.id)) {
      setFavoriteSongs(favoriteSongs.filter((fav) => fav.id !== song.id));
    } else {
      setFavoriteSongs([...favoriteSongs, song]);
    }
  };

  return (
    <div className="w-full h-full bg-[#1E2A3E] rounded-3xl p-6 text-white shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold mb-5 text-center">🔥 Trending Now</h2>
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[900px] custom-scrollbar">
        {songs.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 p-4 bg-[#27354D] rounded-xl hover:bg-[#32415F] transition-all cursor-pointer"
          >
            <img
              src={song.cover}
              alt={song.title}
              className="w-16 h-16 rounded-lg object-cover shadow-md hover:scale-105 transition-transform"
              onClick={() => handleSongClick(song)}
            />
            <div className="flex-1" onClick={() => handleSongClick(song)}>
              <h3 className="text-lg font-semibold hover:text-blue-400">
                {song.title}
              </h3>
              <p className="text-sm text-gray-300">{song.artist}</p>
            </div>
            <button
              onClick={() => toggleFavorite(song)}
              className="focus:outline-none"
            >
              {favoriteSongs.some((fav) => fav.id === song.id) ? (
                <Heart className="text-red-500 w-6 h-6 hover:scale-110 transition-transform" />
              ) : (
                <HeartOff className="text-gray-400 w-6 h-6 hover:scale-110 transition-transform" />
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
