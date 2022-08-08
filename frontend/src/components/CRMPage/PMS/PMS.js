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
import styles from "./PMS.module.css";
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
const PMS=()=>{
    const [emp,setEmp]=useState([]);
    const [data,setData]=useState({
        empName:"",
        empId:""
    })
    const [duration,setDuration]=useState("Yearly")
    const [year,setYear]=useState("");
    const [month,setMonth]=useState("");
    const [quarter,setQuarter]=useState("");
    const [halfYear,setHalfyear]=useState("");
    const [monthIndex,setMonthIndex]=useState("");
    const [quarterIndex,setQuarterIndex]=useState("");
    const [halfYearIndex,setHalfYearIndex]=useState("");
    const [success,setSuccess]=useState(false);
    const [report,setReport]=useState([]);
    const [targetachieve,setTargetAchieve]=useState([]);
    const [grade,setGrade]=useState({});
    useEffect(async()=>{
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
           console.log(res);
           setEmp(res.data.data);
        }).catch((err)=>{
           console.log(err);
        })
        
       },[]);
useEffect(()=>{
console.log(data.empId);
},[data.empName]);
       const upEmpl=(e)=>{
        emp.map((emp)=>{
          if(`${emp.firstname.toLowerCase()}`+" "+`${emp.lastname.toLowerCase()}`==e.target.value.toLowerCase()){
            setData({
              empName:e.target.value,
              empId:emp._id
            })
          }
        })
        }
     const upDuration=(e)=>{
        setDuration(e.target.value);
     }
     const upYear=(e)=>{
        setYear(e.target.value);
     }
     const upMonth=(e)=>{
         setMonth(e.target.value);
     }
     const upQuarter=(e)=>{
        setQuarter(e.target.value);
     }
     const upHalfyear=(e)=>{
        setHalfyear(e.target.value);
     }

     useEffect(()=>{
        if(month==="Jan"){
            setMonthIndex(0);
        }
        else if(month==="Feb"){
            setMonthIndex(1);
        }
        else if(month==="Mar"){
            setMonthIndex(2);
        }
        else if(month==="Apr"){
            setMonthIndex(3);
        }
        else if(month==="May"){
            setMonthIndex(4);
        }
        else if(month==="Jun"){
            setMonthIndex(5);
        }
        else if(month==="Jul"){
            setMonthIndex(6);
        }
        else if(month==="Aug"){
            setMonthIndex(7);
        }
        else if(month==="Sep"){
            setMonthIndex(8);
        }
        else if(month==="Oct"){
            setMonthIndex(9);
        }
        else if(month==="Nov"){
            setMonthIndex(10);
        }
        else if(month==="Dec"){
            setMonthIndex(11);
        }
     },[month]);

     useEffect(()=>{
        if(quarter==="Jan-Mar"){
            setQuarterIndex(0);
        }
        else if(quarter==="Apr-Jun"){
            setQuarterIndex(1);
        }
        else if(quarter==="Jul-Sep"){
            setQuarterIndex(2);
        }
        else if(quarter==="Oct-Dec"){
          setQuarterIndex(3);
      }
     },[quarter])

     useEffect(()=>{
if(halfYear==="Jan-Jun"){
    setHalfYearIndex(0);
}
else if(halfYear==="Jul-Dec"){
    setHalfYearIndex(1);
}
     },[halfYear]);
     const getData=()=>{
        if(duration==="Monthly"){
            console.log(monthIndex);
            console.log(year);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/pms-monthly`,{
              empId:data.empId,
              month:monthIndex,
              year:year
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("rudraksha")
                )}`,
              },
              }
            ).then((res)=>{
              console.log(res);
              setSuccess(res.data.success);
              setReport(res.data.data.graphical);
              setTargetAchieve(res.data.data.target_achieved);
              setGrade(res.data.data.grades);
            }).catch((err)=>{
              console.log(err);
            })
        }
        else if(duration==="Quarterly"){
            console.log(quarterIndex);
            console.log(year);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/pms-quarterly`,{
              empId:data.empId,
              quarter:quarterIndex,
              year:year
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("rudraksha")
                )}`,
              },
              }
            ).then((res)=>{
              console.log(res);
              setSuccess(res.data.success);
              setReport(res.data.data.graphical)
              setTargetAchieve(res.data.data.target_achieved);
              setGrade(res.data.data.grades);
            }).catch((err)=>{
              console.log(err);
            })
        }
        else if(duration==="Half Yearly"){
            console.log(halfYearIndex);
            console.log(year);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/pms-halfYearly`,{
              empId:data.empId,
              half:halfYearIndex,
              year:year
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("rudraksha")
                )}`,
              },
              }
            ).then((res)=>{
              console.log(res);
              setSuccess(res.data.success);
              setReport(res.data.data.graphical)
              setTargetAchieve(res.data.data.target_achieved);
              setGrade(res.data.data.grades);
            }).catch((err)=>{
              console.log(err);
            })
        }
        else if(duration==="Yearly"){
            console.log(year);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/pms-yearly`,{
              empId:data.empId,
              year:year
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("rudraksha")
                )}`,
              },
              }
            ).then((res)=>{
              console.log(res);
              setSuccess(res.data.success);
              setReport(res.data.data.graphical)
              setTargetAchieve(res.data.data.target_achieved);
              setGrade(res.data.data.grades);
            }).catch((err)=>{
              console.log(err);
            })
        }
     }

     const chartConfigs = {
      type: "column2d", // The chart type
      width: "700", // Width of the chart
      height: "500", // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        // Chart Configuration
        chart: {
          caption: "Employee Performance Report",    //Set the chart caption
          subCaption: "Performance of a Employee with different perameters",             //Set the chart subcaption
          xAxisName: "Perameters",           //Set the x-axis name
          yAxisName: "Performance of Employee",  //Set the y-axis name
          numberSuffix: "%",
          theme: "fusion"                 //Set the theme for your chart
        },
        // Chart Data - from step 2
        data: report
      }
    };

    const downloadReport=()=>{
      const page=document.getElementById("graph");

      html2canvas(page).then((Canvas)=>{
          const inputData=Canvas.toDataURL("image/png");

          const pdf=new jsPDF("p","pt","a4");
          pdf.addImage(inputData,"JPEG",-10,0,600,-120,undefined,false);
          pdf.text("", pdf.internal.pageSize.getWidth()/2, 10, { align: "center" , marginTop:"10%",
      marginLeft:"0px"
  
      })
          pdf.save("Performance Report")
      }) 
  }
  
  const downloadReportVol=()=>{
    const page=document.getElementById("list");

      html2canvas(page).then((Canvas)=>{
          const inputData=Canvas.toDataURL("image/png");

          const pdf=new jsPDF("p","pt","a4");
          pdf.addImage(inputData,"JPEG",-10,0,600,-120,undefined,false);
          pdf.text("", pdf.internal.pageSize.getWidth()/2, 10, { align: "center" , marginTop:"10%",
      marginLeft:"0px"
  
      })
          pdf.save("network Volunteer report")
      }) 
  }
    return(<>
<div className={styles.PMS__main}>
        <div className={styles.PMS__shadow}>
        <div className={styles.PMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.PMS__logo}
            />
            <div className={styles.PMS__form__heading}>
                 Search PMS Reports 
            </div>
            
          </div> 
          <div className={styles.PMS__form}>
            <div className={styles.Vims__form2}>
          <Row id="domy">
          <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="empName"
                    value={data.empName}
                    onChange={upEmpl}
                    className="mb-3"                      
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
                  <Form.Label>Duration </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="duration"
                    value={duration}
                    onChange={upDuration}
                    className="mb-3"                      
                    required
                  >
                    <option value="">Choose Duration</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Half Yearly</option>
                    <option>Yearly</option>

                  </Form.Select>
                </Form.Group>
{
    duration==="Yearly"?(<>
    <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Enter Year</Form.Label>
                  <Form.Control
                    type="number"  
                    name="year"
                    value={year}
                    onChange={upYear}
                  />
                </Form.Group>
    </>):(duration==="Monthly"?(<>
        <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Select Month </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="month"
                    value={month}
                    onChange={upMonth}
                    className="mb-3"                      
                    required
                  >
                <option>Choose Month</option>
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
                    type="number"  
                    name="year"
                    value={year}
                    onChange={upYear}
                  />
                </Form.Group>
    </>):(duration==="Quarterly"?(<>
        <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Select Quarter </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="quarter"
                    value={quarter}
                    onChange={upQuarter}
                    className="mb-3"                      
                    required
                  >
                <option>Choose Quarter</option>
                    <option>Jan-Mar</option>
                    <option>Apr-Jun</option>
                    <option>Jul-Sep</option>
                    <option>Oct-Dec</option>

                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Enter Year</Form.Label>
                  <Form.Control
                    type="number"  
                    name="year"
                    value={year}
                    onChange={upYear}
                  />
                </Form.Group>
    </>):(duration==="Half Yearly"?(<>
        <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Select </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="halfYear"
                    value={halfYear}
                    onChange={upHalfyear}
                    className="mb-3"                      
                    required
                  >
                <option>Choose</option>
                    <option>Jan-Jun</option>
                    <option>Jul-Dec</option>
                   
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Enter Year</Form.Label>
                  <Form.Control
                    type="number"  
                    name="year"
                    value={year}
                    onChange={upYear}
                  />
                </Form.Group>
    </>):(<></>))))
}
          </Row>
          <div className="text-center">
          <Button className="btn btn-primary mb-3" onClick={getData}>Get Report</Button>
          </div>
          </div>
          </div>
        </div>
    </div>  
    
    <div className={styles.PMS__main}>
      <div className={styles.PMS__shadow}>
      <div className={styles.PMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.PMS__logo}
            />
            <div className={styles.PMS__form__heading}>
                  PMS Reports 
            </div>
            
          </div> 
          <div id="report">
            <div>
              {
                success?(<>
                 {
                  emp.map((emp)=>{
                    return(
                    emp._id===data.empId?(<>
                     <div className={styles.PMS__form}>
            <div className={styles.Vims__form2}>
              <div id="graph">
            <div className="text-center d-flex justify-content-center align-item-center mb-4" style={{
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
    textDecoration:"underline",
    }}>RUDRAKSHA WELFARE FOUNDATION</h4>
    </div>
              <Row>
                   <div style={
                    {
                      display:"flex",
                      justifyContent:"space-between",
                      flexDirection:"row",
                    }
                   }>
                    
                    <h3 className="text-primary ml-5">{emp.firstname} {emp.lastname}</h3>
                <p className="font-weight-light">Phone : {emp.phone}</p>
                    <p className="font-weight-light mr-5">Email : {emp.email}</p>
                   </div>
                   </Row>
                   <Row>
                   <div style={
                    {
                      display:"flex",
                      justifyContent:"space-between",
                      flexDirection:"row",
                      
                    }
                   }>
                    <p className="ml-5 mt-2">{emp.designation}</p>
                    <p className="font-weight-light ml-5">Branch : {emp.branch}</p>
                    <p className="mr-5"> Joined On : {emp.createdAt.split("T")[0]}</p>

                   </div>

                   </Row>
                   <Row className="mt-5">
                    <div className="text-center">
                    <ReactFC {...chartConfigs} /> 
                    </div>
                    
                   </Row>
                   <Row>
                   <div className={styles.PMS__form}>
            <div className={styles.Vims__form2}>
                    <div className="tableReport">
                    <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Perameter</th>
      <th scope="col">Target</th>
      <th scope="col">Achieved</th>
      <th scope="col">Grades</th>
    </tr>
  </thead>
  <tbody>
   {
    targetachieve.map((table,index)=>{
        return(
        <tr key={index}>
            <th scope="row">{table.label}</th>
            {
                table.label=="Behaviour"?(<>
                <td>--</td>
                <td>{table.count}</td>
                </>):(<>
                    <td>{table.target}</td>
            <td>{table.achieved}</td>
                </>)
            }
           {
            table.label=="Network"?(<>
            <td>{grade.NMS_COUNT_P}</td>
            </>):(table.label=="Behaviour"?(<>
            <td>{grade.MEMO}</td>
            </>):(table.label=="FMCG Sales"?(<>
            <td>{grade.FNCG_P}</td>
            </>):(table.label=="Digital Sales"?(<>
            <td>{grade.DIG_P}</td>
            </>):(table.label=="Donation"?(<>
            <td>{grade.DONATION_P}</td>
            </>):(<></>)))))
           }
        </tr>
        )
    })
   }
   
  </tbody>
</table>
                    </div>
                    </div>
                    </div>
                   </Row>
                  </div>
                  {
      success?(<>
      <div className="text-center">
      
      <Button className="btn btn-secondary" onClick={downloadReport}>Download</Button>
      </div>
      </>):(<></>)
    }
                    </div>
                    </div>
                    </>):(<></>)
                    )
                  })
                
                 }
                </>):(<>
                <div className="text-center">
                  <h4 className="text-danger">No Reports found !</h4>
                </div>
                </>)
              }
            </div>
          </div>
      </div>
    </div>
   
      </>)
}
export default PMS;