import React, { useEffect } from "react";
import { useState } from "react";
import VendorTypeChart from "../Reports/VendorReport/VendorTypeChart";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./AMS.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";

const AMS = () => {
  const [employees, setEmployees] = useState([]);
  const [detail, setDetail] = useState({
    id: "",
    firstname: "",
    lastname: "",
    department: "",
    phoneNo: "",
    location: "",
    designation: "",
    email: "",
  });
  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`)
      .then((res) => {
        setEmployees(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const setInForm = (event) => {
    employees.map((employee) => {
      if (employee.firstname + " " + employee.lastname === event.target.value) {
        return setDetail({
          id: employee._id,
          firstname: employee.firstname,
          lastname: employee.lastname,
          department: employee.department,
          phoneNo: employee.phone,
          location: employee.location,
          designation: employee.designation,
          email: employee.email,
        });
      }
    });
  };
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpBtn, setOtpBtn] = useState("send otp");
  const setOTPfield = (event) => {
    setOtp(event.target.value);
  };
  const sendOTP = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}api/attendance/sendOtp`,
        detail.id,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          },
        }
      )
      .then((res) => {
        console.log(detail.id);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
      });
    setOtpBtn("otp sent");
  };
  const verifyOTP = async (ev) => {
    ev.preventDefault();
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/attendance/verifyOtp`,
      {
        email: detail.email,
        otp: otp,
      }
    );
    if (data.error) {
      setErrorMessage(data.error);
    }
    setOtpBtn("otp verified");
    setTimeout(() => {
      setOtpBtn("send otp");
    }, 2000);
  };

  return (
    <>
      <div className={styles.AMS__main}>
        <div className={styles.AMS__shadow} style={{ minHeight: "90vh" }}>
          <div className={styles.AMS__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.AMS__logo}
            />
            <div className={styles.AMS__form__heading}>
              Attendace management system
            </div>
          </div>

          <Form className={styles.AMS__form}>
            <div className={styles.AMS__form2}>
              <div>
                <h4 className={styles.AMS__heading}>
                  Employee Personal Details
                </h4>
                <Row className="mb-2">
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik01"
                    className="mt-2"
                  >
                    <Form.Label>Employee Name</Form.Label>
                    <select
                      className="form-select"
                      name="name"
                      value={detail.firstname + " " + detail.lastname}
                      onChange={setInForm}
                    >
                      <option selected>Open this select menu</option>
                      {employees.map((employee) => {
                        return (
                          <option selected key={employee._id}>
                            {employee.firstname + " " + employee.lastname}
                          </option>
                        );
                      })}
                    </select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik02"
                    className="mt-2"
                  >
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="department"
                      defaultValue={detail.department}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik02"
                    className="mt-2"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      name="phoneNo"
                      defaultValue={detail.phoneNo}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik02"
                    className="mt-4"
                  >
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      defaultValue={detail.location}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik02"
                    className="mt-4"
                  >
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      name="designation"
                      defaultValue={detail.designation}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik02"
                    className="mt-4"
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      defaultValue={detail.email}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <div class="input-group mt-5">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="OTP"
                        value={otp}
                        onChange={setOTPfield}
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-secondary"
                          type="post"
                          onClick={verifyOTP}
                        >
                          verify OTP
                        </button>
                      </div>
                    </div>
                  </Form.Group>
                </Row>
              </div>
            </div>
            <Button
              onClick={sendOTP}
              type="post"
              className="mb-4"
              style={{
                display: "block",
                margin: "auto",
                textAlign: "center",
              }}
            >
              {otpBtn}
            </Button>
          </Form>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
      </div>
    </>
  );
};
export default AMS;
