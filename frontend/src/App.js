import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Plans from './components/Plans/Plans';
import { PrivacyPolicy } from './components/CompanyPages/PrivacyPolicy';
import TermsCondition from './components/CompanyPages/TermsCondition';
import AudioFileDetail from './components/AudioFiles/AudioFileDetail';
import { AudioPlayerProvider } from './components/AudioFiles/AudioPlayerContext';
import AudioPlayer from './components/AudioFiles/AudioPlayer';
import { SearchGlobalProvider } from './components/Search/SearchGlobalContext';
import MyWatchList from './components/MyWatchList/MyWatchList';
import UserProfile from './components/UserProfile/UserProfile';
import Pages from './components/Pages/Pages';
const AppContent = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/audio-file-detail/:id' element={<AudioFileDetail />} />
        {/* <Route path='/tv-shows' element={<TVShowHome />} /> */}
        {/* <Route path='/movies/:id' element={<MovieDetail />} /> */}
        {/* <Route path='/watch/:id' element={<Watch />} /> */}
        <Route exact path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route exact path='/terms-condition' element={<TermsCondition />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/profile' element={<UserProfile/>} />
        <Route path='/my-watchlist' element={<MyWatchList />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/pages/:id' element={<Pages />} />
      </Routes>
      <AudioPlayer />
    </>
  );
}
function App() {
  return (
    <AudioPlayerProvider>
      <SearchGlobalProvider>
      <Router>
        <AppContent />
      </Router>
      </SearchGlobalProvider>
    </AudioPlayerProvider>
  );
}
export default App;
