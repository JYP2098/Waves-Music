import React from "react";
import {playAudio} from '../util';

const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPLaying, setSongs}) => {
    const songSelectHandler = () => {
        const selectedSong = songs.filter((state)=>state.id === id);
        setCurrentSong(selectedSong[0]);
        const newSongs = songs.map((song)=>{
            if(song.id == id){
                return{
                    ...song,
                    active:true,
                }
            }else{
                return{
                ...song,
                active:false,
                }
            }
        })
        setSongs(newSongs);
        playAudio(isPLaying, audioRef);
    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-desc">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;