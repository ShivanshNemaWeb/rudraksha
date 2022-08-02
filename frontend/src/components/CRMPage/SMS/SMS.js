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
import styles from "./SMS.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";
const SMS=()=>{
    const [data,setData]=useState({
        empName:"",
        empId:"",
        designation:"",
        email:"",
        phone:"",
        joined:"",
        branch:"",
        type:"",
        amount:"",
        date:"",
        remarks:"",
    })
    
    const [emp,setEmp]=useState([]);
    const upData=(e)=>{
setData({
    ...data,
    [e.target.name]:e.target.value
})
    }
    useEffect(async()=>{
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
           console.log(res);
           setEmp(res.data.data);
        }).catch((err)=>{
           console.log(err);
        })  
       },[]);
    const upEmpl=(e)=>{
        emp.map((emp)=>{
            if(`${emp.firstname.toLowerCase()}`+" "+`${emp.lastname.toLowerCase()}`==e.target.value.toLowerCase()){
              setData({
                ...data,
                empName:e.target.value,
                empId:emp._id,
                joined:emp.createdAt.split("T")[0],
                phone:emp.phone,
                designation:emp.designation,
                email:emp.email,
                branch:emp.branch
              })
            }
          })
    }

    const handleSubmitSMS=()=>{
        axios.post('',
        {
           empId:data.empId,
           amount:data.amount,
           type:data.type,
           date:data.date,
           remarks:data.remarks
        },).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(<>
    <div className={styles.SMS__main}>
        <div className={styles.SMS__shadow}>
        <div className={styles.SMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.SMS__logo}
            />
            <div className={styles.SMS__form__heading}>
                 Sales Management System (SMS)
            </div>           
          </div> 
    <Form className={styles.SMS__form}
     onSubmit={handleSubmitSMS}
    >
        <div className={styles.SMS__form2}>
        <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="empName"
                    className="mb-3"
                    value={data.empName}
                    onChange={upEmpl}                      
                    required
                  >
                    <option value="">Choose Employee Name</option>
                    {
                        emp.map((employee)=>{
                            return(
                                 <option key={employee._id}>{employee.firstname} {employee.lastname}</option>
                            )
                        })
                    }
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Designation</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="designation"
                    className="mb-3"
                    value={data.designation}
                    disabled
                  >
                   <option value="">Select the employee designation</option>
                    <option>Promoter</option>
                    <option>Managing Director</option>
                    <option>Director</option>
                    <option>Branch Manager</option>
                    <option>Zonal Head</option>
                    <option>Regional Head</option>
                    <option>Cluster Head</option>
                    <option>Branch Head</option>
                    <option>Operations Manager</option>
                    <option>Admin Manager</option>
                    <option>HR Manager</option>
                    <option>Sales Manager</option>
                    <option>Relationship Manager</option>
                    <option>Help Staff</option>
                    <option>Guard</option>
                    <option>Interns/Volunteer</option>
                    <option>Receptionist</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Joined On</Form.Label>
                  <Form.Control
                    type="Date"
                    name="joined"
                    className="mb-3"
                    value={data.joined}
                    disabled
                  />
                </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className="mb-3"
                    value={data.email}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    className="mb-3"
                    value={data.phone}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Branch</Form.Label>
                  <Form.Control
                    type="text"
                    name="branch"
                    className="mb-3"
                    value={data.branch}
                    disabled
                  />
                </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Sales Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="type"
                    className="mb-3"
                    value={data.type}
                    onChange={upData}
                  >
                   <option value="">Select Sales Type</option>
                    <option>FNCG</option>
                    <option>Digital</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    name="amount"
                    className="mb-3"
                    placeholder="Rs."
                    value={data.amount}
                    onChange={upData}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Sales Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="date"
                    className="mb-3"
                    value={data.date}
                    onChange={upData}
                  />
                </Form.Group>
                </Row>
                <Row>
                <InputGroup className="mb-4">
                <InputGroup.Text>Remarks</InputGroup.Text>
                <FormControl
                  as="textarea"
                  maxLength={300}
                  aria-label="With textarea"
                  name="remarks"
                  value={data.remarks}
                  onChange={upData}
                />
              </InputGroup>
                </Row>
        </div>
        <div className="text-center">
            <Button type="submit" className="btn btn-primary mb-3">Submit</Button>   
        </div>
    </Form>

        </div>
    </div>
    </>)
}
export default SMS; 