import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <Row className=''>
        <Col md={4} sm={4} className='footer-terms-policy-links'>
        <Row className='text-justify'>
            <Col md={12}><Link to="/terms-condition">Terms & Conditions</Link></Col>
            <Col md={12}><Link to="/privacy-policy">Privacy Policy</Link></Col>
        </Row>
        
        </Col>
        <Col md={4} sm={4}>
        </Col>
        <Col md={4} sm={4}>
       
        </Col>
        <Col md={12} sm={12} className='text-center'>
        <span>Copyright © 2023 www.dastaan.info All Rights Reserved.</span>
        </Col>
    </Row>
    </>
  )
}

export default Footer