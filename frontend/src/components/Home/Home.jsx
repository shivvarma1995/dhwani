import React, { useContext, useEffect, useState } from 'react'
import Slider from '../Slider'
import Header from '../Header'
import axios from 'axios'
import Loader from '../Loader/Loader'
import CategoryWiseFiles from '../AudioFiles/CategoryWiseFiles'
import { SearchGlobalContext } from '../Search/SearchGlobalContext'
import Search from '../Search/Search'
import Footer from '../Footer'
import TopContent from '../TopContents/TopContent'
import MostListened from '../MostListened/MostListened'
const Home = () => {
  const [sliders, setSlider] = useState([])
  const [loading, setLoading] = useState(true);
  const [categories, setCatgories] = useState([]);
  const [audiofiles, setAudioFiles] = useState([]);
  const [searchkeys, setSearchKey] = useState([]);
  const [topContent, setTopContents] = useState([]);
  const [mostListened, setMostListened] = useState([]);
  const {searchResults} = useContext(SearchGlobalContext)
  useEffect(() => {
    getHomePageData()
    console.log(searchResults);
    
  }, [])
  const getHomePageData = () => {
    setLoading(true)
    const data = JSON.stringify({
      'user_id' : localStorage.getItem('dastaan__user_id') !=  null ? localStorage.getItem('dastaan__user_id') : 0
    });
   
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/home`,
      headers: { 
        'Authorization': localStorage.getItem('dastaan__token'), 
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config).then((response) => {
      setLoading(false)
      console.log(response.data.Podcast_App);
      setCatgories(response.data.Podcast_App.categories)
      // setRecentlyListened(response.data.Podcast_App.recently_watched)
      setAudioFiles(response.data.Podcast_App.audio_file_data)
      // const sc = response.data.Podcast_App.audio_file_data[0].length > 0 ? response.data.Podcast_App.audio_file_data[0] : (response.data.Podcast_App.audio_file_data[1].length > 0 ? response.data.Podcast_App.audio_file_data[1] : response.data.Podcast_App.audio_file_data[2]);
      setSlider(response.data.Podcast_App.slider)

      setTopContents(response.data.Podcast_App.top_contents)
      setMostListened(response.data.Podcast_App.most_listened)

      setSearchKey(response.data.Podcast_App.search_keywords)
    })
  }
  return (
    <>
      {loading ?
        (
          <Loader loading={loading} />) : (
          <>
            <Header />
            {
              searchResults.length > 0  ? (<Search/>) : (
                <>
                <Slider sliders={sliders} />
                <TopContent  topContent={topContent}/>
                <MostListened mostListened={mostListened} />
                <CategoryWiseFiles audiofiles={audiofiles}  categories={categories}/>
                <Footer/>
                </>
              )
            }
            
           
          {/*  */}
          </>
        )}
    </>
  )
}
export default Home