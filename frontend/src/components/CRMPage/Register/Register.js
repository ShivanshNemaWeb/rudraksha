import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";

const Register = () => {
  const [data,setData]=useState({
    empId:"",
    password:""
  })
  const [error, setError] = useState("");
  const [btndisable, setDisable] = useState(false);

  const navigate = useHistory();

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("rudraksha"))) {
  //     navigate.push("/crm");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setError("");
    setDisable(true);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/createEmployeeCredentials`,
    data,
    {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("rudraksha")
        )}`,
      },
    }
    ).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      setDisable(false);
      console.log(error);
      setError(error.message);
    })
  };
  const upData=(e)=>{
e.preventDefault();
setData({
    ...data,
    [e.target.name]:e.target.value
})
  }
  return (
    <div className={styles.login__main}>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <h3>Register</h3>

        <div className="mb-3">
          <label>Employee Id</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Id"
            name="empId"
            value={data.empId}
            onChange={upData}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={data.password}
            onChange={upData}
          />
        </div>

        <div className="d-grid mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={btndisable}
          >
            Submit
          </button>
        </div>
       
    
        <div style={{ color: "red" }}>{error}</div>
      </form>
    </div>
  );
};
export default Register;
