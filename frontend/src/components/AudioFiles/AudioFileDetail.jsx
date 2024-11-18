import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Episodes from './Episodes';
import { faBookmark, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import {
    faBookmark as regularBookmark,
    faThumbsDown as regularThumbsDown,
    faThumbsUp as regularThumbsUp
} from '@fortawesome/free-regular-svg-icons';
import AudioPlayer from './AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchGlobalContext } from '../Search/SearchGlobalContext';
import Search from '../Search/Search';
import { toast } from 'react-toastify';
const AudioFileDetail = () => {
    const [wishlisted, setWishlist] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const { id } = useParams();
    const [audiodetail, setAudioData] = useState([]);
    const [episodes, setEpisodeData] = useState([]);
    const [likecount, setLikeCount] = useState(0);
    const [dislikecount, setDislikeCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const { searchResults } = useContext(SearchGlobalContext)
    const navigate = useNavigate();
    const user_id = localStorage.getItem('dastaan__user_id') !== null ? localStorage.getItem('dastaan__user_id') : null
    useEffect(() => {
        getAudioFileDetails()
        // console.log(user_id);
    }, [])
    const getAudioFileDetails = async () => {
        try {
            setLoading(true);
            const data = JSON.stringify({
                'user_id': localStorage.getItem('dastaan__user_id') !== null ? localStorage.getItem('dastaan__user_id') : 1,
                audio_file_id: id
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_API_URL}/audio-file-detail`,
                headers: {
                    'Authorization': localStorage.getItem('dastaan__token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios.request(config).then((response) => {
                setLoading(false);
                
                const resData = response.data.Podcast_App;
                const audio_file_detail = resData.audio_file_data;
                const pS = localStorage.getItem('dastaan__plan_active');
                if(pS!= resData.user_plan_status){
                    localStorage.removeItem('dastaan__plan_active');
                    localStorage.setItem('dastaan__plan_active',resData.user_plan_status);
                }
                setAudioData(audio_file_detail)
                setEpisodeData(resData.episodes)
                setWishlist(audio_file_detail.wishlist_id !== null ? true : false)
                setLiked(audio_file_detail.isliked !== null ? (audio_file_detail.isliked === 1 ? true : false) : false)
                setDisliked(audio_file_detail.isdisliked !== null ? (audio_file_detail.isdisliked === 1 ? true : false) : false)
                setLikeCount(audio_file_detail.likes !== null ? audio_file_detail.likes : 0)
                setDislikeCount(audio_file_detail.dislikes !== null ? audio_file_detail.dislikes : 0)
            })
        } catch (error) {
            setLoading(false);
        }
    }
    const backgroundImageStyle = audiodetail.landscape_thumb ? `${audiodetail.landscape_thumb.replace(' ', '%')}` : 'none'
    const hour = (parseFloat(audiodetail.total_duration) / 3600).toFixed(2)
    const hrArr = hour.split('.');
    const min = (hrArr[1]);
    const seconds = parseInt(min / 60);
    // const secArr = seconds.split('.')
    const handleWishlistAddRemove = async (audio_file_id, is_added) => {
        try {
            setWishlist(is_added)
            const data = {
                "user_id": localStorage.getItem('dastaan__user_id'), // integer
                audio_file_id,//integer
                is_added //boolean
            };
            const config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_API_URL}/add-remove-wishlist`,
                headers: {
                    'Authorization': localStorage.getItem('dastaan__token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios(config).then((response) => {
                is_added === true ? toast('Added in wishlist') : toast('Removed from wishlist')
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleLikeDislike = async (audio_file_id, is_liked, is_disliked) => {
        try {
            if (is_liked === false && is_disliked === true) {
                setLiked(false)
                setDisliked(true)
                toast('Disliked');
            }
            else if (is_liked === true && is_disliked === false) {
                setLiked(true)
                setDisliked(false)
                toast('Liked');
            } else if (is_liked === false && is_disliked === false) {
                setLiked(false)
                setDisliked(false)
                toast('Like OR Dislike Removed');
            }
            console.log(is_disliked, disliked);
            const data = {
                "user_id": localStorage.getItem('dastaan__user_id'), // integer
                audio_file_id,//integer
                is_liked,
                is_disliked //boolean
            };
            const config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_API_URL}/add-remove-likes`,
                headers: {
                    'Authorization': localStorage.getItem('dastaan__token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios(config).then((response) => {
                const resdata = response.data.Podcast_App.data;
                setLikeCount(resdata.likes !== null ? resdata.likes : 0)
                setDislikeCount(resdata.dislikes !== null ? resdata.dislikes : 0)
                // console.log(resdata);
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        // 
        <>
            {
                loading ?
                    (<Loader loading={loading} />) :
                    (
                        <>
                            <Header />
                            {
                                searchResults.length > 0 ? <Search /> : (
                                    <>
                                        <Container className='mt-7 audio-detail-main'>
                                            <Row >
                                                <Col md={6} sm={12}>
                                                    <Row>
                                                        <Col md={12} sm={12}>
                                                            <Image className=''
                                                                src={backgroundImageStyle}
                                                                style={{
                                                                    width: '100%',
                                                                    // objectFit: 'cover',
                                                                    objectFit: 'contain',
                                                                    borderRadius: '5px',
                                                                    // backgroundPosition: 'left',
                                                                    height: '30vh',
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col md={12} sm={12}>
                                                            <h3 className='movie-detail-tile'><b>{audiodetail.title}</b></h3>
                                                            <ul>
                                                                <Row>
                                                                    <Col sm={4} md={3} xs={4}>
                                                                        <li>
                                                                            <small>{`${episodes.length} Episodes`} </small>
                                                                        </li>
                                                                    </Col>
                                                                    <Col sm={4} md={3} xs={6} className='text-left'>
                                                                        <li>
                                                                            <small>{hrArr[0]}:{min}:{seconds > 0 ? seconds : '00'}</small>
                                                                        </li>
                                                                    </Col>
                                                                    <Col sm={1} md={1} xs={1} className='text-left pointer'>
                                                                        <FontAwesomeIcon onClick={() => user_id !== null ? handleWishlistAddRemove(audiodetail.id, wishlisted === true ? false : true) : navigate('/login')} style={{ color: 'white', fontWeight: 900 }}
                                                                            aria-hidden="true" icon={user_id !== null ? (wishlisted === true ? faBookmark : regularBookmark) : regularBookmark} />
                                                                    </Col>
                                                                    <Col sm={1} md={1} xs={1} className='text-left pointer'>
                                                                        <FontAwesomeIcon
                                                                            onClick={() => user_id !== null ? handleLikeDislike(audiodetail.id, liked === false ? true : false, false) : navigate('/login')}
                                                                            style={{ color: 'white', fontWeight: 900 }}
                                                                            aria-hidden="true" icon={user_id !== null ? (liked === true ? faThumbsUp : regularThumbsUp) : regularThumbsUp} /><br />
                                                                        <small><span>{likecount}</span></small>
                                                                    </Col>
                                                                    <Col sm={1} md={1} xs={1} className='text-left pointer'>
                                                                        <FontAwesomeIcon
                                                                            onClick={() => user_id !== null ? handleLikeDislike(audiodetail.id, false, disliked === true ? false : true) : navigate('/login')}
                                                                            style={{ color: 'white', fontWeight: 900 }}
                                                                            aria-hidden="true" icon={user_id !== null ? (disliked === true ? faThumbsDown : regularThumbsDown) : regularThumbsDown} />
                                                                        <br />
                                                                        <small><span>{dislikecount}</span></small>
                                                                    </Col>
                                                                </Row>
                                                            </ul>
                                                            <p className='audio-detail-description' style={{ textAlign: 'justify' }}>
                                                                {audiodetail.description}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={6} sm={12}>
                                                    <Episodes episodes={episodes} thumb={backgroundImageStyle} />
                                                </Col>
                                            </Row>
                                        </Container>
                                    </>
                                )
                            }
                        </>
                    )
            }
            <footer className="app-footer">
                <AudioPlayer />
            </footer>
        </>
    );
}
export default AudioFileDetail