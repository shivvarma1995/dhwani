import React from 'react'
import { Col, Row } from 'react-bootstrap';
const MoreLike = ({ relatedmovies, onMoreLikeClick }) => {
    
    return (
        <>
            <Row className='ml-1'>
                <Col md={12} sm={12}><h3 className='home-heading'>More Like This</h3></Col>
                {relatedmovies.map((item, index) => (
                    <Col md={2} sm={3} xs={4}>
                        <div key={index} className="card-wrapper">
                            <div className="card">
                                <div onClick={() => onMoreLikeClick(item.movie_id)} >
                                    <img src={item.movie_poster} alt={item.movie_title} className="slick-slider-img card-img-top" />
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default MoreLike