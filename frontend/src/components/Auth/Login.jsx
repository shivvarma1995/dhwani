import React, { useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
    const { reset } = useForm();
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const otpVerifyBtn = useRef(null);
    const otpField = useRef(null)
    const mobileNumberInput = useRef(null)
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== '' && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };
    const getOTP = (event) => {
        console.log(event.target.value);
        setPhone(event.target.value)
        // console.log(process.env.REACT_APP_API_URL);
        
        if (phone.length === 9) {
            const data = {
                phone: event.target.value,
            };
            /*  const headers = {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer your-token-here', // Add your token or any other header
             };
*/
            axios.post(`${process.env.REACT_APP_API_URL}/send-otp`, data)
                .then((response) => {
                    console.log(response.data);
                    const res = response.data;
                    const msg = res.VIDEO_STREAMING_APP[0].msg;
                    toast(msg);
                    // setData(response.data);
                    // setLoading(false);
                })
                .catch((error) => {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: "Bounce",
                    });
                    // setError(error);
                    // setLoading(false);
                });
            otpField.current.classList.remove('none')
            otpVerifyBtn.current.classList.remove('none')
            mobileNumberInput.current.classList.add('none')
        } else {
            otpField.current.classList.add('none')
            mobileNumberInput.current.classList.remove('none')
        }
    }
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            // console.log('submit button clicked');
            // alert('handle submit');
            if (otp.some((digit) => digit === '')) {
                setError('Please enter a valid 4-digit OTP');
            } else {
                // const formatedOtp = otp.replace(new RegExp(',', 'g'), '');
                const strOtp = otp.toString()
                const formatedOTP = strOtp.replaceAll(',', '');
                const data = {
                    phone: phone,
                    otp: formatedOTP
                }
                axios.post(`${process.env.REACT_APP_API_URL}/verify-otp`, data)
                    .then((response) => {
                        console.log(response.data);
                        const resData = response.data.Podcast_App
                        resData[0].success === '1' ? toast(resData[0].msg) : toast.error(resData[0].msg)
                        const user_image = resData[0].user_image
                        const name = resData[0].name
                        const token = resData[0].token
                        const phone = resData[0].phone
                        const user_id = resData[0].user_id
                        const exp_date = resData[0].user_profiles[0].exp_date
                        console.log(exp_date);
                        
                        const __exp_date = new Date(exp_date)
                        const __current_full_date = new Date();
                        // console.log(__exp_date +'|||||'+__current_full_date);
                        
                        const plan_active = __exp_date > __current_full_date ? true : false
                        // console.log(plan_active);
                        
                        localStorage.setItem("dastaan__user_image", user_image);
                        localStorage.setItem("dastaan__name", name);
                        localStorage.setItem("dastaan__user_id", user_id);
                        localStorage.setItem("dastaan__phone", phone);
                        localStorage.setItem("dastaan__token", token);
                        localStorage.setItem("dastaan__plan_active", plan_active);
                        // if (plan_active === true)
                        // navigate('/')
                        //  else
                             navigate('/plans')
                        reset();
                        // setData(response.data);
                        // setLoading(false);
                    })
                    .catch((error) => {
                        // console.log(error);
                        toast.error(error)
                        // setError(error);
                        // setLoading(false);
                    });
                setError('');
                // alert(`OTP Submitted: ${otp.join('')}`);  
            }
        } catch (error) {
            toast.error(error)
            // console.log(error);
        }
    }
    return (
        <>
            <Container >
                <Row className='mt-10 ' >
                    <Col md={{ span: 5, offset: 3}}>
                    <Col md={12} sm={12} className='text-center'>
                    <Image
                    style={{width:'350px'}}
                    src={`${process.env.PUBLIC_URL}/logo/Dastaan_logo.png`} className='logo-login-page' alt="logo" title="Dastaan" />
                    </Col>
                        <Card className='bg-black text-white'
                            style={{ border: '1px solid gray'}}>
                            <Card.Body>
                                <Col md={12} sm={12}>
                                <h3 className='login-text'><Link to="/"><FontAwesomeIcon  style={{color: '#fa5a05'}} icon={faArrowLeft} aria-hidden="true" /></Link> &nbsp;Login to continue</h3>
                                </Col>
                                <Form onSubmit={handleSubmit} method='POST'>
                                    <Col md={12} sm={12} xs={12}  className='mt-5'>
                                        
                                        <Form.Control
                                            style={{ fontSize: '2rem' }}
                                            ref={mobileNumberInput} onKeyUp={getOTP}
                                            className='login_phone_number_input'
                                            type="number"
                                            inputmode="numeric"
                                            placeholder="Your Mobile Number"
                                        />
                                    </Col>
                                    <Row ref={otpField} className='none otp-fields'>
                            
                                        {otp.map((digit, index) => (
                                            <Col key={index} md={3} xs={3} >
                                                <Form.Control
                                                    className='otp_input_field'
                                                    type="number"
                                                    maxLength="1"
                                                    id={`otp-${index}`}
                                                    value={digit}
                                                    onChange={(e) => handleChange(e, index)}
                                                    style={{ textAlign: 'center', fontSize: '2rem' }}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                    
                                        <Col md={12} sm={12} className='mt-3'>
                                            <Button className='otp_verify_btn none' ref={otpVerifyBtn} type='submit'>
                                                Verify OTP
                                            </Button>
                                        </Col>
                                    
                                    <Row>
                                        <Col md={12} sm={12} xs={12} className='text-justify mt-3'>
                                            <span>
                                                By continuing you agree to our <Link to="/terms-condition" className='text-underline' style={{color: '#fa5a05'}}><b>Terms of Use</b> </Link> and 
                                                acknowledge that you have read our <Link to="/privacy-policy" className='text-underline'  style={{color: '#fa5a05'}}><b>Privacy Policy </b></Link>.
                                            </span>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>



           {/*  <Container className=''>
                <div className='mt-20' >
                    <Form onSubmit={handleSubmit} method='POST'>
                        <Row>
                            <Col md={12} sm={12} xs={12} className='text-center'>
                                <h3 className=''><Link to="/"><FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" /></Link> &nbsp;Login to continue</h3>
                                <Form.Control
                                    style={{ fontSize: '2rem' }}
                                    ref={mobileNumberInput} onKeyUp={getOTP} className='login_phone_number_input' type="number" placeholder="Your Mobile Number" />
                            </Col>
                        </Row>
                        <Row ref={otpField} className='none otp-fields'>
                            
                            {otp.map((digit, index) => (
                                <Col key={index} xs={2} md={1}>
                                    <Form.Control
                                        className='otp_input_field'
                                        type="text"
                                        maxLength="1"
                                        id={`otp-${index}`}
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        style={{ textAlign: 'center', fontSize: '2rem' }}
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Row className='mt-2 text-center'>
                            <Col md={12} sm={12}>
                                <Button className='otp_verify_btn none' ref={otpVerifyBtn} variant="primary" type='submit'>
                                    Verify OTP
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12} xs={12} className='text-center mt-3'>
                                <span>
                                    By continuing you agree to our <Link to="/terms-condition" className='text-underline'><b>Terms of Use</b> </Link> and <br />
                                    acknowledge that you have read our <Link to="/privacy-policy" className='text-underline'><b>Privacy Policy </b></Link>.
                                </span>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container> */}
            <ToastContainer />
        </>
    )
}
export default Login