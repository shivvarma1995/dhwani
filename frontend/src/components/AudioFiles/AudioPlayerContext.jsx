import axios from 'axios';
import React, { createContext, useState, useRef, useEffect } from 'react';
export const AudioPlayerContext = createContext();
export const AudioPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(null);
  const [totalEpisodeCount, setTotatlEpisodeCount] = useState(null);
  const [episodeThumb, setEpisodeThumbnail] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioTracks, setAudioTracks] = useState([]);
  const [currentTrackLanguage, setCurrentTrackLaguage] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);



  // const [episodeId, setEpisodeID] = useState(null)
  let episodeId = null;
  let time = 0.00;
  const audioRef = useRef(new Audio());
  const intervalIdRef = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;
    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);
  const startInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    //uopdate user listened time log
    const setListenedTime = async () => {
      const playedTime = audioRef.current.currentTime;
      // console.log('Played time:', playedTime, 'episodeId ===>', episodeId);
      if (playedTime > 0 && episodeId != null) {
        const data = JSON.stringify({
          'user_id': localStorage.getItem('dastaan__user_id') != null ? localStorage.getItem('dastaan__user_id') : 1,
          episode_id: episodeId,
          duration: playedTime
        });
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_API_URL}/add-listened-log`,
          headers: {
            'Authorization': localStorage.getItem('dastaan__token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: data
        };
        axios.request(config).then((response) => {
          // console.log(response.data);
        })
      }
    };
    intervalIdRef.current = setInterval(setListenedTime, 4000);
  } //end of startInterval
  const stopInterval = () => {
    // Clear the existing interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    // start new  interval_id
    startInterval()
  }; //end of stopInterval
  const playTrack = (tracks, current_episode, index, thumb, played_time, language_id) => {

    let languageIDArr= []
    episodeId = tracks[index].id;
    setEpisodeThumbnail(thumb)
    setCurrentTrack(tracks[index]);
    setAudioTracks(tracks)
    setIsPlaying(true);
    setShowPlayer(true);
    setCurrentTrackLaguage(tracks[index].available_lang);
    setCurrentEpisodeNumber(current_episode)
    setTotatlEpisodeCount(tracks.length)
    if (language_id == 0) {
      console.log(tracks[index].media_urls);
      console.log('if===> ', tracks[index].media_urls[0].audio_file_url);
      audioRef.current.src = tracks[index].media_urls[0].audio_file_url;
    }
    else {
      console.log(tracks[index].media_urls);
      let lastId = tracks[index].media_urls.length;
      for (let i = 0; i < tracks[index].media_urls.length; i++) {
        languageIDArr.push(tracks[index].media_urls[i].language_id)
        const element = tracks[index].media_urls[i];
        if (element.language_id == language_id)
          audioRef.current.src = tracks[index].media_urls[i].audio_file_url;
      }
      // console.log(languageIDArr.includes(parseInt(language_id)));
      if(!languageIDArr.includes(parseInt(language_id))){
        console.log(languageIDArr);
        console.log('inside ....');
        audioRef.current.src = tracks[index].media_urls[lastId - 1].audio_file_url;
      } 
    }
    // console.log(played_time, tracks[index].played_time);
    if (played_time > tracks[index].played_time)
      time = played_time
    else
      time = tracks[index].played_time != null ? tracks[index].played_time : played_time
    seekTo(time)

    audioRef.current.volume = localStorage.getItem('dastaan__player_volume')!= null ? localStorage.getItem('dastaan__player_volume')  : 1;
    audioRef.current.playbackRate = localStorage.getItem('dastaan__player_speed')!= null ? localStorage.getItem('dastaan__player_speed')  : 1;
    audioRef.current.play();
    if (intervalIdRef.current) {
      stopInterval(); // Stop the current interval if it exists
    } else {
      startInterval(); // Start a new interval if none exists
    }
  };
  const setTrack = (current_track, index,language_id) => {
    // console.log(`current_track==> ${nextTrack},index===>${index}`);
    setCurrentTrackLaguage([])
    console.log(`Next Previous track Index :::: ${index} ||  current Track ::: ${current_track}`);
    playTrack(audioTracks, current_track, index, episodeThumb, 0,language_id)
  }
  const pauseTrack = (status) => {
    if(status === true ){
      setIsPlaying(false);
      audioRef.current.pause();
      console.log('track paused :)');
    }
    else{
      setIsPlaying(true);
      audioRef.current.play();
      console.log('track playing :)');
    }
    
  };
  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    audioRef.current.play();
  };

  const closePlayer = () =>{
    console.log('close player button cliked :)');
    setIsPlaying(false);
    audioRef.current.pause();
    setShowPlayer(false)
    setCurrentTrack(null);
    
  }
  return (
    <AudioPlayerContext.Provider value={{
      setTrack,
      isPlaying, currentTrack, playTrack, pauseTrack, audioRef, showPlayer, duration, currentTime, seekTo, episodeThumb,
      currentEpisodeNumber,
      totalEpisodeCount,
      audioTracks,
      currentTrackLanguage,
      closePlayer
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
