import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { AudioPlayerContext } from './AudioPlayerContext';
import { useNavigate } from 'react-router-dom';
const Episodes = ({ episodes, thumb }) => {
    const navigate = useNavigate()
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
        currentTrackLanguage
    } = useContext(AudioPlayerContext);
    const user_id = localStorage.getItem('dastaan__user_id') !== null ? localStorage.getItem('dastaan__user_id') : null
    const plan_status = localStorage.getItem('dastaan__plan_active') === 'false' ? 0 : 1
    const handlePlay = (current_episode, index) => {
        // alert('buttton clicked...')
        playTrack(episodes, current_episode, index, thumb, 0, 0)
    };
    if (episodes.length === 0) {
        return (
            <Container className='mt-1 mb-3 audio-player-episodes'>
                <Row>
                    <Col md={12} sm={12}>
                        <h3>Episodes not added!</h3>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <Container className='mt-1 mb-3 audio-player-episodes'>
                <Row>
                    {
                        episodes.map((item, index) => {
                            const hour = (parseFloat(item.duration) / 3600).toFixed(2)
                            const hrArr = hour.split('.');
                            const min = (hrArr[1]);
                            const seconds = min / 60;
                            return (
                                <Col md={12} sm={12} xs={12}
                                    style={{
                                        borderBottom: '1px solid #80808063'
                                    }}
                                >
                                    <Row className='p-2' onClick={() => user_id !== null ? (plan_status === 1 ? handlePlay(index + 1, index) : navigate('/plans')) : navigate('/login')}>
                                        <Col sm={1} md={2} xs={1}  >
                                            <Image src={thumb}
                                                className='epiasode-thumbnail'
                                            />
                                        </Col>
                                        <Col sm={9} md={9} xs={8} className='text-left audio-title-detail '>
                                            <h6><b>{item.title}</b></h6>
                                            <p className='time-info'>{hrArr[0]}:{min}:{seconds > 0 ? parseInt(seconds) : '00'}</p>
                                        </Col>
                                        <Col sm={1} md={1} xs={2} className='pointer ' >
                                            <FontAwesomeIcon className='episode-play-button' icon={faPlay} />
                                        </Col>
                                    </Row>
                                </Col>
                            )
                        }
                        )
                    }
                </Row>
            </Container>
        )
    }
}
export default Episodes