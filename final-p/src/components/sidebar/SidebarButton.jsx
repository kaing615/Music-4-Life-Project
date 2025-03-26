import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';

const SidebarButton = ({ to, icon, title }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <div
        className={`
          px-4 py-2 h-[60px] w-[70px] rounded-[20px] flex flex-col items-center justify-center 
          transition-all duration-300 ease-in-out my-[5px] mx-auto 
          ${isActive ? 'border-2 border-[#4A90E2] bg-[#1E2A3E] text-white' 
                     : 'text-[#1E2A3E] hover:bg-[#1E2A3E] hover:text-white hover:scale-105'}
        `}
      >
        <IconContext.Provider value={{ size: '24px', className: 'btn-icon' }}>
          {icon}
          <p className="text-sm mt-1 font-semibold">{title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
};

export default SidebarButton;
