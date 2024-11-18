import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Pages = () => {
    const param = useParams();
    console.log(param);

    const [content,setContent] = useState(null);
    useEffect(() =>{
      getPages()
    //   console.log(pages);
      
    },[]);
    
    const getPages = () =>{
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

        response.data.data.map((item) =>{
            if(item.page_name === param.id)
            {
                setContent(item.content)
            }
        })
      })
    }
    
  return (
    <>
    <Container className='mt-5'>
        <h3 className='text-center'>{param.id}</h3>
        {/* <div>{content}</div> */}
        <div>

        { content
            ? (
                <div dangerouslySetInnerHTML={{__html: content.replace(/(<? *script)/gi, 'illegalscript')}} >
                </div>
              )
            : content
          }
        </div>
</Container>

    </>
   
  )
}

export default Pages