import React from 'react'
import './AlbumImages.css'


const AlbumImages = ({ url }) => {
  return (
    <div className='w-[80%] items-center justify-center relative z-1'>
        <img src={url} alt="album art" className="albumImage-art rounded-[30px]" />
        <div className="albumImage-shadow">
            <img src={url} alt="shadow" className="albumImage-shadow" />
        </div>
    </div>
  )
}

export default AlbumImages