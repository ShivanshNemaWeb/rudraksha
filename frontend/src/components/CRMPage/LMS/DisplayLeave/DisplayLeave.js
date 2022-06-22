// export default DisplayLeave;
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

// import VendorTypeChart from "../Reports/VendorReport/VendorTypeChart";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./DisplayLeave.module.css";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
//  import logo from "./Reports/logo";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const DisplayLeave = () => {
    const [employees,setEmployees]=useState([]);
    const [leaves,setLeaves]=useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    //getting all leaves
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/lms/getAllLeaves`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("rudraksha")
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setLeaves(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

      //getting all employees
      await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`)
      .then((res) => {
        setEmployees(res.data.data);
        console.log(res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //Aprooving Leave
  const approve=async(event)=>{
    event.preventDefault();
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/lms/approveLeaves`, {
    leaveId:"62aca48b8ac3f9122a87296f",
    status:"Approved"
},
{ 
  headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`
}
  })
.then((res)=>{
  console.log(res);
})
.catch((err)=>{
  console.log(err);
})
  }
//Reject Leave
const reject=async(event)=>{
  event.preventDefault();
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/lms/approveLeaves`, {
  leaveId:"62aca48b8ac3f9122a87296f",
  status:"Rejected"
},
{ 
headers: {
Authorization: `Bearer ${JSON.parse(
  localStorage.getItem("rudraksha")
)}`,
}
})
.then((res)=>{
console.log(res);
})
.catch((err)=>{
console.log(err);
})
}
  return(
    <>
<div className={styles.leaves__main}>
        <div className={styles.leaves__shadow}>
          <div className={styles.leaves__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.leaves__logo}
            />
            <div className={styles.leaves__form__heading}>
              Leave Management System
            </div>
          </div>

          <Form className={styles.leaves__form}>
            <div className={styles.leaves__form2}>
              <div>
                <h4 className={styles.leaves__heading}>
            Employee Leaves
                </h4>
            
              </div>
              <table className="table table-bordered table-striped text-center">
  <thead>
    <tr className="text-center">
      
      <th scope="col">Employee Details</th>
      <th scope="col">Leave Type</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Status</th>
      <th scope="col"></th>

    </tr>
  </thead>
 
  <tbody>
  {
  leaves.map((leave)=>{
    return(
    employees.map((employee)=>{
      {
        if(employee._id===leave.empId){
          return(
            <tr key={leave.empId} className="text-center">
                <td className="text-center">
                <p><span className="text-primary">Name :</span>{`${employee.firstname} ${employee.lastname} `}</p>
                {/* <p><span className="text-primary">Designation</span>:{employee.designation}</p>
                <p><span className="text-primary">Gender</span>:{employee.gender}</p> */}

                </td>
                <td>
              <p>{leave.typeOfLeave}</p>
                </td>
                <td>
              <p>{leave.from}</p>
                </td>
                <td>
              <p>{leave.to}</p>
                </td>
                <td>
              <p>{leave.status}</p>
                </td>
                <td>
              <button className="btn btn-primary m-3" onClick={approve}>Aproove</button>
              <button className="btn btn-danger" onClick={reject}>Reject</button>

                </td>
            </tr>
          )
        }
      }
    })
   ) })
  
}
  </tbody>
</table>

            </div>

          </Form>
          
        </div>
      </div>
    </>
  )
};
export default DisplayLeave;