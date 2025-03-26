import React, { useState, useEffect } from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router';
import apiClient from '../../spotify';
import './Library.css';

const Library = () => {
    const [playlists, setPlaylists] = useState([]); 

    useEffect(() => {
        apiClient.get("me/playlists").then((response) => {
            setPlaylists(response.data.items);
        });
    }, []);

    const navigate = useNavigate();
  
    const playPlaylist = (id) => {
        navigate("/player", { state: { id: id } });
    };

    return (
        <div className="w-[calc(100%-100px)] h-full bg-[#1E2A3E] rounded-[30px] p-15">
            <h1 className="text-4xl font-bold text-white">Your Playlist</h1>
            <div className="library-body">
                {playlists?.map((playlist) => (
                    <div 
                        className="playlist-card"
                        key={playlist.id}
                        onClick={() => playPlaylist(playlist.id)}
                    >
                        <img 
                            src={playlist.images[0]?.url || "https://via.placeholder.com/150"} 
                            className="playlist-image"
                            alt="Playlist-Art"
                        />
                        <p className="playlist-title">{playlist.name}</p>
                        <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
                        <div className="playlist-fade">
                            <AiFillPlayCircle />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
