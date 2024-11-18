import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { Button, Card, Col, Container, Form, FormControl, Modal, Row } from 'react-bootstrap'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { toast, ToastContainer } from 'react-toastify'
const Plans = () => {
    const [superPacks, setSuperPack] = useState([])
    const [activePlan, setActivePlan] = useState(1);
    const [mandateURL, setMandateUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paybutton, setShowPayButton] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [vpa, setVPA] = useState(null);
    useEffect(() => {
        fetchData();
        const os = getOS()
        console.log(os);
    }, []);
    const getOS = () => {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        let os = null;
        if (macosPlatforms.includes(platform)) {
            os = 'Mac OS';
        } else if (iosPlatforms.includes(platform)) {
            os = 'iOS';
        } else if (windowsPlatforms.includes(platform)) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }
        return os;
    };
    const fetchData = async () => {
        setLoading(true)
        try {
            const data = JSON.stringify({
                'phone': localStorage.getItem('dastaan__phone') !== null ? localStorage.getItem('dastaan__phone') : 1
            });
            let config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_API_URL}/plans`,
                headers: {
                    'Authorization': localStorage.getItem('dastaan__token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios.request(config)
                .then((response) => {
                    // console.log(response.data);
                    setLoading(false)
                    setSuperPack(response.data.plans)
                });
        } catch (err) {
            setLoading(false)
            // setError(err);
        } finally {
            // setLoading(false);
        }
    };
    const handleVPA = (event) => {
        setVPA(event.target.value);
    }
    const createPaymentMandate = async () => {
        // setLoading(true)
        const data = JSON.stringify({
            'mobile_number': localStorage.getItem('dastaan__phone') !== null ? localStorage.getItem('dastaan__phone') : 1,
            'plan_id': activePlan,
            'merchantUserId': localStorage.getItem('dastaan__user_id'),
            'user_id': localStorage.getItem('dastaan__user_id'),
        });
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/create-phonepe-subscription`,
            headers: {
                'Authorization': localStorage.getItem('dastaan__token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config).then((response) => {
            // setLoading(false)
            // console.log(response.data);
            // console.log(response.data);
            const msg = response.data.message;
            // console.log(msg);
            // toast.error(msg);
            if (response.data.data !== undefined) {
                setShowPayButton(true)
                // console.log(data);
                // const data = response.data.data;
                // const redirectType = data.redirectType != undefined ? data.redirectType : null;
                const redirectUrl = response.data.data.redirectUrl !== undefined ? response.data.data.redirectUrl : null;
                console.log(redirectUrl);
                setMandateUrl(redirectUrl)
            }
        })
    }
    const changePlan = (id) => {
        setActivePlan(id)
        const os = getOS();
        if (os === 'Android') {
            createPaymentMandate()
        }
        else {
            setShow(true)
        }
    }
    const handleWebPayment = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('plan_id', activePlan)
        formData.append('mobileNumber', localStorage.getItem('dastaan__phone'))
        formData.append('subscriptionName', 'Daily')
        formData.append('merchantUserId', localStorage.getItem('dastaan__user_id'))
        formData.append('user_id', localStorage.getItem('dastaan__user_id'))
        formData.append('upi_id', vpa)
        const config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/create-phonepe-subscription-vpa`,
            // url: `https://tamashatv.com/create_user_subscription`,
            headers: {
                'Authorization': localStorage.getItem('dastaan__token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: formData
        }
        axios.request(config).then((response) => {
            console.log(response);
            const msg = response.data.message;
            setShow(false)
            toast(msg);
            setVPA(null)
        })
        // 
    }
    const handleVPAVerification = async () =>{
        console.log(vpa);
        
        const baseURL = 'https://api.phonepe.com/apis/hermes';
        const endpoint = '/v1/vpa/validate';
        const apiKey = '4865f6b1-9e26-47ee-bc4f-b1febdff78e5'; // Replace with your API key
        const saltKey = '1'; // Replace with your salt key
        const merchantId = 'TAMASHATVONLINE'; // Replace with your merchant ID
        const vpaToVerify = vpa;
      
        const payload = {
          merchantId,
            //   transactionId: 'UNIQUE_TRANSACTION_ID', // Generate a unique transaction ID
          vpa: vpaToVerify
        };
      
        const payloadString = JSON.stringify(payload);
        const checksum = crypto.createHash('sha256').update(payloadString + saltKey).digest('hex');
      
        try {
          const response = await axios.post(`${baseURL}${endpoint}`, payload, {
            headers: {
              'Content-Type': 'application/json',
              'X-VERIFY': `${checksum}###${saltKey}`,
              'accept': 'application/json',
              'X-CLIENT-ID': apiKey
            }
          });
      
          if (response.data.success) {
            console.log('VPA is valid');
            // Handle success case
          } else {
            console.log('VPA is invalid');
            // Handle failure case
          }
        } catch (error) {
          console.error('Error verifying VPA:', error.response ? error.response.data : error.message);
          // Handle error case
        }
    }
    return (
        <>
            {
                loading ? (<Loader loading={loading} />) :
                    (
                        <>
                            <Header />
                            <Container>
                                <div className='text-white mt-10'>
                                    <Row>
                                        <Col md={12} sm={12}>
                                            <h2 style={{
                                                fontSize: "2.75rem",
                                                fontWeight: 900,
                                                lineHeight: 1
                                            }}>Dastaan Premium</h2>
                                            <span
                                                style={{
                                                    fontSize: "1.0625rem",
                                                    lineHeight: 1.25
                                                }}
                                            >Entertainment Redefined - The best of Hollywood, Before TV premieres, Blockbuster movies, Exclusive series, India’s biggest Kids & Family hub + 365 days of reality!</span>
                                        </Col>
                                        {superPacks.map((item, index) =>
                                            <Col md={4} key={item.id}>
                                                <Card onClick={() => changePlan(item.id)} className={`mt-4 plan_card ${activePlan === item.id ? 'active_plan' : ''} `}>
                                                    <Card.Body>
                                                        <Row>
                                                            <Col md={7} sm={6} >
                                                                <p className='plan_title text-white'>{item.plan_name}</p>
                                                            </Col>
                                                            <Col md={5} sm={6} >
                                                                <span className='plan-days text-white text-right'>{item.plan_days} Day(s)</span>
                                                            </Col>
                                                        </Row>
                                                        <ul className='plan-benefits text-white'>
                                                            <li>Ad-Free</li>
                                                            <li>Includes all Premium content</li>
                                                            <li>Download and listen anytime</li>
                                                        </ul>
                                                        <Row>
                                                            <Col md={4} sm={6} className='text-left'>
                                                                <div>
                                                                    <small className='rupee-symbol text-white'><FontAwesomeIcon icon={faIndianRupeeSign} /></small><p className='plan-price text-white'>{parseInt(item.plan_price - item.discount)}</p>
                                                                </div>
                                                            </Col>
                                                            <Col md={6} sm={6}>
                                                                <span className='text-white'><del className='text-white'><FontAwesomeIcon className='text-white' icon={faIndianRupeeSign} /> {parseInt(item.plan_price)}</del> {((item.discount / item.plan_price) * 100).toFixed(2)}% OFF</span>
                                                            </Col>
                                                            <Col md={12} sm={12} className={`pay-button-div ${paybutton !== item.id ? 'none' : ''} text-white`}>
                                                                <Link to={mandateURL}>
                                                                    <span className='pay-button text-white'>Pay</span>
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Payment</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form method='POST' onSubmit={handleWebPayment}>
                                            <FormControl
                                                type={'text'}
                                                onChange={handleVPA}
                                                value={vpa}
                                                className='vpa_input'
                                                placeholder={'Enter VPA'}
                                            />
                                            <Button className='mt-5' variant="primary" type='button' onClick={handleVPAVerification} >
                                                Verify VPA
                                            </Button>
                                           {/*  <Button className='mt-5' variant="primary" type='submit' >
                                                Pay Now
                                            </Button> */}
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                            </Container>
                        </>
                    )
            }
            <ToastContainer />
        </>
    )
}
export default Plans