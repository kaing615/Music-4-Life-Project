import React, { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import { IoMdTrendingUp } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../../spotify";
import { FaSpotify } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token đăng nhập
    window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
  };
  return (
    <div className="w-[100px] h-[100%] flex items-center flex-col justify-between">
      <div className="w-[50px] h-[50px] rounded-[10px] mt-[20px] text-[#1E2A3E]">
        <FaMusic className="w-[50px] h-[50px]" />
      </div>
      <div>
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <button
        onClick={handleLogout}
        className="hover:text-red-600 transition-all duration-200"
      >
        <FaSignOutAlt className="text-3xl" />
      </button>
    </div>
  );
};

export default Sidebar;
