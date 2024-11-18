import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = ({loading}) => {
   
    return (
        <div className="loader">
            {/* <DotLoader color="#FF9156" /> */}
            <PropagateLoader color="#FF9156" />
        </div>
    )

}
export default Loader