import React, { useState, useEffect, useRef, useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Container, NavDropdown, Nav, Image, FormControl, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { SearchGlobalContext } from './Search/SearchGlobalContext';
import axios from 'axios';
const Header = () => {
  const {
    searchKeyword,
    setSearchKeyword,
    searchResults,
    setSearchResults,
  } = useContext(SearchGlobalContext);
  const logo = useRef();
  // const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [os, setOS] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(searchKeyword);
  // const [searchvalue, setSearchValue] = useState(null);
  useEffect(() => {
    const uOS = getOS();
    setOS(uOS)
    console.log(uOS);
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
      if (offset > 50)
        logo.current.src = `${process.env.PUBLIC_URL}/logo/Dastaan_logo.png`
      else
        logo.current.src = `${process.env.PUBLIC_URL}/logo/Dastaan_logo.png`
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() =>{
    if (inputValue) {
      // Simulate an API call to get search results
      // const results = fakeSearchAPI(inputValue);

      const search_key =  inputValue;
    setLoading(true)
    const data = JSON.stringify({
      search_key
    });
   
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/search`,
      headers: { 
        'Authorization': localStorage.getItem('dastaan__token'), 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config).then((response) => {
      setLoading(false)
      // console.log(response.data);
      setSearchResults(response.data.Podcast_App.search_result_data)
      
     
    })
     
  } else {
      setSearchResults([]);
  }
  },[inputValue,setInputValue])
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
  const user_id = localStorage.getItem('dastaan__user_id');
  // setUserPlansStatus(user_plan);
  let menu;
  if (user_id == null) {
    menu = <Link className={`nav-link mr-auto p-2`} to="/login">
      <Nav className='nav-link'>Login</Nav>
    </Link>
  } else {
    const userLogOut = () => {
      localStorage.clear(); // remove all
      window.location.reload();
    }
    menu = <>
    {/* <span className='user-profile-name'>{localStorage.getItem('dastaan__name')}</span> */}
      <NavDropdown className={`mr-auto text-white ml-1`}
        title={
          <Image
            src={`${process.env.PUBLIC_URL}/logo/profile_placeholder.gif`}
            className="user-profile-image" roundedCircle 
            style={{
              height:"40px",
              width:"40px"
            }}
            />}
          /* <Image
            src={localStorage.getItem('user_image') !== ''
              ? localStorage.getItem('user_image') : 'https://cdn.dribbble.com/users/1123508/screenshots/4602728/gif-final.gif'}
            className="user-profile-image" roundedCircle />} */
        id="basic-nav-dropdown"
      >
        <Link to="/profile" className='dropdown-item text-white'>Profile</Link>
        <Link to="/plans" className='dropdown-item text-white'>Plan</Link>
        {/* <Link to="/plans" className='dropdown-item text-white'>Transactions</Link> */}
        <Link to="/my-watchlist" className='dropdown-item text-white'>My Watchlist</Link>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={userLogOut}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  }

  const handleSearchBlur= (event) =>{
 setSearchKeyword(event.target.value)
  }
  const handleSearchChange = async (event) => {
 
      // setSearchKeyword(event.target.value)
      setInputValue(event.target.value)



  }
  return (
    <>
      <Navbar expand="lg" className={isScrolled ? 'navbar-scrolled' : 'navbar-transparent'} bg="dark" data-bs-theme="dark"
        fixed='top'>
        <Container>
          <Link to="/" className='p-2'>
            <Nav >
              {/* <span className='logo'>{process.env.PUBLIC_URL}/logo/Dastaan_logo.png</span> */}
              <Image ref={logo} src={os === 'Android' ? 'D' : `${process.env.PUBLIC_URL}/logo/Dastaan_logo.png`} className='logo' alt="logo" title="Dastaan" />
            </Nav>
          </Link>
          <FormControl
            style={{ width: "50%" }}
            type='text'
            value={inputValue}
            // onClick={handleSearch}
            // onBlur={handleSearch}
            onChange={handleSearchChange}
            onBlur={handleSearchBlur}
            className='search-bar'
            placeholder='Search'
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"   >
            <Nav className="me-auto">
            </Nav>
            {menu}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  )
}
export default Header