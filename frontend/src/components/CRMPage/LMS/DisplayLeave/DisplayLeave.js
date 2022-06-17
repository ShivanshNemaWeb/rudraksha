import React, { useEffect } from 'react';
import axios from "axios";
const DisplayLeave=()=>{
    useEffect(async()=>{
await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lms/getAllLeaves`).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.error(err);
})
    },[])
    return(
        <h1>All leaves</h1>
    )
}
export default DisplayLeave;