import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "./CostSheetTable/CostSheet.module.css";

const AllCostSheets = () => {
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useHistory();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("rudraksha"))) {
      return navigate.push("/");
    }
    const fetchDetails = async () => {
      try {
        setError("");
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/event/getEventsofuser`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("rudraksha")
              )}`,
            },
          }
        );
        console.log(data);
        if (data.error) throw new Error(data.error);
        setEvents(data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDetails();
  }, []);
  return (
    <div className={styles.costsheet__main}>
      <div className={styles.addcostsheet}>
        <Button variant="primary">
          <a
            href="/costsheetdata"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Add Cost Sheet Data
          </a>
        </Button>
      </div>

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

        {events.length > 0 ? (
          <div>
            {events.map((val) => (
              <div key={val.eventNumber}>
                <Card.Body
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0px",
                  }}
                  className={styles.costsheet__cardbody}
                >
                  <div>
                    <Card.Title>
                      {val.projectHead}{" "}
                      <span style={{ color: "gray" }}>({val.projectName})</span>
                    </Card.Title>
                    <Card.Text>
                      <strong>Event Code: </strong>
                      {val.eventCode}
                    </Card.Text>
                  </div>
                  <Card.Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {val.status === "Approved" && "approved ✔️"}
                    {val.status === "Rejected" && "Rejected ❌"}
                    {val.status === "Pending" && "Pending 🕖"}
                  </Card.Text>

                  <Button
                    variant="primary"
                    disabled={val.status == "Approved" ? true : false}
                  >
                    <a
                      href={`/costsheetdata?event=${val._id}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Edit Cost Sheet
                    </a>
                  </Button>
                </Card.Body>
                <hr></hr>
              </div>
            ))}
          </div>
        ) : (
          <center>
            <h3 style={{ color: "gray" }}>No Events Added!</h3>
          </center>
        )}
      </div>
    </div>
  );
};
export default AllCostSheets;
