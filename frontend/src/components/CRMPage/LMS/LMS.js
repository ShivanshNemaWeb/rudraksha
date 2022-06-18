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

const LMS=()=>{
    const leaves=["casual leave","sick leave","earned leave",
    "compensatory leave / weekly leave","special leave",
    "maternity leave","paternity leave","mourning leave","emergency leave"];
    const [empLeave,setEmpLeave]=useState({
        typeOfLeave:"",
        to:"",
        from:"",
        remarks:""
    });
    const [errorMessage,setErrMessage]=useState("");
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
remarks:empLeave.remarks
}, 
{
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("rudraksha")
      )}`,
    },
  }
).then((res)=>{
    setErrMessage(res.data.message)
    console.log(res);
}).catch((err)=>{
    setErrMessage(err.data.message);
})
    }
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

          <Form className={styles.LMS__form}>
            <div className={styles.LMS__form2}>
              <div>
                <h4 className={styles.LMS__heading}>
                Apply for leave
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
                    <Form.Label>From</Form.Label>
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
                  <button className="btn btn-primary" onClick={addLeave} style={{
                
                margin: "auto",
                textAlign: "center",
              }}>Submit</button>

                </Row>
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