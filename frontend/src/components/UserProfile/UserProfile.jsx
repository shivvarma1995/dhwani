import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faHandsBubbles, faMoneyBill, faMoneyBillWave, faPhone, faPlane, faSection, faSubscript } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
const UserProfile = () => {
    const [plan, setUserPlanData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        userPlanDetail();
    }, [])
    const userPlanDetail = async () => {
        setLoading(true)
        const data = JSON.stringify({
            'user_id': localStorage.getItem('dastaan__user_id') != null ? localStorage.getItem('dastaan__user_id') : 0
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/plan-detail`,
            headers: {
                'Authorization': localStorage.getItem('dastaan__token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config).then((response) => {
            setLoading(false)
            console.log(response.data.data);
            setUserPlanData(response.data.data)
        })
    }
    return (
        <>
            {loading ?
                (
                    <Loader loading={loading} />) : (
                    <>
                        <Header />
                        <Container className='mt-7'>
                            <Row>
                                <Col sm={12} md={{ span: 4, offset: 4 }} xs={12}>
                                    <Card className='bg-black text-white ' style={{ border: '1px solid gray' }}>
                                        <Card.Body>
                                            <Image
                                                src={`${process.env.PUBLIC_URL}/logo/profile_placeholder.gif`}
                                                style={{
                                                    height: "250px",
                                                    width: "100%",
                                                    marginBottom: '10px',
                                                    borderRadius: '5px'
                                                }}
                                            />
                                            <h3 className='text-white text-left'>Welcome <b style={{ color: "#fc6207" }}>{localStorage.getItem('dastaan__name') != 'null' ? localStorage.getItem('dastaan__name') : 'User '},</b></h3>
                                            <h6 className='text-left ml-1'><FontAwesomeIcon icon={faPhone} /> &nbsp;{localStorage.getItem('dastaan__phone')}</h6>
                                            <h6 className='text-left ml-1'><FontAwesomeIcon icon={faClock} /> &nbsp;{plan.plan_exp_date}</h6>
                                            <h6 className='text-left ml-1'><FontAwesomeIcon icon={faMoneyBillWave} /> &nbsp;{plan.plan_amount}</h6>
                                            <h6 className='text-left ml-1'><FontAwesomeIcon icon={faMoneyBill} /> &nbsp;{plan.plan_name}</h6>
                                            <h6 className='text-left ml-1'>Plan: &nbsp;{localStorage.getItem('dastaan__plan_active') == 'true' ? 'Active' : 'Inactive'}</h6>
                                            <Link to="/plans" className='upgrade-plan-cta'>Upgrade Plan</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/*  <Col sm={8} md={8} xs={12}>
                        <Card className='bg-black text-white ' style={{ border: '1px solid gray' }}>
                            <Card.Body>
                                <h3 className='text-white text-left'>Welcome <b style={{ color: "#fc6207" }}>{localStorage.getItem('dastaan__name')},</b></h3>
                                <h6 className='text-left ml-1'><FontAwesomeIcon icon={faPhone} /> &nbsp;{localStorage.getItem('dastaan__phone')}</h6>
                                <h6 className='text-left ml-1'>Plan: &nbsp;{localStorage.getItem('dastaan__plan_active') == 'true' ? 'Active' : 'Inactive'}</h6>
                            </Card.Body>
                        </Card>
                    </Col> */}
                            </Row>
                        </Container>
                    </>
                )}
        </>
    )
}
export default UserProfile