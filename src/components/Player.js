import React, {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay,faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {playAudio} from '../util';

const Player = ({ setSongs,setCurrentSong,currentSong, isPLaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs}) => {
    
    const playSongHandler = () => {
           if(isPLaying){
               audioRef.current.pause();
               setIsPlaying(!isPLaying);
           }else{
               audioRef.current.play();
               setIsPlaying(!isPLaying);
           }
    }

    useEffect(()=>{
        const newSongs = songs.map((song)=>{
            if(song.id == currentSong.id){
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
    },[currentSong])
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentSong:e.target.value});
    }
    const skipTrackHandler = (direction) => {
        const currentIndex = songs.findIndex((song)=>song.id===currentSong.id);
        if(direction==="skip-forward"){
            setCurrentSong(songs[(currentIndex+1)%songs.length])
        }
        if(direction==="skip-back"){
            if((currentIndex-1)%songs.length === -1){
                setCurrentSong(songs[songs.length-1]);
                playAudio(isPLaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex-1)%songs.length]);
        }
        playAudio(isPLaying, audioRef);
    }
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }    

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                    <div className="animate-track" style={trackAnim}></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-back')} className="skip-back" icon={faAngleLeft} size="2x"/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" icon={isPLaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-forward')} className="skip-forward" icon={faAngleRight} size="2x"/>
            </div>
        </div>
    )
}

export default Player;