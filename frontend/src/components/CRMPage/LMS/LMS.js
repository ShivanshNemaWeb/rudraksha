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
    const leaves=["Casual leave","Sick leave","Earned leave","Special leave",
    "Maternity leave","Paternity leave","Mourning leave","Emergency leave"];
    const [empLeave,setEmpLeave]=useState({
        typeOfLeave:"",
        to:"",
        from:"",
        remarks:"",
        reason:""
    });
    const [compensatory,setComp]=useState({
      from:"",
      to:"",
      workFrom:"",
      workTo:"",
      remarks:""
    })

    const [errorMessage,setErrMessage]=useState("");
    const[remainingLeave,setRemainingLeave]=useState({});
    const[emp,setEmp]=useState([]);
    const[err,setErr]=useState("");
    const [count,setCount]=useState("");
    const upCompLeave=(e)=>{
    setComp({
      ...compensatory,
[e.target.name]:e.target.value
    });
    }
    const updateLeave=(event)=>{
    setEmpLeave({
        ...empLeave,
        [event.target.name]:event.target.value
    });
    }

    const addLeave=async(e)=>{
        e.preventDefault();

        console.log(empLeave);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/lms/addLeaveApplication_new`,
{
typeOfLeave : empLeave.typeOfLeave.charAt(0).toLowerCase()+empLeave.typeOfLeave.slice(1).toLowerCase(),
from:empLeave.from,
to: empLeave.to,
remarks:empLeave.remarks,
// reason:empLeave.reason
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
    setErr(res.data.success);
    console.log(res);
}).catch((err)=>{
  console.log(err)
    setErrMessage(err.error.message);
})
    }

    const addComp=async(e)=>{
      e.preventDefault();

      console.log(compensatory);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/lms/addLeaveApplication_new`,
{
from:compensatory.from,
to:compensatory.to,
workFrom:compensatory.workFrom,
workTo:compensatory.workTo,
remarks:compensatory.remarks,
typeOfLeave: "compensatory leave"
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
  setErr(res.data.success);
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
  console.log(res.data);
  setCount(res.data.success);
  setRemainingLeave(res);
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

    <Nav.Link href="/LMS/leaveReport" className="text-primary">
     Reports
    </Nav.Link>

     </Nav>
    </Navbar>  
   
                
    <div>
        <div>
          
          <div>
             {
           count?(emp.map((employee)=>{
              if(employee._id===remainingLeave.data.emp.empId){
                return(
          
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
                  <div className={styles.LMS__info}>
                    <div className="left text-align-left">
                {
                  employee.gender==="M"?(<h3 className="text-primary" >Mr {employee.firstname.charAt(0).toUpperCase() + employee.firstname.slice(1).toLowerCase()} {employee.lastname.charAt(0).toUpperCase() + employee.lastname.slice(1).toLowerCase()}</h3>):(<h3 className="text-primary">Ms {employee.firstname} {employee.lastname}</h3>)
                }
                <h6>{employee.designation}</h6>
                </div>
                <div>
                <p className="font-weight-light line-hight-0">Joined on {employee.createdAt.split("T")[0]}</p>
                <p className="font-weight-light line-hight-0">Email:{employee.email}</p>
                </div>
                <div className="right">
                <p className="font-weight-light line-hight-0">Phone:{employee.phone}</p>
                <p className="font-weight-light line-hight-0">Location:{employee.location.charAt(0).toUpperCase() + employee.location.slice(1).toLowerCase()}</p>
                </div>
                  </div>
                  
                  <div className="leaves">
                  <table class="table table-striped table-bordered " style={{
                    width:"85%",
                    marginLeft:"7%"
                  }}>
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
          <td>{remainingLeave.data.data.maxEmpLeaves.T_CASUAL_LEAVES}</td>
          <td>{remainingLeave.data.data.remainingLeaves.CASUAL_LEAVES}</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Sick Leave</td>
          <td>{remainingLeave.data.data.maxEmpLeaves.T_SICK_LEAVE}</td>
          <td>{remainingLeave.data.data.remainingLeaves.SICK_LEAVE}</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Earned Leave</td>
          <td>{remainingLeave.data.data.maxEmpLeaves.T_EARNED_LEAVE}</td>
          <td>{remainingLeave.data.data.remainingLeaves.EARNED_LEAVE}</td>
        </tr>
        
        <tr>
          <th scope="row">4</th>
          <td>Special Leave</td>
          <td>{remainingLeave.data.data.maxEmpLeaves.T_SPL_LEAVE}</td>
          <td>{remainingLeave.data.data.remainingLeaves.SPL_LEAVE}</td>
        </tr>
        <tr>
          <th scope="row">5</th>
          <td>Maternity Leave</td>
          <td>{remainingLeave.data.data.maxEmpLeaves.T_MATERNITY_LEAVE}</td>
          <td>{remainingLeave.data.data.remainingLeaves.MATERNITY_LEAVE}</td>
        </tr>
        <tr>
          <th scope="row">6</th>
          <td>Paternity Leave</td>
          <td>{remainingLeave.data.data.maxEmpLeaves.T_PATERNITY_LEAVE}</td>
          <td>{remainingLeave.data.data.remainingLeaves.PATERNITY_LEAVE}</td>
        </tr>
        <tr>
          <th scope="row">7</th>
          <td>Mourning Leave</td>
          <td>{remainingLeave.data.data.maxEmpLeaves.T_MOURN_LEAVE}</td>
          <td>{remainingLeave.data.data.remainingLeaves.MOURN_LEAVE}</td>
        </tr>
        <tr>
          <th scope="row">8</th>
          <td>Emergency Leave</td>
          <td>{remainingLeave.data.data.maxEmpLeaves.T_EMG_LEAVE}</td>
          <td>{remainingLeave.data.data.remainingLeaves.EMG_LEAVE}</td>
        </tr>
      </tbody>
    </table>
    {/* <p className="text-success">
      * Total Leaves = Total number of possible leaves that can be given to an employee per year.
    </p>
    <p className="text-success">
      * Remaining Leaves = Total number of leaves which employee has currently available.
    </p> */}
<div className="text-center mb-5">
  <div className={styles.LMS__shadow}>
    <p className="text-danger text-center p-2">NOTE - Compensatory Leave is allowed for employees in case they had worked on Sundays or any Gazette Holiday. 
    </p>
    </div>
   </div>
            </div>
            </div>
                  </div>
                  
                )
              }
            })):(<div></div>)
          }
     
      </div>  
        </div>
      </div>
      

      <div className={styles.LMS__main}>
      <div className={styles.LMS__shadow} style={{
            width: "80vw"
      }}>
      <div className={styles.LMS__head} style={{
            width: "80vw"

      }}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.LMS__logo}
            />
            <div className={styles.LMS__form__heading}>
              Apply for Leave
            </div>
          </div>
          <Form className={styles.LMS__form}>
            <div className={styles.LMS__form2}>
              <div>

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

                  <option selected >Open this select menu</option>
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
                  md="8"
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
                <div 
                style={{
                  // margin:"auto",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center"
                }}>
                {
                  err?(<button className="btn btn-success" onClick={addLeave} style={{
                    width:"100px",
                    display: "block",
                    margin: "20px",
                    marginBottom:"0",
                    left:"50%",
                    textAlign: "center",
                  }}>Submitd</button>):(err===false?(<button className="btn btn-danger" 
                  onClick={addLeave} style={{
                    width:"100px",
                    display: "block",
                    margin: "20px",
                    marginBottom:"0",
                    left:"50%",
                    textAlign: "center",
                  }}>can't submit</button>):(<button className="btn btn-primary" onClick={addLeave} style={{
                    width:"100px",
                    display: "block",
                    margin: "20px",
                    marginBottom:"0",
                    left:"50%",
                    textAlign: "center",
                  }}>Submit</button>))
                }
<button type="button" className="btn btn-outline-primary text-dark" data-toggle="modal" data-target="#exampleModalCenter"
style={{
  // width:"100px",
  display: "block",
  margin: "20px",
  marginBottom:"0",
  left:"50%",
  textAlign: "center",
  marginTop:"20px"
}}
>
  Apply CMP Leave
</button>
</div>
              <p className="text-danger" style={{
                margin:"auto",
                textAlign:"center",
                marginTop:"30px",
                fontStyle: "italic"
              }}>" Leave is not a right, it's a request "</p>
              </div>
            </div>

          </Form>
        
{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button> */}


<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header" style={{
        background:"linear-gradient(90deg, #5384a5 10%, #45a3b8 100%)"
      }}>
        <h5 className="modal-title text-danger" id="exampleModalLongTitle">Apply Compensatory Leave</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body bg-light">
      <Form>
            <div>
              <div className={styles.LMS__model}>
              <p className="text-primary">( Leave Dates )</p>
                <div className={styles.LMS__modelForm}>
                  <Form.Group
                    controlId="validationFormik01"
                    className="mt-2 mr-5"
                  >
                    <Form.Label>from</Form.Label>
                    <Form.Control
                      type="date"
                      name="from"
                      value={compensatory.from}
                      onChange={upCompLeave}

                    />
                  </Form.Group>
                  <Form.Group
                    controlId="validationFormik01"
                    className="mt-2"
                  >
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      name="to"
                      value={compensatory.to}
                      onChange={upCompLeave}
  
                    />
                  </Form.Group>
                  </div>
                  <p className="mb-0 mt-5 text-primary">( Working dates )</p>

                  <div className={styles.LMS__modelForm}>
                  <Form.Group
                    controlId="validationFormik01"
                    className="mt-2 mr-5"
                  >
                    <Form.Label>from</Form.Label>
                    <Form.Control
                      type="date"
                      name="workFrom"
                      value={compensatory.workFrom}
                      onChange={upCompLeave}

                    />
                  </Form.Group>
                  <Form.Group
                    controlId="validationFormik01"
                    className="mt-2"
                  >
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      name="workTo"
                      value={compensatory.workTo}
                      onChange={upCompLeave}

                    />
                  </Form.Group>
                  </div>
                  <div>
                  <Form.Group
                  md="9"
                  controlId="validationFormik01"
                  className="mt-4"
                  style={{
                    width:"380px"
                  }}
                  >
                   <InputGroup className="mb-4">
                  <InputGroup.Text >Remarks</InputGroup.Text>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    name="remarks" 
                    value={compensatory.remarks} 
                    onChange={upCompLeave}
                  />
                </InputGroup>
                  </Form.Group>
                  </div>
                    </div>
            
            </div>
          </Form>   
             </div>
      <div className="modal-footer d-flex justify-content-center">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        {
                  err?(<button className="btn btn-success" onClick={addComp}>Submitd</button>):(err===false?(<button className="btn btn-danger" 
                  onClick={addComp}>can't submit</button>):(<button className="btn btn-primary" onClick={addComp} >Submit</button>))
                }
             
      </div>
    </div>
  </div>
</div>
<p className="text-denger">{errorMessage}</p>
      </div>
      </div>
        </>
        
    )
}
export default LMS;
















