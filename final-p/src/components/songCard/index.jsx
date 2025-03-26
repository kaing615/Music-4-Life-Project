import React from 'react'
import AlbumImages from './AlbumImages'
import AlbumInfo from './AlbumInfo'

const SongCard = ({ album }) => {
  return (
    <div className='w-[100%] h-[62%] bg-[#27354E] rounded-[30px] rounded-br-[0px] justify-center items-center flex flex-col'>
        <AlbumImages url={album?.images[0].url}/>
        <AlbumInfo album={album}/>
    </div>
  )
}

export default SongCard