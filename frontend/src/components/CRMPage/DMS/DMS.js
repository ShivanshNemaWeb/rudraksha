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
import styles from "./DMS.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";
const DMS=()=>{
    const [data,setData]=useState({
        volName:"",
        volId:"",
        email:"",
        phone:"",
        projectName:"",
        projectHead:"",
        orderId:"",
        donationAmt:"",
        date:"",
        remarks:"",
        empId:"",
    })
    const [volunteers,setVolunteers]=useState([]);
    const [donation,setDonation]=useState([]);
    const [donationStr,setdonationStr]=useState("");
    const upVolunteers=(e)=>{
        volunteers.map((volunteer)=>{
            if(`${volunteer.volName.toLowerCase()}`==e.target.value.toLowerCase()){
              setData({
                ...data,
                volName:e.target.value,
                volId:volunteer._id,
                phone:volunteer.volNumber,
                email:volunteer.volEmail,
                projectName:volunteer.volProjectName,
                projectHead:volunteer.volProjectHead,
                address:volunteer.volAddress,
                empId:volunteer.empId,
              })
            }
          })
    }
 const upData=(e)=>{
    setData({
        ...data,
        [e.target.name]:e.target.value
    })
 }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/nms/allVolunteers`, {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
          }).then((res)=>{
            console.log(res);
        setVolunteers(res.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(async()=>{
     
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/nms/donationTracker`).then((res)=>{
        setDonation(res.data.data);
        console.log(res);
      }).catch((err)=>{
       console.log(err);
      })
     },[]);
    const handleSubmitDMS=(e)=>{
e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/nms/donate`,
        {
           volId:data.volId,
           amt:data.amount,
           donDate:data.date,
           orderId:data.orderId
        },{
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
          }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(async()=>{
      console.log(data.empId);
     await donation.map((donation)=>{
        if(donation.empId==data.empId){
          console.log(donation.target);
          console.log(donation.count);
          setdonationStr(donation.count+"/" +donation.target);
        }
       
       })
     },[data.volName])
    return(<>
    <div className={styles.DMS__main}>
        <div className={styles.DMS__shadow}>
        <div className={styles.DMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.DMS__logo}
            />
            <div className={styles.DMS__form__heading}>
                 Donation Management System (DMS)
            </div>
            
          </div>  
          <Form className={styles.DMS__form}
     onSubmit={handleSubmitDMS}
    >
        <div className={styles.DMS__form2}>
<Row>
<Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>volunteer Name</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="volunteersName"
                    className="mb-3"
                    value={data.volunteersName}
                    onChange={upVolunteers}                      
                    required
                  >
                    <option value="">Choose volunteer Name</option>
                    {
                        volunteers.map((volunteers)=>{
                            return(
                                 <option key={volunteers._id}>{volunteers.volName}</option>
                            )
                        })
                    }
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Donation</Form.Label>
                  <Form.Control
                    type="text"
                    name="donationStr"
                    className="mb-3"
                    value={donationStr}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    className="mb-3"
                    value={data.email}
                    disabled
                  />
                </Form.Group>
</Row>
<Row>
<Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    className="mb-3"
                    value={data.projectName}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Project Head</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectHead"
                    className="mb-3"
                    value={data.projectHead}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    className="mb-3"
                    value={data.address}
                    disabled
                  />
                </Form.Group>
</Row>
<Row>
<Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="donationAmt"
                    className="mb-3"
                    placeholder="Rs."
                    value={data.donationAmt}
                    onChange={upData}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Donation Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="date"
                    className="mb-3"
                    value={data.date}
                    onChange={upData}
                  />
                </Form.Group>
<Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Order Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="orderId"
                    className="mb-3"
                    value={data.orderId}
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
          <Button className="btn btn-primary mb-3" type="submit">Submit</Button>  
        </div>
        </Form>
        </div>
    </div>
    </>)
}
export default DMS; 