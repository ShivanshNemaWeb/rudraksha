import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DesignationChart from "../Reports/EmployeeReport/DesignationChart";
import EmployeePieChart from "../Reports/EmployeeReport/BloodGroupChart";
import EmployeeBar2dReport_gender from "../Reports/EmployeeReport/GenderChart";
import ExperienceReport from "../Reports/EmployeeReport/ExperienceChart";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Employee.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";

const Employee = () => {
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [lastname, setlastname] = useState("");
  const [fathername, setfathername] = useState("");
  const [mothername, setmothername] = useState("");
  const [Dob, setDob] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [branch, setBranch] = useState("");
  const [experience, setexperience] = useState("");
  const [educationStatus, seteducationStatus] = useState("");
  const [designation, setdesignation] = useState("");
  const [cv, setcv] = useState("");
  const [location, setlocation] = useState("");
  const [gender, setgender] = useState("");
  const [bloodgroup, setbloodgroup] = useState("");
  const [vaccinationDoseOne, setvaccinationDoseOne] = useState();
  const [vaccinationDoseTwo, setvaccinationDoseTwo] = useState("");
  const [vaccinationDoseOneAttachment, setvaccinationDoseOneAttachment] =
    useState("");
  const [vaccinationDoseTwoAttachment, setvaccinationDoseTwoAttachment] =
    useState("");
  const [profilePic, setprofilePic] = useState("");
  const [remarks, setremarks] = useState("");
  const profileref = useRef();
  const cvref = useRef();
  const vaccination1ref = useRef();
  const vaccination2ref = useRef();

  const [error, setError] = useState("");

  const [btnData, setBtnData] = useState("Add Employee");
  const [disablebtn, setDisableBtn] = useState(false);
  const [reportbtnData, setReportBtnData] = useState("Get Report");
  const [barChartbtnData, setbarChartBtnData] = useState(
    "Get Bar Chart Report"
  );
  const [reportDisability, setreportDisability] = useState(false);
  const [barChartVisibility, setbarChartVisibility] = useState(false);

  //report
  const [reportDesignation, setReportDesignation] = useState("");
  const [reportBranch, setReportBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportVisibility, setReportVisibilty] = useState(false);

  const navigate = useHistory();

  useEffect(() => {
    //directly redirecting the user to login page if they didnt login
    if (!JSON.parse(localStorage.getItem("rudraksha"))) {
      return navigate.push("/");
    }
  }, []);

  const getEmployeeReport = async () => {
    setReportBtnData("Creating Report...");
    setreportDisability(true);
    const res = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/employee/createEmployeeReport`,
        {
          reportDesignation,
          reportBranch,
          startDate,
          endDate,
        }
      )
      .then(async (res) => {
        setReportBtnData("Downloading Report...");
        const report = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployeeReport`,
            {
              responseType: "blob",
            }
          )
          .then((result) => {
            const pdfBlob = new Blob([result.data], {
              type: "application/pdf",
            });
            saveAs(pdfBlob, "employeeReport.pdf");
            setReportBtnData("Get Report");
            setreportDisability(false);
          })
          .catch((error) => {
            setError(error.message);
            setReportBtnData("Get Report");
            setreportDisability(false);
          });
      });
  };

  const DownloadEmployeeBarChart = () => {
    try {
      setError("");
      console.log("enetred");
      setbarChartBtnData("Downloading report...");
      setbarChartVisibility(true);
      const doc = new jsPDF();
      const designationhtml = document.getElementById("designationchart");
      const gender_bloodgrouphtml = document.getElementById(
        "bloodgrp_genderChart"
      );
      const experiencehtml = document.getElementById("experienceChart");

      if (designationhtml || gender_bloodgrouphtml || experiencehtml) {
        var html1 = htmlToPdfmake(designationhtml.innerHTML);
        var html2 = htmlToPdfmake(gender_bloodgrouphtml.innerHTML);
        var html3 = htmlToPdfmake(experiencehtml.innerHTML);
        const documentDefinition = {
          content: [
            {
              columns: [
                {
                  width: "*",
                  stack: [
                    {
                      image: logo,
                      width: 70,
                      alignment: "center",
                      margin: [40, 0, 0, 0],
                      padding: [0, 0, 0, 0],
                    },
                  ],
                },
                {
                  width: "auto",
                  stack: [
                    {
                      style: "h1",
                      text: "RUDRAKSHA WELFARE FOUNDATION",
                      alignment: "center",
                      decoration: "underline",
                    },
                  ],
                },
              ],
            },
            ...html1,
            {
              columns: [
                {
                  width: "*",
                  stack: [
                    {
                      image: logo,
                      width: 70,
                      alignment: "center",
                      margin: [40, 0, 0, 0],
                      padding: [0, 0, 0, 0],
                      id: "break2",
                    },
                  ],
                },
                {
                  width: "auto",
                  stack: [
                    {
                      style: "h1",
                      text: "RUDRAKSHA WELFARE FOUNDATION",
                      alignment: "center",
                      decoration: "underline",
                      id: "break2",
                    },
                  ],
                },
              ],
            },
            ...html2,
            {
              columns: [
                {
                  width: "*",
                  stack: [
                    {
                      image: logo,
                      width: 70,
                      alignment: "center",
                      margin: [40, 0, 0, 0],
                      padding: [0, 0, 0, 0],
                      id: "break",
                    },
                  ],
                },
                {
                  width: "auto",
                  stack: [
                    {
                      style: "h1",
                      text: "RUDRAKSHA WELFARE FOUNDATION",
                      alignment: "center",
                      decoration: "underline",
                      id: "break",
                    },
                  ],
                },
              ],
            },
            ...html3,
          ],
          pageBreakBefore: function (currentNode) {
            if (currentNode.id === "break" || currentNode.id === "break2") {
              return true;
            } else {
              return false;
            }
          },
          styles: {
            h1: {
              fontSize: 20,
              bold: true,
              margin: [0, 20, 50, 0],
              padding: [0, 0, 0, 0],
            },
          },
        };
        setbarChartBtnData("Get Bar Chart Report");
        setbarChartVisibility(false);
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).download("employeebarchart.pdf");
      } else {
        setError("Unable to Create Report, Please Try Again!");
        setbarChartBtnData("Get Bar Chart Report");
        setbarChartVisibility(false);
      }
    } catch (error) {
      setError(error.message);
      setbarChartBtnData("Get Bar Chart Report");
      setbarChartVisibility(false);
    }
  };

  const handleSubmitEmployeeForm = async (e) => {
    e.preventDefault();
    setError("");
    var format = /[1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (
      format.test(firstname) ||
      format.test(middlename) ||
      format.test(lastname) ||
      format.test(fathername) ||
      format.test(mothername)
    ) {
      return setError("special Characters are not allowed");
    }
    setDisableBtn(true);
    setBtnData("Loading...");

    try {
      const formdata = new FormData();
      formdata.set("firstname", firstname);
      formdata.set("middlename", middlename);
      formdata.set("lastname", lastname);
      formdata.set("fathername", fathername);
      formdata.set("mothername", mothername);
      formdata.set("Dob", Dob);
      formdata.set("branch", branch);
      formdata.set("gender", gender);
      formdata.set("phone", phone);
      formdata.set("email", email);
      formdata.set("educationStatus", educationStatus);
      formdata.set("experience", experience);
      formdata.set("designation", designation);
      formdata.set("location", location);
      formdata.set("bloodgroup", bloodgroup);
      formdata.set("vaccinationDoseOne", vaccinationDoseOne);
      formdata.set("vaccinationDoseTwo", vaccinationDoseTwo);
      formdata.append("vaccination1", vaccinationDoseOneAttachment);
      formdata.append("vaccination2", vaccinationDoseTwoAttachment);
      formdata.append("profile", profilePic);
      formdata.append("cv", cv);
      formdata.set("remarks", remarks);

      const data = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/employee/addEmployee`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          },
        }
      );
      console.log("data", data);

      if (data.data.error) {
        throw new Error(data.data.error);
      }

      profileref.current.value = "";
      cvref.current.value = "";
      vaccination1ref.current.value = "";
      vaccination2ref.current.value = "";
      setfirstname("");
      setmiddlename("");
      setlastname("");
      setfathername("");
      setmothername("");
      setDob("");
      setBranch("");
      setphone("");
      setgender("");
      setemail("");
      setexperience("");
      seteducationStatus("");
      setdesignation("");
      setcv("");
      setlocation("");
      setbloodgroup("");
      setvaccinationDoseOne("");
      setvaccinationDoseTwo("");
      setvaccinationDoseOneAttachment("");
      setvaccinationDoseTwoAttachment("");
      setprofilePic("");
      setremarks("");

      setTimeout(() => {
        setBtnData("Add Employee");
      }, 2000);

      setDisableBtn(false);
      setBtnData("Employee Added ✔");
      setError("");
    } catch (error) {
      setDisableBtn(false);
      setBtnData("Add Employee");
      setError(error.message);
    }
  };

  return (
    <div className={styles.employee__main}>
      <div className={styles.employee__shadow}>
        <div className={styles.employee__head}>
          <img
            src="/RWFLOGO.png"
            alt="logo"
            width={90}
            className={styles.employee__logo}
          />
          <div className={styles.employee__form__heading}>Employee Details</div>
        </div>
        <Form
          className={styles.employee__form}
          onSubmit={handleSubmitEmployeeForm}
        >
          <div className={styles.employee__form2}>
            <div className={styles.employee__categories}>
              <h4 className={styles.employee__heading}>Personal Details</h4>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    value={middlename}
                    onChange={(e) => setmiddlename(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="phoneNumber"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Dob</Form.Label>
                  <Form.Control
                    type="Date"
                    name="Dob"
                    value={Dob}
                    onChange={(e) => setDob(e.target.value)}
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
                    value={fathername}
                    onChange={(e) => setfathername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik04">
                  <Form.Label>Mother name</Form.Label>
                  <Form.Control
                    type="text"
                    name="mothername"
                    value={mothername}
                    onChange={(e) => setmothername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik03">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group md="4" as={Col} controlId="validationFormik03">
                  <Form.Label>Blood group</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={bloodgroup}
                    onChange={(e) => setbloodgroup(e.target.value)}
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
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Profile picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profile"
                    ref={profileref}
                    onChange={(e) => setprofilePic(e.target.files[0])}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    required
                  >
                    <option value="">Choose the gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Branch Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
            </div>
            <div className={styles.employee__categories}>
              <h4 className={styles.employee__heading}>
                Education Details / Experience
              </h4>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Experience</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={experience}
                    onChange={(e) => setexperience(e.target.value)}
                    required
                  >
                    <option value="">Choose the experience</option>
                    <option value="0-2">0-2years</option>
                    <option value="2-4">2-4years</option>
                    <option value="4-6">4-6years</option>
                    <option value="6-8">6-8years</option>
                    <option value="8-10">8-10years</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Education Status</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={educationStatus}
                    onChange={(e) => seteducationStatus(e.target.value)}
                    required
                  >
                    <option value="">choose the highest qualification</option>
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
                    <option>B.Arch</option>
                    <option>B.A</option>
                    <option>B.Tech</option>
                    <option>B.B.A</option>
                    <option>B.C.S</option>
                    <option>B.Ed</option>
                    <option>B.Com</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Designation</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={designation}
                    onChange={(e) => setdesignation(e.target.value)}
                    required
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
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>CV</Form.Label>
                  <Form.Control
                    type="file"
                    name="cv"
                    ref={cvref}
                    onChange={(e) => setcv(e.target.files[0])}
                    required
                  />
                </Form.Group>
              </Row>
            </div>
            <div className={styles.employee__categories}>
              <h4 className={styles.employee__heading}>Vaccination Details</h4>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>First Vaccination Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="firstVaccinationDate"
                    value={vaccinationDoseOne}
                    onChange={(e) => setvaccinationDoseOne(e.target.value)}
                    min={Dob}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Second Vaccination Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="secondVaccinationDate"
                    value={vaccinationDoseTwo}
                    onChange={(e) => setvaccinationDoseTwo(e.target.value)}
                    min={Dob}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>First Vaccination Certificate</Form.Label>
                  <Form.Control
                    type="file"
                    name="firstVaccinationDate"
                    ref={vaccination1ref}
                    onChange={(e) =>
                      setvaccinationDoseOneAttachment(e.target.files[0])
                    }
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Second Vaccination Certficate</Form.Label>
                  <Form.Control
                    type="file"
                    name="secondVaccinationDate"
                    ref={vaccination2ref}
                    onChange={(e) =>
                      setvaccinationDoseTwoAttachment(e.target.files[0])
                    }
                    required
                  />
                </Form.Group>
              </Row>
            </div>
            <div className={styles.employee__categories}>
              <h4 className={styles.employee__heading}>Remarks</h4>
              <InputGroup className="mb-4">
                <InputGroup.Text>Remarks</InputGroup.Text>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  value={remarks}
                  onChange={(e) => setremarks(e.target.value)}
                />
              </InputGroup>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Button
              type="submit"
              // className="mb-4"
              style={{
                display: "block",
                margin: "auto",
                textAlign: "center",
              }}
              disabled={disablebtn}
            >
              {btnData}
            </Button>
          </div>
        </Form>
        <div
          id="designationchart"
          style={{
            visibility: "hidden",
            position: "absolute",
            top: 0,
            pageBreakAfter: "always",
          }}
        >
          <DesignationChart />
        </div>
        <div
          id="bloodgrp_genderChart"
          style={{
            visibility: "hidden",
            position: "absolute",
            top: 0,
            pageBreakAfter: "always",
          }}
        >
          <EmployeePieChart />
          <EmployeeBar2dReport_gender />
        </div>
        <div
          id="experienceChart"
          style={{
            visibility: "hidden",
            position: "absolute",
            top: 0,
            pageBreakAfter: "always",
          }}
        >
          <ExperienceReport />
        </div>
        <div className={styles.employee__report}>
          {reportVisibility && (
            <>
              <Row className="mb-2">
                <h4 className={styles.employee__heading}>Employee Report</h4>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Designation</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={reportDesignation}
                    onChange={(e) => setReportDesignation(e.target.value)}
                  >
                    <option value="">Choose designation</option>
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
                  <Form.Label>BranchName</Form.Label>
                  <Form.Control
                    type="text"
                    name="reportBranch"
                    value={reportBranch}
                    onChange={(e) => setReportBranch(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="startdate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationFormik01">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="Date"
                    name="secondVaccinationDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button
                variant="outline-primary"
                onClick={getEmployeeReport}
                disabled={reportDisability}
              >
                {reportbtnData}
              </Button>
              <Button
                variant="outline-primary"
                onClick={DownloadEmployeeBarChart}
                disabled={barChartVisibility}
              >
                {barChartbtnData}
              </Button>
            </>
          )}
          {!reportVisibility && (
            <>
              <Button
                variant="outline-primary"
                onClick={() => setReportVisibilty(true)}
              >
                Get Report
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Employee;
