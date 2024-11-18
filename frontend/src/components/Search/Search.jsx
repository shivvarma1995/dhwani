import React, { useContext, useEffect } from 'react'
import { SearchGlobalContext } from './SearchGlobalContext'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faPencilAlt, faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Search = () => {
    const {
        searchKeyword,
        searchResults
    } = useContext(SearchGlobalContext)
    return (
        <>
            {
                searchResults.length == 0 ? '<h1>Result not found</h1>' : (
                    <>
                        <h3 className="home-heading mt-7">Top Results</h3>
                        <Row>
                            {
                                searchResults.map((audFile) => (
                                    <Col md={2} sm={2} xs={3}>
                                        <div key={audFile.audio_file_id} className="card-wrapper">
                                            <div className="card">
                                                <div className='image'>
                                                    <img src={audFile.landscape_thumb} alt={audFile.title} className="card-img-top slick-slider-img" />
                                                </div>
                                                <div className="details">
                                                    <div className="center">
                                                        <Row>
                                                            <Col md={12} sm={12} xs={12}>
                                                                <span className='file-title text-white'>{audFile.title}</span>
                                                            </Col>
                                                            <Col md={2} sm={2} xs={12}>
                                                                <Link to={`/audio-file-detail/${audFile.audio_file_id}`}
                                                                    onClick={() => searchResults([])}
                                                                >
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
        </>
    )
}
export default Search