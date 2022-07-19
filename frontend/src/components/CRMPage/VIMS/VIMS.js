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
import styles from "./VIMS.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";

const VIMS=()=>{
  const [data,setData]=useState({
    firstname:"",
    middlename:"",
    lastname:"",
    fathername:"",
    mothername:"",
    dob:"",
    address:"",
    gender:"",
    role:"",
    emailId:"",
    phoneNo:"",
    startDate:"",
    endDate:"",
    stipend:"",
    panCard:"",
    aadharCard:"",
    projectName:"",
    projectHead:"",
    professionalSector:"",
    educationalStatus:"",
    degree:"",
    remarks:"",
  })
  const updateData=(event)=>{
  setData({
    ...data,
    [event.target.name]:event.target.value
  })
  }
  const handleSubmitVIMSForm=async(e)=>{
    e.preventDefault();
    console.log(data);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ivms/add-to-IVMS`,
      data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("rudraksha")
        )}`,
      },
      }
    ).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }
    return(
        <>
        <Navbar bg="light" variant="light">
    <Nav className="me-auto">
      
    <Nav.Link href="/VIMS/VimsReport" className="text-primary">
     Reports
    </Nav.Link>

     </Nav>
    </Navbar>  
        <div className={styles.VIMS__main}>
            <div className={styles.VIMS__shadow}>
            <div className={styles.VIMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.VIMS__logo}
            />
            <div className={styles.VIMS__form__heading}>
                 Volunteer & Interns Management System
            </div>
            
          </div> 
          <Form
          className={styles.VIMS__form}
          onSubmit={handleSubmitVIMSForm}
        >
          <div className={styles.VIMS__form2}>
            <div className={styles.VIMS__categories}>
              <h4 className={styles.VIMS__heading}>Personal Details</h4>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={data.firstname}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middlename"
                    value={data.middlename}
                    onChange={updateData}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={data.lastname}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="emailId"
                    value={data.emailId}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="phoneNo"
                    value={data.phoneNo}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Dob</Form.Label>
                  <Form.Control
                    type="Date"
                    name="dob"
                    value={data.dob}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>Father name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fathername"
                    value={data.fathername}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik04">
                  <Form.Label>Mother name</Form.Label>
                  <Form.Control
                    type="text"
                    name="mothername"
                    value={data.mothername}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="gender"
                    value={data.gender}
                    onChange={updateData}
                    required
                  >
                    <option value="">Choose the gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="role"
                    value={data.role}
                    onChange={updateData}
                    required
                  >
                    <option value="">Select</option>
                    <option>Intern</option>
                    <option>Volunteer</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="Date"
                    name="startDate"
                    value={data.startDate}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="Date"
                    name="endDate"
                    value={data.endDate}
                    onChange={updateData}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>PAN Card No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="panCard"
                    value={data.panCard}
                    onChange={updateData}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>Adhar Card No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="aadharCard"
                    value={data.aadharCard}
                    onChange={updateData}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>Stipend/Month</Form.Label>
                  <Form.Control
                    type="text"
                    name="stipend"
                    value={data.stipend}
                    onChange={updateData}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="projectName"
                    value={data.projectName}
                    onChange={updateData}
                    required
                  >

                    <option>Choose Project Name</option>
                    <option>YATHA VAYUTPATTI</option>
                    <option>RAKTH CHARITA</option>
                    <option>VAGUNAYA</option>
                    <option>SOOKASHAM RAKSHANAM</option>
                    <option>ARADHNARISHVAR</option>
                    <option>VIKRIT VAIDHARMAYA</option>
                    <option>ANTEYASHTY SVAAMYAM</option>
                    <option>AVASHTAMBH</option>
                    <option>YOGESHVAR</option>
                    <option>RUDRASHAKTI</option>
                    <option>AACHARYA</option>
                    <option>ADDHYAN</option>
                    <option>AAROGYA</option>
                    <option>PASHVIK MANGALYA</option>
                    <option>PRANIKA</option>
                    

                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Project Head</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="projectHead"
                    value={data.projectHead}
                    onChange={updateData}
                    required
                  >
                    <option>Choose Project Head</option>
                    {
                      data.projectName==="YATHA VAYUTPATTI"?(<option>Art, Literature, Religion & Culture</option>
                      ):(data.projectName==="RAKTH CHARITA"?(<option>Blood Donation</option>
                      ):(data.projectName==="VAGUNAYA"?(<option> Drugs De-Adiction</option>
                      ):(data.projectName==="SOOKASHAM RAKSHANAM"?(<option>Environment Armour</option>
                      ):(data.projectName==="ARADHNARISHVAR"?(<option>Gender Justice</option>
                      ):(data.projectName==="VIKRIT VAIDHARMAYA"?(<option>Gracious Justice</option>
                      ):(data.projectName==="ANTEYASHTY SVAAMYAM"?(<option>Human Rights</option>
                      ):(data.projectName==="AVASHTAMBH"?(<option>Old Age, Orphanage & Blind Home</option>
                      ):(data.projectName==="YOGESHVAR"?(<option>Sports Training Support</option>
                      ):(data.projectName==="RUDRASHAKTI"?(<option>True Eternal Warriors</option>
                      ):(data.projectName==="AACHARYA"?(<option>Training & Skill Enhancement</option>
                      ):(data.projectName==="ADDHYAN"?(<option>True Wisdom Devotees</option>
                      ):(data.projectName==="AAROGYA"?(<option>Vigour & Vitality</option>
                      ):(data.projectName==="PASHVIK MANGALYA"?(<option>voiceless Souls Protections</option>
                      ):(data.projectName==="PRANIKA"?(<option>Women Empowerment</option>
                      ):(<option>Choose Project Head</option>
                      )))))))))))))))
                    }

                  </Form.Select>
                </Form.Group>
              </Row>
            </div>
            <div className={styles.VIMS__categories}>
              <h4 className={styles.VIMS__heading}>
                Education Details / Experience
              </h4>
              <Row className="mb-2">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Education Status</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="educationalStatus"
                    value={data.educationalStatus}
                    onChange={updateData}
                    required
                  >
                    <option value="">Select</option>
                    <option>UG</option>
                    <option>PG</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Degree</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="degree"
                    value={data.degree}
                    onChange={updateData}
                    required
                  >
                   <option value="">choose the highest qualification</option>
                    {
                      data.educationalStatus==="UG"?(<>
                   <option>B.Arch</option>
                    <option>B.A</option>
                    <option>B.Tech</option>
                    <option>B.B.A</option>
                    <option>B.C.S</option>
                    <option>B.Ed</option>
                    <option>B.Com</option>
                      </>):(<>
                      <option>MSC/MS</option>
                    <option>MRes</option>
                    <option>MA</option>
                    <option>MPhil</option>
                    <option>MSt</option>
                    <option>MBA</option>
                    <option>M.Tech</option>
                    <option>MPA</option>
                    <option>M.Com</option>
                    <option>MSW</option>
                    <option>MCA</option>
                    <option>MA/MALS/MLS</option>
                    <option>MFA</option>
                    <option>M.Arch</option>
                    <option>MEng</option>
                    <option>MEd</option>
                      </>)
                    }                    
                  </Form.Select>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Professional Sector</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="professionalSector"
                    value={data.professionalSector}
                    onChange={updateData}
                    required
                  >
                    {
                      data.role==="Intern"?(<>
                      <option>Frontend Web Developer</option>
                      <option>Backend Web Developer</option>
                      <option>FullStack Web Developer</option>
                      <option>Graphic Designer</option>
                      <option>Linux Administrator</option>
                      <option>App Developer</option>
                      <option>UI/UX Developer</option>
                      <option>Other</option>
                      </>):(<>
                        <option>Social Worker</option>

                      </>)
                    }
                  </Form.Select>
                </Form.Group>
              </Row>
              
            </div>
        
            <div className={styles.VIMS__categories}>
              <h4 className={styles.VIMS__heading}>Remarks</h4>
              <InputGroup className="mb-4">
                <InputGroup.Text>Remarks</InputGroup.Text>
                <FormControl
                  as="textarea"
                  maxLength={300}
                  aria-label="With textarea"
                  name="remarks"
                    value={data.remarks}
                    onChange={updateData}
                />
              </InputGroup>
            </div>
          </div>
          <div className="text-center">
            <Button type="submit" className="btn btn-primary" >Submit</Button>
          </div>
        </Form>

                </div>
            </div>
            
        </>
    )
}
export default VIMS;