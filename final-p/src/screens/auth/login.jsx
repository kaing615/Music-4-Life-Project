import React from "react";
import { loginEndpoint } from "../../../spotify";

export default function Login() {
  return (
    <div className="bg-[#1E2A3E] h-[100vh] w-[100vw] flex flex-col items-center justify-center overflow-hidden">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="logo-spotify"
        className="w-[30%]"
      />
      <a href={loginEndpoint}>
        <div className="w-[200px] py-[15px] px-auto text-center bg-[#FEFEFE] rounded-[50px] text-[#1f1f1f] font-semibold mt-[20%]">LOG IN</div>
      </a>
    </div>
  );
}