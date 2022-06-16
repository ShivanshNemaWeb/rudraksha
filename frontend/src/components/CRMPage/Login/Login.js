import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [btndisable, setDisable] = useState(false);

  const navigate = useHistory();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("rudraksha"))) {
      navigate.push("/crm");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDisable(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        {
          email,
          password,
        }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("rudraksha", JSON.stringify(data.token));
      setDisable(false);
      navigate.push("/crm");
    } catch (error) {
      setDisable(false);
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className={styles.login__main}>
      <form className={styles.login__form} onSubmit={handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>

        <div style={{ color: "red" }}>{error}</div>
      </form>
    </div>
  );
};
export default Login;
