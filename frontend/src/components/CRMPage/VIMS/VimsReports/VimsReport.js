import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import React, { useEffect } from "react";
import { useState } from "react";
// import VendorTypeChart from "../Reports/VendorReport/VendorTypeChart";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./VimsReport.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
// import logo from "../Reports/logo";
import html2canvas from 'html2canvas'
// import {jsPDF} from 'jspdf'
 // Step 2 - Include the react-fusioncharts component
 import ReactFC from "react-fusioncharts";

 // Step 3 - Include the fusioncharts library
 import FusionCharts from "fusioncharts";

 // Step 4 - Include the chart type
 import Column2D from "fusioncharts/fusioncharts.charts";

 // Step 5 - Include the theme as fusion
 import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

 // Step 6 - Adding the chart and theme as dependency to the core fusioncharts
 ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const VimsReport=()=>{
    const [type,setType]=useState("Role");
    const [duration,setDuration]=useState("Quarterly");
    const [monthIndex,setMonthIndex]=useState("");
    const [quarterIndex,setQuarterIndex]=useState("");
    const [roleChart,setRoleChart]=useState({});
    const [psChart,setPsChart]=useState({});
    const [flag,setFlag]=useState(false);
    const [subDuration,setSubDuration]=useState({
        year:"",
        month:"",
        quarter:"",
        monthYear:"",
        quarterYear:"",
    })
  
    const upType=(e)=>{
    setType(e.target.value);
    }

    const upDuration=(e)=>{
        setDuration(e.target.value);
    }

    const upSubDuration=(e)=>{
        setSubDuration({
            ...subDuration,
            [e.target.name]:e.target.value
        })
    }
    
    const roleMonth=()=>{
        if(subDuration.month==="Jan"){
            setMonthIndex(0);
        }
        else if(subDuration.month==="Feb"){
            setMonthIndex(1);
        }
        else if(subDuration.month==="Mar"){
            setMonthIndex(2);
        }
        else if(subDuration.month==="Apr"){
            setMonthIndex(3);
        }
        else if(subDuration.month==="May"){
            setMonthIndex(4);
        }
        else if(subDuration.month==="Jun"){
            setMonthIndex(5);
        }
        else if(subDuration.month==="Jul"){
            setMonthIndex(6);
        }
        else if(subDuration.month==="Aug"){
            setMonthIndex(7);
        }
        else if(subDuration.month==="Sep"){
            setMonthIndex(8);
        }
        else if(subDuration.month==="Oct"){
            setMonthIndex(9);
        }
        else if(subDuration.month==="Nov"){
            setMonthIndex(10);
        }
        else if(subDuration.month==="Dec"){
            setMonthIndex(11);
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-monthly-iv`,
        {
        month:monthIndex,
        year:subDuration.monthYear
        },
        {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
            }).then((res)=>{
              console.log(res);
               setRoleChart(res.data.data)
            }).catch((err)=>{
                console.log(err);
            })
            setFlag(true);
    }

    const psMonth=()=>{
        if(subDuration.month==="Jan"){
            setMonthIndex(0);
        }
        else if(subDuration.month==="Feb"){
            setMonthIndex(1);
        }
        else if(subDuration.month==="Mar"){
            setMonthIndex(2);
        }
        else if(subDuration.month==="Apr"){
            setMonthIndex(3);
        }
        else if(subDuration.month==="May"){
            setMonthIndex(4);
        }
        else if(subDuration.month==="Jun"){
            setMonthIndex(5);
        }
        else if(subDuration.month==="Jul"){
            setMonthIndex(6);
        }
        else if(subDuration.month==="Aug"){
            setMonthIndex(7);
        }
        else if(subDuration.month==="Sep"){
            setMonthIndex(8);
        }
        else if(subDuration.month==="Oct"){
            setMonthIndex(9);
        }
        else if(subDuration.month==="Nov"){
            setMonthIndex(10);
        }
        else if(subDuration.month==="Dec"){
            setMonthIndex(11);
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-monthly-professionalSector`,
        {
        month:monthIndex,
        year:subDuration.monthYear
        },
        {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
            }).then((res)=>{
              console.log(res);
              setPsChart(res.data.data)
            }).catch((err)=>{
                console.log(err);
            })
            setFlag(true);

    }

    const roleQuarter=()=>{
        if(subDuration.quarter==="Jan-Apr"){
            setQuarterIndex(0);
        }
        else if(subDuration.quarter==="May-Aug"){
            setQuarterIndex(1);
        }
        else if(subDuration.quarter==="Sep-Dec"){
            setQuarterIndex(2);
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-quarterly-iv`,
        {
        quarter:quarterIndex,
        year:subDuration.quarterYear
        },
        {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
            }).then((res)=>{
              console.log(res);
              setRoleChart(res.data.data)
            }).catch((err)=>{
                console.log(err);
            })
            setFlag(true);

    }

    const psQuarter=()=>{
        if(subDuration.quarter==="Jan-Apr"){
            setQuarterIndex(0);
        }
        else if(subDuration.quarter==="May-Aug"){
            setQuarterIndex(1);
        }
        else if(subDuration.quarter==="Sep-Dec"){
            setQuarterIndex(2);
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-quarterly-professionalSector`,
        {
        quarter:quarterIndex,
        year:subDuration.quarterYear
        },
        {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
            }).then((res)=>{
              console.log(res);
              setPsChart(res.data.data)
            }).catch((err)=>{
                console.log(err);
            })
            setFlag(true)
    }

    const roleYear=()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-yearly-iv`,
        {
        year:subDuration.year
        },
        {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
            }).then((res)=>{
              console.log(res);
              setRoleChart(res.data.data)
            }).catch((err)=>{
                console.log(err);
            })
            setFlag(true);

    }

    const psYear=()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-yearly-professionalSector`,
        {
        year:subDuration.year
        },
        {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
            }).then((res)=>{
              console.log(res);
              setPsChart(res.data.data)
            }).catch((err)=>{
                console.log(err);
            })
            setFlag(true);

    }

    const downloadReport=()=>{
        const page=document.getElementById("report");
        html2canvas(page).then((Canvas)=>{
            const inputData=Canvas.toDataURL("image/png");
            const pdf=new jsPDF("p","pt","a4");
            pdf.addImage(inputData,"JPEG",-160,0);
            pdf.text("", pdf.internal.pageSize.getWidth()/2, 10, { align: "center" , marginTop:"10%",
        marginLeft:"0px"
    
        })
            pdf.save("Leave Report")
        }) 
    }

    const chartConfigsPs = {
      type: "column2d", // The chart type
      width: "700", // Width of the chart
      height: "500", // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        // Chart Configuration
        chart: {
          caption: "Professional Sector Report",    //Set the chart caption
          subCaption: "Volunteer and interns from different Professional Sector",             //Set the chart subcaption
          xAxisName: "Professional Sector",           //Set the x-axis name
          yAxisName: "No. of Volunteer & Interns",  //Set the y-axis name
          numberSuffix: "",
          theme: "fusion"                 //Set the theme for your chart
        },
        // Chart Data - from step 2
        data: psChart
      }
    };
  
    const chartConfigsRole = {
      type: "pie2d", // The chart type
      width: "700", // Width of the chart
      height: "500", // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        // Chart Configuration
        chart: {
          caption: "Role Report",    //Set the chart caption
          subCaption: "Interns and Volunteers from different Roles",             //Set the chart subcaption
          xAxisName: "Role",           //Set the x-axis name
          yAxisName: "No. of Volunteer & Interns",  //Set the y-axis name
          numberSuffix: "",
          theme: "fusion"                 //Set the theme for your chart
        },
        // Chart Data - from step 2
        data: roleChart
      }
    };
  
    return(<>
    <div className={styles.VimsReport__main}>
        <div className={styles.VimsReport__shadow}>
        <div className={styles.VimsReport__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.VimsReport__logo}
            />
            <div className={styles.VimsReport__form__heading}>
                 Search VIMS Reports 
            </div>
            
          </div> 
          <div className={styles.VimsReport__form}>
            <div className={styles.Vims__form2}>
          <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    className="mb-3"
                    value={type}
                    onChange={upType}
                  >
                    <option value="">Choose the Type</option>
                    <option>Role</option>
                    <option>Professional Sector</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Duration</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    className="mb-3"
                    value={duration}
                    onChange={upDuration}
                  >
                    <option value="">Choose the Duration</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>

                  </Form.Select>
                </Form.Group>
                {
                    duration==="Yearly"?(<>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Enter Year</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="year"
                    value={subDuration.year}
                    onChange={upSubDuration}
                  />
                </Form.Group>
                    </>):(
                    duration==="Monthly"?(<>
                    <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Month</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    className="mb-3"
                    name="month"
                    value={subDuration.month}
                    onChange={upSubDuration}
                  >
                    <option value="">Choose Month</option>
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                    <option>Apr</option>
                    <option>May</option>
                    <option>Jun</option>
                    <option>Jul</option>
                    <option>Aug</option>
                    <option>Sep</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>
                   
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Enter Year</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="monthYear"
                    value={subDuration.monthYear}
                    onChange={upSubDuration}
                  />
                </Form.Group>
                    </>):(duration==="Quarterly"?(<>
                        <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Quarter</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    className="mb-3"
                    name="quarter"
                    value={subDuration.quarter}
                    onChange={upSubDuration}
                  >
                    <option value="">Choose Quarter</option>
                    <option>Jan-Apr</option>
                    <option>May-Aug</option>
                    <option>Sep-Dec</option>

                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Enter Year</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="quarterYear"
                    value={subDuration.quarterYear}
                    onChange={upSubDuration}
                  />
                </Form.Group>
                    </>):(<></>)
                    )
                    )
                }
          </Row>
          <div className="text-center buttons">
            {
                type==="Role"?(
                   duration==="Monthly"?(<Button className="btn btn-primary" onClick={roleMonth}>Get Report</Button>):(
                   duration==="Quarterly"?(<Button className="btn btn-primary" onClick={roleQuarter}>Get Report</Button>):(
                   duration==="Yearly"?(<Button className="btn btn-primary" onClick={roleYear}>Get Report</Button>):(<></>)
                    )
                   )
                ):(type==="Professional Sector"?(
                    duration==="Monthly"?(<Button className="btn btn-primary" onClick={psMonth}>Get Report</Button>):(
                        duration==="Quarterly"?(<Button className="btn btn-primary" onClick={psQuarter}>Get Report</Button>):(
                        duration==="Yearly"?(<Button className="btn btn-primary" onClick={psYear}>Get Report</Button>):(<></>)
                         )
                        )
                ):(<></>))
            }
          </div>
          </div>
          </div>
        </div>
    </div>
<div className={styles.VimsReport__main}>
    <div className={styles.VimsReport__shadow}>
    <div className={styles.VimsReport__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.VimsReport__logo}
            />
            <div className={styles.VimsReport__form__heading}>
                 VIMS Reports
            </div>         
          </div> 
          <div id="report">
            {
                type==="Role"&&flag?(<>
                <div className="text-center d-flex justify-content-center align-item-center" style={{
        flexDirection:"column"
    }} >
    <img
          src="/RWFLOGO.png"
          alt="logo"
          width="90"
          className="text-center mb-0"
    style={{
        marginLeft:"45%"
    }}
        />
        <h4 style={{
    //       display:"inline-block",
    // marginTop:"23px", 
    textDecoration:"underline",
    }}>RUDRAKSHA WELFARE FOUNDATION</h4>
    <ReactFC {...chartConfigsRole} /> 
    </div>
                </>):(type==="Professional Sector"&&flag?(<div className="text-center d-flex justify-content-center align-item-center" style={{
        flexDirection:"column"
    }} >
    <img
          src="/RWFLOGO.png"
          alt="logo"
          width="90"
          className="text-center mb-0"
    style={{
        marginLeft:"45%"
    }}
        />
        <h4 style={{
    //       display:"inline-block",
    // marginTop:"23px", 
    textDecoration:"underline",
    }}>RUDRAKSHA WELFARE FOUNDATION</h4>
    <ReactFC {...chartConfigsPs} /> 

    </div>):(<>
    <h4 className="text-center text-danger">No Reports Found !</h4>
    </>))
            }
          </div>
          {
            flag?(<>
            <div className="text-center">
            <Button className="btn btn-secondary" onClick={downloadReport}>Download</Button>
            </div>
            </>):(<></>)
          }
    </div>
</div>

    </>
    )
}
export default VimsReport