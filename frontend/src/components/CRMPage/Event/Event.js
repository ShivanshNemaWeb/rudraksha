import { useState, useEffect } from "react";
import eventDetails from "./eventdetails";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Event.module.css";
import axios from "axios";

const Event = () => {
  const [projectName, setprojectName] = useState("");
  const [projectHead, setprojectHead] = useState("");
  const [eventCode, seteventCode] = useState("");
  const [eventNumber, seteventNumber] = useState("");
  const [venue, setvenue] = useState("");
  const [dateOfEvent, setdateOfEvent] = useState("");
  const [time, settime] = useState("");
  const [projectManager, setprojectManager] = useState("");
  const [assistantProjectManager, setassistantProjectManager] = useState("");
  const [helpStaff, sethelpStaff] = useState("");
  const [budgetedCost, setbudgetedCost] = useState("");
  const [actualCost, setactualCost] = useState(0);
  const [branchName, setbranchName] = useState("");
  const [eventAbbreviation, seteventAbbreviation] = useState("");
  const [projectNumber, setprojectNumber] = useState("");
  const [vendor1, setVendor1] = useState("");
  const [vendor2, setVendor2] = useState("");
  const [vendor3, setVendor3] = useState("");
  const [vendor4, setVendor4] = useState("");
  const [vendor5, setVendor5] = useState("");
  const [vendor6, setVendor6] = useState("");
  const [vendor7, setVendor7] = useState("");
  const [vendor8, setVendor8] = useState("");
  const [vendor9, setVendor9] = useState("");
  const [vendors, setVendors] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projectHeadOption, setprojectHeadOption] = useState("");
  const [projectManagerOption, setprojectManagerOption] = useState("");
  const [assistantProjectManagerOption, setassistantProjectManagerOption] =
    useState("");
  const [helpStaffOption, sethelpStaffOption] = useState("");
  const [vendor1Option, setVendor1Option] = useState("");
  const [vendor2Option, setVendor2Option] = useState("");
  const [vendor3Option, setVendor3Option] = useState("");
  const [vendor4Option, setVendor4Option] = useState("");
  const [vendor5Option, setVendor5Option] = useState("");
  const [vendor6Option, setVendor6Option] = useState("");
  const [vendor7Option, setVendor7Option] = useState("");
  const [vendor8Option, setVendor8Option] = useState("");
  const [vendor9Option, setVendor9Option] = useState("");
  const [remarks, setremarks] = useState("");

  const [btnData, setBtnData] = useState("Add Event");
  const [error, setError] = useState("");
  const [disablebtn, setDisableBtn] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setError("");
        const vendorRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/vendor/getVendors`
        );
        setVendors(vendorRes.data.data);
        const employeeRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employee/getEmployees`
        );
        setEmployees(employeeRes.data.data);
        // console.log(employeeRes);
        if (vendorRes.error || employeeRes.error)
          throw new Error(
            vendorRes.error ? vendorRes.error : employeeRes.error
          );
        setError("");
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDetails();
  }, []);

  const handleProjectHead = async (e) => {
    setprojectHeadOption(e.target.value);
    const event = JSON.parse(e.target.value);
    setprojectHead(event.projectHead);
    setprojectName(event.projectName);
    seteventAbbreviation(event.abbreviation);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/event/getEvent/${event.abbreviation}`
      );
      if (data.error) {
        throw new Error(data.error);
      }
      seteventCode(`${event.abbreviation}${data.projectNumber + 1}`);
      seteventNumber(data.eventNumber + 1);
      setprojectNumber(data.projectNumber + 1);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSubmitEventForm = async (e) => {
    e.preventDefault();
    setError("");
    setDisableBtn(true);
    setBtnData("Loading...");
    const selectedvendors = [
      vendor1,
      vendor2,
      vendor3,
      vendor4,
      vendor5,
      vendor6,
      vendor7,
      vendor8,
      vendor9,
    ];
    try {
      const eventDetails = {
        projectName,
        projectHead,
        eventCode,
        eventNumber,
        venue,
        dateOfEvent,
        time,
        projectManager,
        assistantProjectManager,
        helpStaff,
        Allvendors: selectedvendors.filter((val) => val != ""),
        budgetedCost,
        actualCost,
        branchName,
        remarks,
        eventAbbreviation,
        projectNumber,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/event/addEvent`,
        eventDetails,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          },
        }
      );
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      setprojectName("");
      setprojectHead("");
      seteventCode("");
      seteventNumber("");
      setvenue("");
      setdateOfEvent("");
      settime("");
      setprojectManager("");
      setassistantProjectManager("");
      sethelpStaff("");
      setVendor1("");
      setVendor2("");
      setVendor3("");
      setVendor4("");
      setVendor5("");
      setVendor6("");
      setVendor6("");
      setVendor8("");
      setVendor9("");
      setbudgetedCost("");
      setactualCost("");
      setbranchName("");
      setremarks("");
      seteventAbbreviation("");
      setprojectNumber("");
      setprojectHeadOption("");
      setprojectManagerOption("");
      setassistantProjectManagerOption("");
      sethelpStaffOption("");
      setVendor1Option("");
      setVendor2Option("");
      setVendor3Option("");
      setVendor4Option("");
      setVendor5Option("");
      setVendor6Option("");
      setVendor7Option("");
      setVendor8Option("");
      setVendor9Option("");
      setTimeout(() => {
        setBtnData("Add Event");
      }, 2000);

      setDisableBtn(false);
      setBtnData("Event Added ✔");
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setDisableBtn(false);
      setBtnData("Add Employee");
    }
  };

  return (
    <div>
      <div className={styles.event__main}>
        <div className={styles.event__shadow}>
          <div className={styles.event__head}>
            <img
              src="/RWFLOGO.png"
              alt="logo"
              width={90}
              className={styles.event__logo}
            />
            <div className={styles.event__form__heading}>Event Details</div>
          </div>
          <Form className={styles.event__form} onSubmit={handleSubmitEventForm}>
            <div className={styles.event__form2}>
              <div>
                <h4 className={styles.event__heading}>Event Details</h4>
                <Row className="mb-2">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Project Head</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={projectHeadOption}
                      onChange={(e) => handleProjectHead(e)}
                      required
                    >
                      <option value="">Choose the Project Head</option>
                      {eventDetails.map((event) => (
                        <option
                          value={JSON.stringify(event)}
                          key={event.projectHead}
                        >
                          {event.projectHead}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="projectName"
                      value={projectName}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Event Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventCode"
                      value={eventCode}
                      disabled
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Event Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventNumber"
                      value={eventNumber}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="Date"
                      name="dateOfEvent"
                      value={dateOfEvent}
                      onChange={(e) => setdateOfEvent(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="dateOfEvent"
                      value={time}
                      onChange={(e) => settime(e.target.value)}
                      pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Budgeted Cost</Form.Label>
                    <Form.Control
                      type="Number"
                      name="budgetedCost"
                      value={budgetedCost}
                      onChange={(e) => setbudgetedCost(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Actual Cost</Form.Label>
                    <Form.Control
                      type="Number"
                      name="actualCost"
                      value={actualCost}
                      onChange={(e) => setactualCost(e.target.value)}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="branchName"
                      value={branchName}
                      onChange={(e) => setbranchName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Venue Details</Form.Label>
                    <FormControl
                      as="textarea"
                      aria-label="With textarea"
                      value={venue}
                      onChange={(e) => setvenue(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
              </div>

              <div className={styles.employee__categories}>
                <h4 className={styles.event__heading}>Event Organisers</h4>
                <Row className="mb-4">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Project Manager</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={projectManagerOption}
                      onChange={(e) => {
                        setprojectManager(JSON.parse(e.target.value)._id);
                        setprojectManagerOption(e.target.value);
                      }}
                      required
                    >
                      <option value="">Choose the Project Manager</option>
                      {employees.map((emp) => (
                        <option value={JSON.stringify(emp)} key={emp._id}>
                          {emp.firstname + " " + emp.lastname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Assistant Project Manager</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={assistantProjectManagerOption}
                      onChange={(e) => {
                        setassistantProjectManager(
                          JSON.parse(e.target.value)._id
                        );
                        setassistantProjectManagerOption(e.target.value);
                      }}
                      required
                    >
                      <option value="">
                        Choose the Assistant Project Manager
                      </option>
                      {employees.map((emp) => (
                        <option value={JSON.stringify(emp)} key={emp._id}>
                          {emp.firstname + " " + emp.lastname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Help Staff</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={helpStaffOption}
                      onChange={(e) => {
                        sethelpStaff(JSON.parse(e.target.value)._id);
                        sethelpStaffOption(e.target.value);
                      }}
                      required
                    >
                      <option value="">Choose the Help Staff</option>
                      {employees.map((emp) => (
                        <option value={JSON.stringify(emp)} key={emp._id}>
                          {emp.firstname + " " + emp.lastname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </div>
              <div className={styles.employee__categories}>
                <h4 className={styles.event__heading}>Vendors</h4>
                <Row className="mb-2">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 1</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor1Option}
                      onChange={(e) => {
                        setVendor1(JSON.parse(e.target.value)._id);
                        setVendor1Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 2</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor2Option}
                      onChange={(e) => {
                        setVendor2(JSON.parse(e.target.value)._id);
                        setVendor2Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 3</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor3Option}
                      onChange={(e) => {
                        setVendor3(JSON.parse(e.target.value)._id);
                        setVendor3Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 4</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor4Option}
                      onChange={(e) => {
                        setVendor4(JSON.parse(e.target.value)._id);
                        setVendor4Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 5</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor5Option}
                      onChange={(e) => {
                        setVendor5(JSON.parse(e.target.value)._id);
                        setVendor5Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 6</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor6Option}
                      onChange={(e) => {
                        setVendor6(JSON.parse(e.target.value)._id);
                        setVendor6Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 7</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor7Option}
                      onChange={(e) => {
                        setVendor7(JSON.parse(e.target.value)._id);
                        setVendor7Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 8</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor8Option}
                      onChange={(e) => {
                        setVendor8(JSON.parse(e.target.value)._id);
                        setVendor8Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>Vendor 9</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={vendor9Option}
                      onChange={(e) => {
                        setVendor8(JSON.parse(e.target.value)._id);
                        setVendor9Option(e.target.value);
                      }}
                    >
                      <option value="">Choose Vendor</option>
                      {vendors.map((item) => (
                        <option value={JSON.stringify(item)} key={item._id}>
                          {item.vendorName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </div>
              <div className={styles.employee__categories}>
                <h4 className={styles.event__heading}>Remarks</h4>
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
        </div>
      </div>
    </div>
  );
};
export default Event;
