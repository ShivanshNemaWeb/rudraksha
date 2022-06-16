import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SingleEvent from "./SingleEvent";
import styles from "./Eventapproval.module.css";
const EventApproval = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const navigate = useHistory();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("rudraksha"))) {
      return navigate.push("/");
    }
    try {
      const fetchDetails = async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/event/getAllEvents`,
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
        setEvents(data.data);
      };
      fetchDetails();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }, []);

  return (
    <div className={styles.eventapproval__main}>
      <div className={styles.eventapproval__shadow}>
        <div className={styles.eventapproval__head}>
          <img
            src="/RWFLOGO.png"
            alt="logo"
            width={90}
            className={styles.eventapproval__logo}
          />
          <div className={styles.eventapproval__form__heading}>
            Events Approving
          </div>
        </div>
        {events.length > 0 ? (
          <div>
            {events.map((val) => (
              <SingleEvent val={val} key={val._id} />
            ))}
          </div>
        ) : (
          <div style={{ color: "black" }}>Loading...</div>
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};
export default EventApproval;
