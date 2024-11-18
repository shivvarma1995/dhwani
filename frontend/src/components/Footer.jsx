import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Footer = () => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    getPages()
    console.log(pages);
  }, []);
  const getPages = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/pages`,
      headers: {
        'Authorization': localStorage.getItem('dastaan__token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    axios.request(config).then((response) => {
      console.log(response.data);
      setPages(response.data.data)
    })
  }
  return (
    <Container>
      <Row>
        {
          pages.map((item, index) => (
            <Col md={3} sm={6} xs={12}>
              <Link to={`pages/${item.page_name}`}><span style={{ color: "white" }}>{item.page_name}</span></Link>
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}
export default Footer