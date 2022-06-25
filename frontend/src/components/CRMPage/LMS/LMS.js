import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import React, { useEffect } from "react";
import { useState } from "react";
import VendorTypeChart from "../Reports/VendorReport/VendorTypeChart";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./LMS.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";
// import dateFormat from 'dateformat';

const LMS=()=>{
    const leaves=["casual leave","sick leave","earned leave",
    "compensatory leave","special leave",
    "maternity leave","paternity leave","mourning leave","emergency leave"];
    const [empLeave,setEmpLeave]=useState({
        typeOfLeave:"",
        to:"",
        from:"",
        remarks:"",
        reason:""
    });
    const [errorMessage,setErrMessage]=useState("");
    const[remainingLeave,setRemainingLeave]=useState({});
    const[emp,setEmp]=useState([]);
    const updateLeave=(event)=>{
    setEmpLeave({
        ...empLeave,
        [event.target.name]:event.target.value
    });
    }
    const addLeave=async(e)=>{
        e.preventDefault();
        console.log(empLeave);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/lms/addLeaveApplication`,
{
typeOfLeave : empLeave.typeOfLeave,
from:empLeave.from,
to: empLeave.to,
remarks:empLeave.remarks,
reason:empLeave.reason
}, 
{
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("rudraksha")
    )}`,
  },
}
).then((res)=>{
    setErrMessage(res.data.error)
    console.log(res);
}).catch((err)=>{
    setErrMessage(err.error.message);
})
    }
    useEffect(async()=>{
await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lms/getEmployeeLeaves`,{
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("rudraksha")
    )}`,
  },
}).then((res)=>{
  console.log(res.data.data);
  setRemainingLeave(res.data.data);
}).catch((err)=>{
  console.log(err);                                                                                                                                       
})

await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
  console.log(res.data.data);
  setEmp(res.data.data);
}).catch((err)=>{
  console.log(err);
})  
    },[])

    return(
        <>
    <Navbar bg="light" variant="light">
    <Nav className="me-auto">
    <Nav.Link href="/LMS/displayleave" className="text-primary">
     Leaves
    </Nav.Link>
     </Nav>
    </Navbar>  
    
    <div className={styles.LMS__main}>
        <div className={styles.LMS__shadow}>
          <div className={styles.LMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.LMS__logo}
            />
            <div className={styles.LMS__form__heading}>
              Leave Management System
            </div>
            
          </div>
          <div>
      {/* <pre>{JSON.stringify(remainingLeave)}</pre> */}
      {
        emp.map((employee)=>{
          if(employee._id===remainingLeave.empId){
            return(
              <div className="container">
              <div className={styles.LMS__info}>
                <div className="left text-align-left">
            {
              employee.gender==="M"?(<h3 className="text-primary" >Mr {employee.firstname} {employee.lastname}</h3>):(<h3 className="text-primary">Ms {employee.firstname} {employee.lastname}</h3>)
            }
            <h6>{employee.designation}</h6>
            </div>
            <div>
            <p className="font-weight-light line-hight-0">Joined on {employee.createdAt.split("T")[0]}</p>
            <p className="font-weight-light line-hight-0">Email:{employee.email}</p>
            </div>
            <div className="right">
            <p className="font-weight-light line-hight-0">Phone:{employee.phone}</p>
            <p className="font-weight-light line-hight-0">Location:{employee.location}</p>
            </div>
              </div>
              
              <div className="leaves">
              <table class="table table-striped table-bordered">
  <thead>
    <tr>
      <th scope="col">SN</th>
      <th scope="col">Leave Type</th>
      <th scope="col">Total Leaves</th>
      <th scope="col">Remaining Leaves</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Casual Leave</td>
      <td>{remainingLeave.causalLeave}</td>
      <td>{remainingLeave.casualLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Sick Leave</td>
      <td>{remainingLeave.sickLeave}</td>
      <td>{remainingLeave.sickLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Earned Leave</td>
      <td>{remainingLeave.earnedLeave}</td>
      <td>{remainingLeave.earnedLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Compensatory Leave</td>
      <td>--</td>
      <td>{remainingLeave.compensatoryLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Special Leave</td>
      <td>{remainingLeave.specialLeave}</td>
      <td>{remainingLeave.specialLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>Maternity Leave</td>
      <td>{remainingLeave.maternityLeave}</td>
      <td>{remainingLeave.maternityLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">7</th>
      <td>Paternity Leave</td>
      <td>{remainingLeave.paternityLeave}</td>
      <td>{remainingLeave.paternityLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">8</th>
      <td>Mourning Leave</td>
      <td>{remainingLeave.mourningLeave}</td>
      <td>{remainingLeave.mourningLeaveDays}</td>
    </tr>
    <tr>
      <th scope="row">9</th>
      <td>Emergency Leave</td>
      <td>{remainingLeave.emergencyLeave}</td>
      <td>{remainingLeave.emergencyLeaveDays}</td>
    </tr>
  </tbody>
</table>
              </div>
              </div>
            )
          }
        })
      }
      </div>     
          <Form className={styles.LMS__form}>
            <div className={styles.LMS__form2}>
              <div>
                <h4 className={styles.LMS__heading}>
                Apply for Leave
                </h4>
                <Row className="mb-2">
                <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik01"
                    className="mt-2"
                  >
                    <Form.Label>Leave</Form.Label>
                    <select
                      className="form-select"
                      name="typeOfLeave"
                      value={empLeave.leave}
                      onChange={updateLeave}>
                      {
                        leaves.map((leave)=>{
                            return(
                            <option selected>{leave}</option>
                            ) 
                        })
                      }
                  <option selected>Open this select menu</option>
                    </select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik01"
                    className="mt-2"
                  >
                    <Form.Label>from</Form.Label>
                    <Form.Control
                      type="date"
                      name="from"
                      value={empLeave.from}
                      onChange={updateLeave}

                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik01"
                    className="mt-2"
                  >
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      name="to"
                      value={empLeave.to}
                      onChange={updateLeave}

                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik01"
                    className="mt-2"
                  >
                    <Form.Label>Reason</Form.Label>
                    <select
                      className="form-select"
                      name="reason"
                      value={empLeave.reason}
                      onChange={updateLeave}>
                      <option selected>Travel</option>
                      <option selected>Fever</option>
                      <option selected>Urgent Work</option>
                      <option selected>Other</option>

                  <option selected>Open this select menu</option>
                    </select>
                  </Form.Group>
                  <Form.Group 
                  as={Col}
                  md="4"
                  controlId="validationFormik01"
                  className="mt-4"
                  >
                   <InputGroup className="mb-4">
                  <InputGroup.Text >Remarks</InputGroup.Text>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    name="remarks" 
                    value={empLeave.remark} 
                    onChange={updateLeave}
                  />
                </InputGroup>
                  </Form.Group>


                </Row>
                <button className="btn btn-primary" onClick={addLeave} style={{
                width:"100px",
                display: "block",
                margin: "auto",
                marginBottom:"0",
                left:"50%",
                textAlign: "center",
              }}>Submit</button>
              </div>
            </div>

          </Form>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
      </div>
        </>
        
    )
}
export default LMS;