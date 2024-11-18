import React, { useContext, useEffect, useRef, useState } from 'react'
import { faVolumeHigh, faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { AudioPlayerContext } from './AudioPlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Image, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
const AudioPlayer = () => {
  const seekStep = 10; // seconds to seek forward or backward
  const nextTrackBtn = useRef(null)
  const previousTrackBtn = useRef(null)
  const audioPlayerRef = useRef(null)
  const [disablenext, setNextButtonDisable] = useState(false)
  const [disableprev, setPreButtonDisable] = useState(true)
  const [language, setLanguage] = useState(0)
  const {
    setTrack,
    currentTrack,
    isPlaying,
    pauseTrack,
    playTrack,
    duration,
    currentTime,
    seekTo,
    audioRef,
    episodeThumb,
    currentEpisodeNumber,
    totalEpisodeCount,
    audioTracks,
    currentTrackLanguage,
    closePlayer
  } = useContext(AudioPlayerContext);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(localStorage.getItem('dastaan__player_volume') != null ? localStorage.getItem('dastaan__player_volume') : 1);
  const [playbackRate, setPlaybackRate] = useState(localStorage.getItem('dastaan__player_speed') != null ? localStorage.getItem('dastaan__player_speed') : 1);
  useEffect(() => {
    const audio = audioRef.current;
    console.log(`tracks.length == ${audioTracks.length} || index+1 == ${currentTrack + 1} || index == ${currentTrack}  || disablenext == ${disablenext} || disableprev == ${disableprev} `);
    if (audioTracks.length === parseInt(currentTrack + 1))
      setNextButtonDisable(true)
    if (currentTrack === 0)
      setPreButtonDisable(false)
    // console.log(disablenext,disableprev);
    const handleAudioError = () => {
      setError(true);
    };
    audio.addEventListener('error', handleAudioError);
    return () => {
      audio.removeEventListener('error', handleAudioError);
    };
  }, [audioRef]);
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    // console.log(duration,newTime);
    seekTo(newTime);
  };

  if (error) {
    return toast.error('Failed to load audio')
  }
  const handleForward = () => {
    const newTime = currentTime + seekStep;
    seekTo(newTime);
  };
  const handleRewind = () => {
    const newTime = currentTime - seekStep;
    seekTo(newTime);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    // setVolume(newVolume);
    audioRef.current.volume = newVolume;
    localStorage.setItem('dastaan__player_volume', newVolume);
    // console.log(parseInt(newVolume * 100));
  };
  const handleSpeedChange = (e) => {
    const newPlaybackRate = e.target.value;
    setPlaybackRate(newPlaybackRate);
    audioRef.current.playbackRate = newPlaybackRate;
    localStorage.setItem('dastaan__player_speed', newPlaybackRate);
  };
  //handleLanguage
  const handleLanguage = (e) => {
    const language_id = e.target.value;
    setLanguage(language_id)
    // console.log(language_id);
    playTrack(audioTracks, currentEpisodeNumber, currentEpisodeNumber - 1, episodeThumb, currentTime || 0, language_id)
    // setTrackLanguage(language_id)
    // setPlaybackRate(newPlaybackRate);
    // audioRef.current.playbackRate = newPlaybackRate;
  };
  const handleNextTrack = () => {
    setPreButtonDisable(false)
    previousTrackBtn.current.classList.remove('not-allowed')
    setTrack(currentEpisodeNumber + 1, currentEpisodeNumber, language)
    if (totalEpisodeCount === currentEpisodeNumber + 1) {
      // console.log('Next button is disabled...');
      nextTrackBtn.current.classList.add('not-allowed')
      setNextButtonDisable(true)
    }
  }
  const handlePreviousTrack = () => {
    // setTrack(current,changed)
    setTrack(currentEpisodeNumber - 1, currentEpisodeNumber - 2, language)
    nextTrackBtn.current.classList.remove('not-allowed')
    setNextButtonDisable(false)
    if ((currentEpisodeNumber - 1) === 1) {
      // console.log('Previos button is disabled...');
      previousTrackBtn.current.classList.add('not-allowed')
      setPreButtonDisable(true)
    }
  }
  return (
    <>
      {/* <div className="audio-player "> */}
      {currentTrack && (
        <Row className='audio-player'>
          <Row>
            <Col md={1} className='close-player-btn pointer'  >
              <span className='text-white' onClick={closePlayer}>X</span>
            </Col>
          </Row>
          <Col md={2} sm={2} xs={2}>
            <img src={episodeThumb} alt={currentTrack.title} className="thumbnail" />
          </Col>
          <Col md={2} sm={2} xs={4} className='mt-1 text-white player-episode-title-info'>
            <p >Episode {currentEpisodeNumber}/{totalEpisodeCount}
              <br />
              {currentTrack.title}
            </p>
            <select onChange={handleLanguage} className='form-control speed_control_dropdown' style={{ border: '1px solid gray' }}>
              {
                currentTrackLanguage.map((lang) => (
                  <option value={lang.id} {...language === lang.id ? 'selected' : ''}>{lang.language_name}</option>
                ))
              }
            </select>
          </Col>
          <Col md={5} sm={5} xs={6} className='audio-player-seekbar-controller'>
            <Row>
              <Col md={12} xs={12}>
                <Row className='time-info text-white'>
                  <Col md={6} sm={6} xs={6}>
                    <span>{formatTime(currentTime)}</span>
                  </Col>
                  <Col md={6} sm={6} xs={6} className='text-right'>
                    <span>{formatTime(duration)}</span>
                  </Col>
                </Row>
              </Col>
              <Col md={12} xs={12}>
                <input
                  className='audio_seekbar'
                  id="audio_player"
                  type="range"
                  ref={audioPlayerRef}
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                 
                  style={{
                    background: `linear-gradient(to right, #4CAF50 ${seekTo}%, #ddd ${seekTo}%)`,
                  }}
                  max="100"
                />
              </Col>
              <Col md={12} xs={12}>
                <Row className='controls'>
                  <Col md={4} xs={4}>
                    <Row>
                      <Col md={6} sm={6} xs={6}>
                        <button disabled={disableprev} ref={previousTrackBtn}
                          className={`audio_player_btns_forward  ${disableprev === true ? 'not-allowed' : ''}`} onClick={handlePreviousTrack}>
                          <Image className='previous-btn'
                            src={`${process.env.PUBLIC_URL}/player_icons/previous.png`}
                          />
                        </button>
                      </Col>
                      <Col md={6} sm={6} xs={6}>
                        <button className='audio_player_btns__back' onClick={handleRewind}>
                          <Image className='backward-btn'
                            src={`${process.env.PUBLIC_URL}/player_icons/backward_btn.png`}
                          />
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4} xs={4} className='text-center'>
                    {isPlaying ? (
                      <button className='audio_player_btns_play_pause' onClick={() =>{
                        pauseTrack(true)}}> <Image
                        className='play-pause-btn'
                        src={`${process.env.PUBLIC_URL}/player_icons/pause_btn.png`}
                      /></button>
                    ) : (
                      <button className='audio_player_btns_play_pause' 
                      onClick={() =>{
                        pauseTrack(false)}}
                      // onClick={() => playTrack(audioTracks, currentEpisodeNumber, currentEpisodeNumber, episodeThumb, currentTime || 0, language)}
                      >
                        <Image className='play-pause-btn'
                          src={`${process.env.PUBLIC_URL}/player_icons/play_btn.png`}
                        />
                      </button>
                    )}
                  </Col>
                  <Col md={4} xs={4} className='text-right'>
                    <Row>
                      <Col md={6} sm={6} xs={6}>
                        <button className='audio_player_btns_forward' onClick={handleForward}>
                          <Image className='forward-btn'
                            src={`${process.env.PUBLIC_URL}/player_icons/forward_btn.png`}
                          /></button>
                      </Col>
                      <Col md={6} sm={6} xs={6}>
                        <button disabled={disablenext} ref={nextTrackBtn} className={`audio_player_btns_forward ${disablenext === true ? 'not-allowed' : ''}`} onClick={handleNextTrack}>
                          <Image className='next-btn'
                            src={`${process.env.PUBLIC_URL}/player_icons/next.png`}
                          />
                        </button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={2} sm={2} className='mt-1'>
            <Row className='volume-speed-row'>
              <Col md={1} xs={1} className='player-volume-icon'>
                {volume == 0 ? <FontAwesomeIcon className='text-white' icon={faVolumeXmark} /> : (volume < '0.30' ? <FontAwesomeIcon className='text-white' icon={faVolumeLow} /> : <FontAwesomeIcon className='text-white' icon={faVolumeHigh} />)}
              </Col>
              <Col md={5} xs={5} className='volume-baar'>
                <div className="slide-parent">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <div className="buble">
                    {parseInt(volume * 100)}
                  </div>
                </div>
              </Col>
              <Col md={5} xs={3} className='audio-speed-options'>
                <select value={playbackRate} className='form-control speed_control_dropdown' onChange={handleSpeedChange}>
                  <option value="0.25">0.25x</option>
                  <option value="0.50">0.50x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.50">1.50x</option>
                  <option value="1.75">1.75x</option>
                  <option value="2">2x</option>
                </select>
                {/* <span className='text-white'>X</span> */}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {/* </div> */}
    </>
  )
}
export default AudioPlayer