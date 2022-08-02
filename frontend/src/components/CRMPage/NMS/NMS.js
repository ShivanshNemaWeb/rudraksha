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
import styles from "./NMS.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";

const NMS=()=>{
  const [profilePic, setprofilePic] = useState("");
  const profileref = useRef();
  
    const [data,setData]=useState({
        empName:"",
        empId:"",
        empDesignation:"",
        empEmail:"",
        volName:"",
        volFather:"",
        volAddress:"",
        volDob:"",
        volEmail:"",
        volunteership:"",
        volStartDate:"",
        volProfession:"",
        volProjectName:"",
        volProjectHead:"",
        remarks:"",
        profilePic:"",
        volNumber:"",
        volBlood:""
    })
    const [emp,setEmp]=useState([]);
    const [network,setNetwork]=useState("");
    const updata=(event)=>{
      
        setData({
            ...data,
            [event.target.name]:event.target.value
        })
    }
    
    useEffect(async()=>{
     await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
        console.log(res);
        setEmp(res.data.data);
     }).catch((err)=>{
        console.log(err);
     })
     await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/nms/countTracker`).then((res)=>{
       setNetwork(res.data.data);
       console.log(res);
     }).catch((err)=>{
      console.log(err);
     })
    },[]);
   const [target,setTarget]=useState("");
   const [count,setCount]=useState("");
   const [networkStr,setnetworkStr]=useState("");
   const [donation,setDonation]=useState("Yes");
   const [isDonate,setIsDonate]=useState(true);
   const [donationAmt,setDonationAmt]=useState(0);
   const [donationDate,setDonationDate]=useState("2022-01-01");

   const upDonationAmt=(e)=>{
    setDonationAmt(e.target.value);
   }
   const upDonationDate=(e)=>{
    setDonationDate(e.target.value);
   }
   useEffect(async()=>{
    console.log(data.empId);
   await network.map((network)=>{
      if(network.empId==data.empId){
        console.log(network.target);
        console.log(network.count);
        setTarget(network.target);
        setCount(network.count);
        setnetworkStr(network.count+"/" +network.target);
      }
      // else{
      //   console.log(" not found ");
      //   setTarget("NOT FOUND");
      //   setCount("NOT FOUND");
      //   setnetworkStr("NOT FOUND")
      // }

      ///////////////////////////
      emp.map((emp)=>{
        if(data.empId===emp._id){
          setData({
            ...data,
            empEmail:emp.email,
            empDesignation:emp.designation
          })
        }
      })
     })
   },[data.empName])
    const upEmpl=(e)=>{
    emp.map((emp)=>{
      if(`${emp.firstname.toLowerCase()}`+" "+`${emp.lastname.toLowerCase()}`==e.target.value.toLowerCase()){
        setData({
          ...data,
          empName:e.target.value,
          empId:emp._id
        })
      }
    })
     
    }
    const handleSubmitNMSForm=(e)=>{
// e.preventDefault();
console.log(data);
console.log(img);
 axios.post(
  `${process.env.REACT_APP_BACKEND_URL}/api/nms/add-NMS-Volunteers`,
  {
    empName:data.empName,
    empId:data.empId,
    volName:data.volName,
    volFather:data.volFather,
    volAddress:data.volAddress,
    volDob:data.volDob,
    volEmail:data.volEmail,
    volunteership:data.volunteership,
    volStartDate:data.volStartDate,
    volProfession:data.volProfession,
    volProjectName:data.volProjectName,
    volProjectHead:data.volProjectHead,
    volBlood:data.volBlood,
    remarks:data.remarks,
    volNumber:data.volNumber,
    isDonor:isDonate,
    donationAmt:donationAmt,
    donationDate:donationDate
    // profilePic:img
  },
  {
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("rudraksha")
      )}`,
    },
  }
);
    }
    const [img,setImg]=useState("");
    const upProfile=(e)=>{
      const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
      setData({
        ...data,
        profilePic:img
      })
    }
    
    const upDonation=(e)=>{
     setDonation(e.target.value);
    }
    
    useEffect(async()=>{
    if(donation==="Yes"){
      setIsDonate(true);
    }
    else if(donation==="No"){
      setIsDonate(false);
    }
    },[donation])
    return(
        <>
         <Navbar bg="light" variant="light">
    <Nav className="me-auto">
      
    <Nav.Link href="/NMS/NMSReport" className="text-primary">
     Reports
    </Nav.Link>
    <Nav.Link href="/NMS/Volunteership" className="text-primary">
     Volunteership
    </Nav.Link>

     </Nav>
    </Navbar>
<div className={styles.NMS__main}>
            <div className={styles.NMS__shadow}>
            <div className={styles.NMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.NMS__logo}
            />
            <div className={styles.NMS__form__heading}>
                 Network Management System (NMS)
            </div>
            
          </div>       
          <Form
          className={styles.NMS__form}
          onSubmit={handleSubmitNMSForm}
        >
          <div className={styles.NMS__form2}>
          <div className={styles.NMS__categories}>
          <h4 className={styles.NMS__heading}>Employee Details</h4>
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
                <Form.Group as={Col} md="1" controlId="validationFormik01">
                  <Form.Label>Network</Form.Label>
                  <Form.Control
                    type="text"
                    name="empNetwork"
                    className="mb-3"
                    value={networkStr}
                    // onChange={updata}     
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik01">
                  <Form.Label>Designation</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="empDesignation"
                    className="mb-3"
                    value={data.empDesignation}
                    onChange={updata}                      
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="empEmail"
                    className="mb-3"
                    value={data.empEmail}
                    onChange={updata}     
                    disabled
                  />
                </Form.Group>
          </Row>
          </div>
            <div className={styles.NMS__categories}>
              <h4 className={styles.NMS__heading}>Volunteer Details</h4>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Volunteer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="volName"
                    value={data.volName}
                    onChange={updata}   
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="volEmail"
                    value={data.volEmail}
                    onChange={updata}   
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="volNumber"
                    value={data.volNumber}
                    onChange={updata}                       
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
               
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>DoB</Form.Label>
                  <Form.Control
                    type="Date"
                    name="volDob"
                    value={data.volDob}
                    onChange={updata}                       
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="volAddress"
                    value={data.volAddress}
                    onChange={updata}                      
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Profession</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="volProfession"
                    value={data.volProfession}
                    onChange={updata}                      
                    required
                  >
                    <option>Choose the Profession</option>
                    <option>Doctor</option>
                    <option>Teacher</option>
                    <option>Admin</option>
                    <option>Pvt Job</option>
                    <option>Defence</option>
                    <option>Trainer</option>
                    <option>Business</option>
                    <option>Student</option>
                    <option>Social Worker</option>
                    <option>Other</option>

                  </Form.Select>
                </Form.Group>
              </Row>
              
              <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Date of Inclusion</Form.Label>
                  <Form.Control
                    type="Date"
                    name="volStartDate"
                    value={data.volStartDate}
                    onChange={updata}                       
                    required
                  />
                </Form.Group><Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Date of Volunteership</Form.Label>
                  <Form.Control
                    type="Date"
                    name="volunteership"
                    value={data.volunteership}
                    onChange={updata}  
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="volProjectName"
                    value={data.volProjectName}
                    onChange={updata}                   
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
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Project Head</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="volProjectHead"
                    value={data.volProjectHead}
                    onChange={updata}                     
                    required
                  >
                    <option>Choose Project Head</option>
                    {
                      data.volProjectName==="YATHA VAYUTPATTI"?(<option>Art, Literature, Religion & Culture</option>
                      ):(data.volProjectName==="RAKTH CHARITA"?(<option>Blood Donation</option>
                      ):(data.volProjectName==="VAGUNAYA"?(<option> Drugs De-Adiction</option>
                      ):(data.volProjectName==="SOOKASHAM RAKSHANAM"?(<option>Environment Armour</option>
                      ):(data.volProjectName==="ARADHNARISHVAR"?(<option>Gender Justice</option>
                      ):(data.volProjectName==="VIKRIT VAIDHARMAYA"?(<option>Gracious Justice</option>
                      ):(data.volProjectName==="ANTEYASHTY SVAAMYAM"?(<option>Human Rights</option>
                      ):(data.volProjectName==="AVASHTAMBH"?(<option>Old Age, Orphanage & Blind Home</option>
                      ):(data.volProjectName==="YOGESHVAR"?(<option>Sports Training Support</option>
                      ):(data.volProjectName==="RUDRASHAKTI"?(<option>True Eternal Warriors</option>
                      ):(data.volProjectName==="AACHARYA"?(<option>Training & Skill Enhancement</option>
                      ):(data.volProjectName==="ADDHYAN"?(<option>True Wisdom Devotees</option>
                      ):(data.volProjectName==="AAROGYA"?(<option>Vigour & Vitality</option>
                      ):(data.volProjectName==="PASHVIK MANGALYA"?(<option>voiceless Souls Protections</option>
                      ):(data.volProjectName==="PRANIKA"?(<option>Women Empowerment</option>
                      ):(<option>Choose Project Head</option>
                      )))))))))))))))
                    }
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="volBlood"
                    value={data.volBlood}
                    onChange={updata}                      
                    required
                  >
                    <option value="">Select the blood group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>

                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="volFather"
                    value={data.volFather}
                    onChange={updata}  
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Donation</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="donation"
                    value={donation}
                    onChange={upDonation}                      
                    required
                  >
                    <option>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>
                {
                  donation==="Yes"?(<>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="donationAmt"
                    placeholder="Rs."
                    value={donationAmt}
                    onChange={upDonationAmt}    
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Donation Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="donationDate"
                    value={donationDate}
                    onChange={upDonationDate}  
                    required
                  />
                </Form.Group>
                
                  </>):(<></>)
                }
              </Row>
            </div>
        
            <div className={styles.NMS__categories}>
              <h4 className={styles.NMS__heading}>Remarks</h4>
              <InputGroup className="mb-4">
                <InputGroup.Text>Remarks</InputGroup.Text>
                <FormControl
                  as="textarea"
                  maxLength={300}
                  aria-label="With textarea"
                  name="remarks"
                  value={data.remarks}
                  onChange={updata}
                />
              </InputGroup>
            </div>
          </div>
          <div className="text-center">
            <Button type="submit" className="btn btn-primary" >Submit</Button>
          </div>
        </Form>

                </div>
            </div>        </>
    )
}
export default NMS;