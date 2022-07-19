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
import styles from "./LeaveReport.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
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
const LeaveReport=()=>{
    const [name,setName]=useState("");
    const [type,setType]=useState("Employee Name");
    const getName=(event)=>{
    setName(event.target.value);
    }
    const [flag,setFlag]=useState(false);
    const [employee,setEmp]=useState([]);
    const [chart,setChart]=useState([]);
    const [id,setId]=useState("");
    const [nothing,setNothing]=useState("");
    const [duration,setDuration]=useState("Fortnightly");
    const month=[
      {
      month:"Jan",
      value:0
    },
    {
      month:"Feb",
      value:1
    },
    {
      month:"mar",
      value:2
    },
    {
      month:"Apr",
      value:3
    },
    {
      month:"May",
      value:4
    },
    {
      month:"Jun",
      value:5
    },
    {
      month:"Jul",
      value:6
    },
    {
      month:"Aug",
      value:7
    },
    {
      month:"Sep",
      value:8
    },
    {
      month:"Oct",
      value:9
    },
    {
      month:"Nov",
      value:10
    },
    {
      month:"Dec",
      value:12
    },

  ]
  const session=[
    {
      session:"Jan-Apr",
      value:0
    },
    {
      session:"May-Aug",
      value:1
    },
    {
      session:"Sep-Dec",
      value:2
    }
  ]
  const [monthIndex,setMonthIndex]=useState("");
  const [monthName,setMonthName]=useState("");
  const[durationName,setDuName]=useState("")
const getChart=async()=>{
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
        console.log(res);
            setEmp(res.data.data);
           }).catch((err)=>{
            console.log(err);
           })
employee.map((empl)=>{
  empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/report-leaves-employee`,
   {
   empId:id,
   year:year
   },
   {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("rudraksha")
      )}`,
    },
    })
   .then((res)=>{
    setChart(res.data.data);
    console.log(res);
    setFlag(res.data.success);
   }).catch((err)=>{
    console.log(err);
   })
}
const download=(id)=>{
    const page=document.getElementById(id);
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


const searchType=(event)=>{
setType(event.target.value);
}
const getChartDesignation=()=>{
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-designation-employee`,
  {
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("rudraksha")
    )}`,
  }}).then((res)=>{
    setChart(res.data.data);
    setFlag(res.data.success);
  }).catch((err)=>{
    console.log(err);
  })
}

const getChartGender=()=>{
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-gender-employee`,
  {
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("rudraksha")
    )}`,
  }}).then((res)=>{
    setChart(res.data.data);
    setFlag(res.data.success);
  }).catch((err)=>{
    console.log(err);
  })
}
const setDu=(e)=>{
  console.log(e.target.value);
  setDuration(e.target.value);
}
const setMonthIn=(event)=>{
  setMonthName(event.target.value)
  month.map((month)=>{
    if(month.month==event.target.value){
      setMonthIndex(month.value)
    }
  })
}
const [durationIndex,setDuIndex]=useState("");
const setDurationName=(e)=>{
  setDuName(e.target.value);
session.map((session)=>{
  if(session.session===e.target.value){
    setDuIndex(session.value);
  }
})

}

const getChartMonthly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-employee-monthly`,
{
month:monthIndex,
empId:id
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}
const getChartQuarterly= async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-employee-quarterly`,
{
quarter:durationIndex,
empId:id
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}

const getChartAllYearly= async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-yearly-allEmployees`,
{
year:year
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}

const getChartAllMonthly= async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-monthly-allEmployees`,
{
month:monthIndex
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}
const getChartAllQuarterly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-quarterly-allEmployees`,
{
quarter:durationIndex
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}

const getChartAllHalfYearly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports//reports-halfYearly-allEmployees`,
{
half:halfYearIndex
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}
const [halfYear,setHalfYearVar]=useState("");
const [halfYearIndex,setHalfYearIndex] = useState("");
const setHalfYear=(e)=>{
  setHalfYearVar(e.target.value);
  if(halfYear=="Jan-Jun"){
    setHalfYearIndex(0);
  }
  else{
    setHalfYearIndex(1);

  }
}
const getChartHalfYearly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-employee-halfYearly`,
{
empId:id,
half:halfYearIndex
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}
const getChartWeekly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-employee-weekly`,
{
empId:id,
start:weekDate
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}

const getChartFortnightly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-employee-14`,
{
empId:id,
start:fortnightDate
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}

const getChartAllWeekly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-weekly-allEmployees`,
{
start:weekDate
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}

const getChartAllFortnightly=async()=>{
  await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`).then((res)=>{
    console.log(res);
        setEmp(res.data.data);
       }).catch((err)=>{
        console.log(err);
       })
employee.map((empl)=>{
empl.firstname.toLowerCase()+" "+empl.lastname.toLowerCase()===name.toLowerCase()?(setId(empl._id)):(setNothing(empl._id))
})
console.log(id);
await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/reports/reports-14-allEmployees`,
{
start:fortnightDate
},
{
headers: {
  Authorization: `Bearer ${JSON.parse(
    localStorage.getItem("rudraksha")
  )}`,
},
})
.then((res)=>{
setChart(res.data.data);
console.log(res);
setFlag(res.data.success);
}).catch((err)=>{
console.log(err);
})
}
const[weekDate,setWeekDate]=useState("");
const[fortnightDate,setFortnightDate]=useState("");
const [year,setYear]=useState("");
const upWeekDate=(e)=>{
  setWeekDate(e.target.value);
}
const upFortNightDate=(e)=>   {
  setFortnightDate(e.target.value);
}
const upYear=(e)=>   {
  setYear(e.target.value);
}

   // Create a JSON object to store the chart configurations
 const chartConfigs = {
     type: "column2d", // The chart type
     width: "700", // Width of the chart
     height: "500", // Height of the chart
     dataFormat: "json", // Data type
     dataSource: {
       // Chart Configuration
       chart: {
         caption: "Employee Leave Report",    //Set the chart caption
         subCaption: "No. of Leaves employee get in a year",             //Set the chart subcaption
         xAxisName: "Leave Types",           //Set the x-axis name
         yAxisName: "Leave Days",  //Set the y-axis name
         numberSuffix: "",
         theme: "fusion"                 //Set the theme for your chart
       },
       // Chart Data - from step 2
       data: chart
     }
   };
 

   const chartConfigsDesig = {
    type: "pie2d", // The chart type
    width: "700", // Width of the chart
    height: "500", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Designation Leave Report",    //Set the chart caption
        subCaption: "No. of Leaves employee get in a year in perticular Designation",             //Set the chart subcaption
        xAxisName: "Designation",           //Set the x-axis name
        yAxisName: "Leave Days",  //Set the y-axis name
        numberSuffix: "",
        theme: "fusion"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chart
    }
  };

  const chartConfigsGen = {
    type: "pie2d", // The chart type
    width: "700", // Width of the chart
    height: "500", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Gender Leave Report",    //Set the chart caption
        subCaption: "No. of Leaves employee get.",             //Set the chart subcaption
        xAxisName: "Gender",           //Set the x-axis name
        yAxisName: "Leave Days",  //Set the y-axis name
        numberSuffix: "",
        theme: "fusion"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chart
    }
  };

  const chartConfigsAllEmployee= {
    type: "column2d", // The chart type
    width: "700", // Width of the chart
    height: "500", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Group Leave Report",    //Set the chart caption
        subCaption: "No. of Leaves employee get.",             //Set the chart subcaption
        xAxisName: "Leave",           //Set the x-axis name
        yAxisName: "Leave Days",  //Set the y-axis name
        numberSuffix: "",
        theme: "fusion"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chart
    }
  };
return(
    <>
    <div className={styles.LMS__main}>
      <div className={styles.LeaveReport__main}>
        <div className={styles.LeaveReport__shadow}>
        <div className={styles.LeaveReport__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.LeaveReport__logo}
            />
            <div className={styles.LeaveReport__form__heading}>
            <h4>Search Report</h4>
            </div>
            
          </div>
    <div className="inputField" style={{
      display:"flex",
      // justifyContent:"center",  
      flexDirection:"column",  
      flexWrap:"wrap",  
    }}>
     <div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    flexWrap:"wrap"
     }}>
    <Form.Group
                    as={Col}
                    md="2"
                    controlId="validationFormik01"
                    className="mt-2 mb-3"
                    style={{
                      marginRight:"200px"
                    }}
                  >
                    <Form.Label>Search with</Form.Label>
                    <select
                      className="form-select"
                      value={type}
                      onChange={searchType}
                      
                      >
                      <option selected>Employee Name</option>
                      <option selected>Designation</option>
                      <option selected>Gender</option>
                      <option selected>All</option>

                  <option selected>Open this select menu</option>
                    </select>
                  </Form.Group>
                  {
                    type==="Employee Name"||type==="All"?(<> <div>
                      {/* <div style={{
                        display:"flex",
                        justifyContent:"center",
                      }}>
                      <div className="form-check mr-2">
                  <input className="form-check-input" type="radio" name="duration" id="yearly" onClick={()=>setDu("yearly")}/>
                  <label className="form-check-label" for="flexRadioDefault1">
                    Yearly
                  </label>
                </div>
                <div className="form-check mr-2">
                  <input className="form-check-input" type="radio" name="duration" id="monthly"onClick={()=>setDu("monthly")} checked/>
                  <label className="form-check-label" for="flexRadioDefault2">
                    Monthly
                  </label>
                </div>
                <div className="form-check mr-2">
                  <input className="form-check-input" type="radio" name="duration" id="quarterly"onClick={()=>setDu("quarterly")} checked/>
                  <label className="form-check-label" for="flexRadioDefault2">
                    Quarterly
                  </label>
                </div>
                <div className="fo  rm-check mr-2">
                  <input className="form-check-input" type="radio" name="duration" id="half-yearly"onClick={()=>setDu("half-yearly")} checked/>
                  <label className="form-check-label" for="flexRadioDefault2">
                    Half-Yearly
                  </label>
                </div>
                <div className="form-check mr-2">
                  <input className="form-check-input" type="radio" name="duration" id="half-yearly"onClick={()=>setDu("half-yearly")} checked/>
                  <label className="form-check-label" for="flexRadioDefault2">
                    Weekly
                  </label>
                </div>
                <div className="form-check mr-2">
                  <input className="form-check-input" type="radio" name="duration" id="half-yearly"onClick={()=>setDu("half-yearly")} checked/>
                  <label className="form-check-label" for="flexRadioDefault2">
                    fourNightly
                  </label>
                </div>
                </div> */}
                <div style={{
                  display:"flex",
                  flexDirection:"row",
                  justifyContent:"center",
                }}>
                <div className="duration " style={{
                  marginRight:"200px",
                  width:"300px"
                }}>
                <Form.Group
                    as={Col}
                    md="16"
                    controlId="validationFormik01"
                    className="mt-2  mb-3"
                  >
                    <Form.Label>Duration</Form.Label>
                    <select
                      className="form-select"
                      value={duration}
                      onChange={setDu}
                      
                      >
                      <option selected>Weekly</option>
                      <option selected>Fortnightly</option>
                      <option selected>Monthly</option>
                      <option selected>Half-yearly</option>
                      <option selected>Yearly</option>
                       
                  <option selected>Open this select menu</option>
                    </select>
                  </Form.Group>
                </div>

                {
                  duration==="Monthly"?(<>
                  <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    className="mt-2  mb-3"
                                  >
                                    <Form.Label>Select month</Form.Label>
                                    <select
                                      className="form-select"
                                      value={monthName}
                                      onChange={setMonthIn}
                                      >
                                    {
                                      month.map((month)=>{
                                        return(
                                        <option selected>{month.month}</option>
                                        )
                                      })
                                    }
                                  <option selected>Open this select menu</option>
                                    </select>
                                  </Form.Group>
                  </>):(duration==="Quarterly"?(<>
                    <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    className="mt-2 mb-3"
                                  >
                                    <Form.Label>Select duration</Form.Label>
                                    <select
                                      className="form-select"
                                      value={durationName}
                                      onChange={setDurationName}
                                      >
                                        {
                                          session.map((session)=>{
                                            return(
                                              <option selected>{session.session}</option>
                                            )
                                          })
                                        }
                                    
                                  <option selected>Open this select menu</option>
                                    </select>
                                  </Form.Group>
                  </>):(duration==="Half-yearly"?(<>
                    <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    className="mt-2 mb-3"
                                  >
                                    <Form.Label>Select</Form.Label>
                                    <select
                                      className="form-select"
                                      value={halfYear}
                                      onChange={setHalfYear}
                                      >
                                 <option selected>Jan-Jun</option>
                                 <option selected>Jul-Dec</option>

                                    
                                  <option selected>Open this select menu</option>
                                    </select>
                                  </Form.Group>
                  </>):(duration==="Weekly"?(<>
                    <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    className="mt-2 mb-3"
                                    
                                  >
                                    <Form.Label>From</Form.Label>
                                    <input type="date" className="form-select" value={weekDate} onChange={upWeekDate}/>
                                  </Form.Group>
                  </>):(duration==="Fortnightly"?(<>
                    <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    className="mt-2 mb-3"
                                  >
                                    <Form.Label>From</Form.Label>
                                    <input type="date" className="form-select" value={fortnightDate} onChange={upFortNightDate}/>
                                  </Form.Group>
                  </>):(duration==="Yearly"?(<>
                    <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormik01"
                                    className="mt-2  mb-3"
                                  >
                                    <Form.Label>From</Form.Label>
                                    <input type="number" className="form-select" value={year} onChange={upYear}/>
                                  </Form.Group>
                  </>):(<></>))))))
                }
                </div>
                </div></>):(<></>)
                  }
         </div>

<div  style={{
  display:"flex",
  justifyContent:"center",
  flexDirection:"row"
}}>
                  {
                    type==="Employee Name"?(<>
                    <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik01"
                    className="mt-2 mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Employee"
                      value={name}
                      onChange={getName}
                    />
                      </Form.Group>
                  {
                    duration==="Yearly"?(<>
                  <button className="btn btn-primary mb-3" onClick={getChart}>Get Report</button>
                    </>):(duration==="Monthly"?(<>
                      <button className="btn btn-primary mb-3" onClick={getChartMonthly}>Get Report</button>

                    </>):(duration==="Quarterly")?(<>
                      <button className="btn btn-primary mb-3" onClick={getChartQuarterly}>Get Report</button>

                    </>):(duration==="Half-yearly"?(<>
                      <button className="btn btn-primary mb-3" onClick={getChartHalfYearly}>Get Report</button>

                    </>):(duration==="Weekly"?(<>
                      <button className="btn btn-primary mb-3"  onClick={getChartWeekly}>Get Report</button>

                    </>):(duration==="Fortnightly"?(<>
                      <button className="btn btn-primary mb-3" onClick={getChartFortnightly}>Get Report</button>
                    </>):(<></>)))))
                  }
                    </>):(
                      type==="Designation"?(<>
                      
                  <button className="btn btn-primary" onClick={getChartDesignation}>Get Report</button>
                      </>):(
                        type==="Gender"?(<>
                        
                  <button className="btn btn-primary" onClick={getChartGender}>Get Report</button>
         </>):(type==="All"?(duration==="Yearly"?(<>
          <button className="btn btn-primary mb-3" onClick={getChartAllYearly}>Get Report</button>
         </>):(duration==="Monthly"?(<>
          <button className="btn btn-primary mb-3" onClick={getChartAllMonthly}>Get Report</button>

         </>):(duration==="Quarterly"?(<>
          <button className="btn btn-primary mb-3" onClick={getChartAllQuarterly}>Get Report</button>

         </>):(duration==="Half-yearly"?(<>
          <button className="btn btn-primary mb-3" onClick={getChartAllHalfYearly}>Get Report</button>

         </>):(duration==="Weekly"?(<> 
          <button className="btn btn-primary mb-3"  onClick={getChartAllWeekly}>Get Report</button>

         </>):(duration==="Fortnightly"?(<>
          <button className="btn btn-primary mb-3" onClick={getChartAllFortnightly}>Get Report</button>

         </>):(<></>))))))):(<></>))
                      )
                    )
                  }
                  </div>
    </div>
    </div>
    </div>
    <div className={styles.LeaveReport__main}>
    <div className={styles.LeaveReport__shadow}>
    <div className={styles.LeaveReport__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.LeaveReport__logo}
            />
            <div className={styles.LeaveReport__form__heading}>
              Leave Reports
            </div>
            
          </div>

    {
     flag && type=="Employee Name"?(<>
     <div className="charts mt-5" id="downloadChart">
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
        <h4 style={{display:"inline-block",
    marginTop:"23px", textDecoration:"underline",
    }}>RUDRAKSHA WELFARE FOUNDATION</h4>
    </div>
    
    {
        employee.map((emp)=>{
            if(emp.firstname.toLowerCase() +" "+ emp.lastname.toLowerCase()===name.toLowerCase()){
                return(
                    <div className={styles.LeaveReport__info}>
                    <div className="left text-align-left mr-5 ">
                {
                  emp.gender==="M"?(<h3 className="text-primary line-hight-0 mb-3"  >Mr. {emp.firstname.charAt(0).toUpperCase() + emp.firstname.slice(1).toLowerCase()} {emp.lastname.charAt(0).toUpperCase() + emp.lastname.slice(1).toLowerCase()}</h3>):(<h3 className="text-primary">Ms. {emp.firstname} {emp.lastname}</h3>)
                }
                <h6 className="line-hight-0 mb-3">{emp.designation}</h6>
                <p className="font-weight-light line-hight-0">Joined on {emp.createdAt.split("T")[0]}</p>
                 {
                  duration==="Monthly"?(<>
                <p className="line-hight-0 font-weight-light mb-3">Month : {monthName}</p>

                  </>):(<></>)
                 }
                </div>
                <div className="right">
                <p className="font-weight-light line-hight-0">Email:{emp.email}</p>
                <p className="font-weight-light line-hight-0">Phone:{emp.phone}</p>
                <p className="font-weight-light line-hight-0">Location:{emp.location.charAt(0).toUpperCase() + emp.location.slice(1).toLowerCase()}</p>
                </div>
                  </div>
                )
            }
            
        })
     }  
    <div className="text-center chart" style={{
        marginTop:"50px"
    }}>
    <ReactFC {...chartConfigs} /> 

    </div> 
    <div className="download text-center d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={()=>download("downloadChart")}>Download</button>
        </div>  
    </div>
     </>):(flag && type==="Designation"?(<>
     <div id="downloadChart">
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
        <h4 style={{display:"inline-block",
    marginTop:"23px", textDecoration:"underline",
    }}>RUDRAKSHA WELFARE FOUNDATION</h4>
    </div>
    
      <div className="text-center chart" style={{
        marginTop:"50px"
    }}>
    <ReactFC {...chartConfigsDesig} /> 

    </div> 
    <div className="download text-center d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={()=>download("downloadChart")}>Download</button>
        </div> 
        </div> 
     </>):(flag && type==="Gender"?(<>
      <div id="downloadChart">
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
        <h4 style={{display:"inline-block",
    marginTop:"23px", textDecoration:"underline",
    }}>RUDRAKSHA WELFARE FOUNDATION</h4>
    </div>
    
      <div className="text-center chart" style={{
        marginTop:"50px"
    }}>
    <ReactFC {...chartConfigsGen} /> 

    </div> 
    <div className="download text-center d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={()=>download("downloadChart")}>Download</button>
        </div> 
        </div> 
     </>):(flag && type==="All"?(<>
      <div id="downloadChart">
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
        <h4 style={{display:"inline-block",
    marginTop:"23px", textDecoration:"underline",
    }}>RUDRAKSHA WELFARE FOUNDATION</h4>
    </div>
    
      <div className="text-center chart" style={{
        marginTop:"50px"
    }}>
    <ReactFC {...chartConfigsAllEmployee} /> 

    </div> 
    <div className="download text-center d-flex justify-content-center">
        <button className="btn btn-secondary" onClick={()=>download("downloadChart")}>Download</button>
        </div> 
        </div> 
     </>):(<>
     <div className="text-center">
    <h4 className="text-danger">No Reports Found !</h4>
    </div>
     </>))))
    }
    </div>
    </div>
    </div>
    </>
)
}
export default LeaveReport