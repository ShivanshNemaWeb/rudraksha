import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import CostSheetTable from "./CostSheetTable";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./CostSheet.module.css";
import eventDetails from "../../Event/eventdetails";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import ReactToPrint from "react-to-print";
let miscellanousexpensesValues = {
  Breakrages: {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Contract Labour": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Postal Expenses": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
};
let inputValues = {
  "Printing & Stationary": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Hotel Expenses": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Video & Photo Professional": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Graphic Designer": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  Refreshment: {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Professional Fee": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Manpower Costing": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Media Expenses": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Digital Managment": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  Memorandums: {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  Venue: {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Local Travel Expenses": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  "Outstation Travel Expenses": {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
  Others: {
    actualAmount: 0,
    budgetedAmount: 0,
    variantAmount: 0,
  },
};
const CostSheet = () => {
  const [eventId, seteventId] = useState("");
  const [eventCodeDisability, setEventCodeDiability] = useState(true);
  const [eventCodes, setEventCodes] = useState([]);
  const [budgetedAmount, setBudgetedAmount] = useState("");
  const [remarks, setremarks] = useState("");

  const [coseSheetId, setcostSheetId] = useState("");

  //submit button
  const [btnData, setBtnData] = useState("Add Cost Data");
  const [disablebtn, setDisableBtn] = useState(false);

  const [state, setstate] = useState(false);

  //event input data
  const [projectHead, setprojectHead] = useState("");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventcode, seteventcode] = useState("");

  const [error, setError] = useState("");
  const search = useLocation().search;
  const event = new URLSearchParams(search).get("event");

  //for printing
  const printRef = useRef();

  //navigating
  const navigate = useHistory();

  //updating or adding
  const [updatebtn, setUpdateBtn] = useState(false);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("rudraksha"))) {
      return navigate.push("/");
    }
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/costsheet/getcostsheetdata/${event}`
        );
        console.log(data);
        if (data.costsheetData && data.eventDetails) {
          inputValues = data.costsheetData.costSheet;
          seteventId(data.eventDetails[0]._id);
          setprojectHead(data.eventDetails[0].projectHead);
          setVenue(data.eventDetails[0].venue);
          setEventDate(data.eventDetails[0].dateOfEvent);
          setcostSheetId(data.costsheetData._id);
          setBudgetedAmount(data.eventDetails[0].budgetedCost);
          console.log(data.eventDetails[0].budgetedCost);
          setstate(true);

          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/event/getEventCodes/${data.eventDetails[0].projectHead}`
          );
          if (res.data.data.length > 0) {
            console.log(res.data.data);
            setEventCodes(res.data.data);
            const evecode = res.data.data.find((val) => {
              return val.eventCode == data.eventDetails[0].eventCode;
            });
            seteventcode(JSON.stringify(evecode));
            setUpdateBtn(true);
            setBtnData("Update Cost Sheet");
          }
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };
    fetchDetails();
  }, []);

  const handleEventDetails = async (e) => {
    setEventCodeDiability(true);
    setprojectHead(e.target.value);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/event/getEventCodes/${e.target.value}`
      );
      console.log(data);
      if (data.data.length > 0) {
        setEventCodes(data.data);
        setEventCodeDiability(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleEventInputData = (e) => {
    console.log();
    seteventcode(e.target.value);
    const eventDetails = JSON.parse(e.target.value);
    setVenue(eventDetails.venue);
    setEventDate(eventDetails.dateOfEvent);
    seteventId(eventDetails._id);
  };

  const handleCostSheetSubmission = async (e) => {
    e.preventDefault();
    setError("");
    setBtnData("Loading...");
    setDisableBtn(true);
    const expenseskeys = Object.keys(inputValues);
    const miscellanouskeys = Object.keys(miscellanousexpensesValues);
    let sum = 0;
    console.log("entered cost sheet");
    expenseskeys.forEach(
      (val) => (sum = sum + parseInt(inputValues[val].budgetedAmount))
    );
    miscellanouskeys.forEach(
      (val) =>
        (sum = sum + parseInt(miscellanousexpensesValues[val].budgetedAmount))
    );
    console.log(sum);
    if (sum > budgetedAmount) {
      setError("Budget cannot be more than budgeted Cost!");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/costsheet/addcostsheet`,
        {
          costSheet: inputValues,
          eventId,
          budgetedAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          },
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      setBtnData("Add Cost Data");
      setDisableBtn(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setBtnData("Add Cost Data");
      setDisableBtn(false);
    }
  };

  const handleUpdateBtn = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/costsheet/updatecostsheet`,
        {
          costsheetId: coseSheetId,
          costSheet: JSON.stringify(inputValues),
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          },
        }
      );
      setDisableBtn(false);
      navigate.push("/costsheet");
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
      setDisableBtn(false);
      setError(error.message);
    }
  };

  return (
    <div className={styles.costsheet__main}>
      <div className={styles.costsheet__shadow}>
        <div className={styles.costsheet__head}>
          <img
            src="/RWFLOGO.png"
            alt="logo"
            width={90}
            className={styles.costsheet__logo}
          />
          <div className={styles.costsheet__form__heading}>
            Event Cost Sheet
          </div>
        </div>
        <div className={styles.costsheet__body}>
          <Form
            onSubmit={updatebtn ? handleUpdateBtn : handleCostSheetSubmission}
          >
            <Row className="mb-2">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>Project Head</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={projectHead}
                  onChange={handleEventDetails}
                  required
                >
                  <option value="">Choose the Project Head</option>
                  {eventDetails.map((event) => (
                    <option value={event.projectHead} key={event.projectHead}>
                      {event.projectHead}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>Event Code</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={eventcode}
                  onChange={handleEventInputData}
                  disabled={eventCodeDisability}
                  required
                >
                  <option value="">Choose the Event Code</option>
                  {eventCodes &&
                    eventCodes.map((event) => (
                      <option
                        value={JSON.stringify(event)}
                        key={event.eventCode}
                      >
                        {event.eventCode}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Venue</Form.Label>
                <Form.Control type="text" name="venue" value={venue} disabled />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>Event Date</Form.Label>
                <Form.Control
                  type="Date"
                  name="date"
                  value={moment(eventDate).format("YYYY-MM-DD")}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Budgeted Amount</Form.Label>
                <InputGroup>
                  <InputGroup.Text>&#8377;</InputGroup.Text>
                  <Form.Control
                    type="Number"
                    name="budgetedAmount"
                    onChange={(e) => setBudgetedAmount(e.target.value)}
                    value={budgetedAmount}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Remarks</Form.Label>
                <InputGroup className="mb-2">
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    value={remarks}
                    onChange={(e) => setremarks(e.target.value)}
                    maxLength={50}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <CostSheetTable
              inputValues={inputValues}
              miscellanousexpensesValues={miscellanousexpensesValues}
              ref={printRef}
            />

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
          </Form>
          <ReactToPrint
            trigger={() => <Button>print</Button>}
            content={() => printRef.current}
          />
        </div>
      </div>
    </div>
  );
};
export default CostSheet;
