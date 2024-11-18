import { faPencilAlt, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../Header';

const MyWatchList = () => {
    const [wishlist, setWishlist] = useState([])
    useEffect(() =>{
        fetchUserWatchList()
    },[])

    const fetchUserWatchList = async () =>{
        try {

            const data = {
                "user_id": localStorage.getItem('dastaan__user_id') // integer
               
            };
            const config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_API_URL}/user-wishlist`,
                headers: {
                    'Authorization': localStorage.getItem('dastaan__token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios(config).then((response) => {
                console.log(response.data.Podcast_App.data);
                setWishlist(response.data.Podcast_App.data)
                
            });
            
        } catch (error) {
            toast.error(error);
        }
    }
  return (
   
   <>
   <Header/>
   

   
    <Row style={{marginLeft:"1%"}}>
        <Col md={12} sm={12}>
        <h3 className="home-heading mt-7">My Wishlist</h3>
        </Col>
        {
          
            wishlist.map((audFile) =>(
                <Col md={2} sm={2} xs={3}>

                                       
                                  
                                            <div key={audFile.audio_file_id} className="card-wrapper">
                                                <div className="card">
                                                    <div className='image'>
                                                        <Image src={audFile.landscape_thumb} alt={audFile.title} className="card-img-top slick-slider-img" />
                                                    </div>
                                                    <div className="details">
                                                        <div className="center">
                                                            <Row>
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <span className='file-title text-white'>{audFile.title}</span>
                                                                </Col>
                                                                <Col md={2} sm={2} xs={12}>
                                                                    <Link to={`/audio-file-detail/${audFile.audio_file_id}`}>
                                                                        <FontAwesomeIcon icon={faPlay}
                                                                            style={{
                                                                                border: '1px solid #f44306',
                                                                                padding: '6px 8px 6px 8px',
                                                                                borderRadius: '50%',
                                                                                color: "#f44306"
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                </Col>

                                                               
                                                                <Col md={12} sm={12} xs={12}>
                                                                    <FontAwesomeIcon icon={faPencilAlt} />&nbsp;
                                                                    <span className='text-white'>{audFile.author}</span>
                                                                </Col>
                                                                {/* <Col md={12} sm={12} xs={12}>
                                                                    <FontAwesomeIcon icon={faClock} /> &nbsp;
                                                                    <span className='text-white'>{`${parseInt(hr)}h ${parseInt(min)}m ${sec}s`}</span>
                                                                </Col> */}
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                              
                </Col>

            ))
        }
        </Row>
   
   </>
  )
}

export default MyWatchList