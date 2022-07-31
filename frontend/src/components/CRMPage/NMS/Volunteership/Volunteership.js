import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
// import VendorTypeChart from "../Reports/VendorReport/VendorTypeChart";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Volunteership.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
// import logo from "../Reports/logo";

const Volunteership=()=>{
    const [date,setDate]=useState("");
    const [volunteers,setVolunteers]=useState([]);
    const [success,setSuccess]=useState(false);
const upDate=(e)=>{
setDate(e.target.value)
}

const sendDate=()=>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/nms/getVolunteers-ondemand`,
    {
        date1:date
    },
    {
        headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          }
    }
    ).then((res)=>{
        console.log(res);
        setVolunteers(res.data.data);
        setSuccess(res.data.success);
    }).catch((err)=>{
        console.log(err);
    })
}

const acknowledge=(approve,volId)=>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/nms/acknowledgeVolunteers`,
    {
        approve:approve,
        volId:volId
    },
    {
        headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          }
    }
    ).then((res)=>{
        console.log(res);
        setVolunteers(current =>
            current.filter(element => {
              return element._id !== volId;
            }),
          );
    }).catch((err)=>{
        console.log(err);
    })
}
    return(
<>
<div className={styles.Volunteership__main}>
    <div className={styles.Volunteership__shadow}>
    <div className={styles.Volunteership__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.Volunteership__logo}
            />
            <div className={styles.Volunteership__form__heading}>
                Search Volunteership
            </div>            
          </div> 
          <div className="input"
          style={{
            display:"flex",
            justifyContent:"center",
            alignItem:"center",
            flexDirection:"column"
          }}
          >
            <div className="text-center" style={{
                   marginLeft:"40%",
            }}>
            <Form.Group as={Col} md="4" controlId="validationFormik02" className="mb-3 text-center" >
                  <Form.Label>Volunteership Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="date"
                    value={date}
                    onChange={upDate} 
                                        
                    required
                  />
                </Form.Group>
            </div>

            <div className="text-center">
            <Button className="btn btn-primary mb-3" onClick={sendDate}>Search</Button> 
            </div>

          </div>
    </div>
</div>
<div className={styles.Volunteership__main}>
   <div className={styles.Volunteership__shadow}>
   <div className={styles.Volunteership__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.Volunteership__logo}
            />
            <div className={styles.Volunteership__form__heading}>
               Volunteers
            </div>            
          </div> 
         {
            success?(<>
           {
            volunteers.length>0?(<> 
            <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">SN</th>
      <th scope="col">Name</th>
      <th scope="col">Project Name</th>
      <th scope="col">Phone No.</th>

      <th scope="col">Email</th>
      <th scope="col">Acknowledge</th>
    </tr>
  </thead>
  <tbody>
   {
    volunteers.map((vol,index)=>{
        return(<>
        <tr key={vol._id}>
        <td>{index+1}</td>
         <td>{vol.volName}</td>
         <td>{vol.volProjectName}</td>
         <td>{vol.volNumber}</td>

         <td>{vol.volEmail}</td>
         <td>
            {
                vol.isActive?(<>
            <Button className="btn btn-danger" onClick={()=>acknowledge(0,vol._id)}>Discard</Button>
                </>):(<>
                <p className="text-danger">Discarded</p>
                </>)
            }
         </td>
        </tr>
        </>)
    })
   }
  </tbody>
</table>
            </>):(<>
             <div className="text-center">
            <h4 className="text-danger">No Volunteers Found for this date!</h4>
        </div></>)
           }
            </>):(<>
            <div className="text-center">
                <h4 className="text-danger">No Volunteers Found !</h4>
            </div>
            </>)
         }
   </div> 
</div>
</>
    )
}
export default Volunteership;