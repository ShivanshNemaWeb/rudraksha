import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "./Eventapproval.module.css";
const SingleEvent = ({ val }) => {
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");
  const [ApprovalDisablebtn, setApprovalDisablebtn] = useState(false);
  const [rejectDisableBtn, setRejectDisablebtn] = useState(false);
  useEffect(() => {
    try {
      if (val.status == "Approved") setStatus("Approved ✔️");
      else if (val.status == "Rejected") setStatus("Rejected ❌");
      else setStatus("Pending 🕖");
      const fetchDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/employee/getemp/${val.empId}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
          }
        );
        setCreatedBy(data.data.firstname + " " + data.data.lastname);
      };
      fetchDetails();
    } catch (error) {
      throw new Error(error.message);
    }
  }, [val]);
  const approveEvent = async (eventId) => {
    setApprovalDisablebtn(true);
    setRejectDisablebtn(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/event/approveEvent`,
        {
          eventId,
          status: "Approved",
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          },
        }
      );
      setApprovalDisablebtn(false);
      setRejectDisablebtn(false);
      setStatus("Approved ✔️");
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      setApprovalDisablebtn(false);
      setRejectDisablebtn(false);
      throw new Error(error.message);
    }
  };
  const rejectEvent = async (eventId) => {
    setRejectDisablebtn(true);
    setApprovalDisablebtn(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/event/approveEvent`,
        {
          eventId,
          status: "Rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("rudraksha")
            )}`,
          },
        }
      );
      setRejectDisablebtn(false);
      setApprovalDisablebtn(false);
      setStatus("Rejected ❌");
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      setRejectDisablebtn(false);
      setApprovalDisablebtn(false);
      throw new Error(error.message);
    }
  };
  return (
    <div>
      <Card.Body
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0px",
        }}
        className={styles.costsheet__cardbody}
      >
        <div style={{ width: "30%" }}>
          <Card.Title>
            {val.projectHead}{" "}
            <span style={{ color: "gray" }}>({val.projectName})</span>
          </Card.Title>
          <Card.Text>
            <strong>Event Code: </strong>
            {val.eventCode}
          </Card.Text>
          <Card.Text>Created By: {createdBy}</Card.Text>
        </div>
        <Card.Text
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          {status}
        </Card.Text>
        <div className={styles.eventapproval__btns}>
          <Button
            variant="primary"
            onClick={() => approveEvent(val._id)}
            style={{ marginRight: "2px" }}
            disabled={ApprovalDisablebtn}
          >
            approve
          </Button>
          <Button
            variant="primary"
            onClick={() => rejectEvent(val._id)}
            disabled={rejectDisableBtn}
          >
            reject
          </Button>
        </div>
      </Card.Body>
      <hr></hr>
    </div>
  );
};
export default SingleEvent;
