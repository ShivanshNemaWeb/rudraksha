import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Reception.module.css";
import axios from "axios";

const Reception = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Gender, setgender] = useState("");
  const [photo, setPhoto] = useState("");
  const [accompanies, setaccompanies] = useState("");
  const [purpose, setpurpose] = useState("");
  const [remarks, setremarks] = useState("");

  //submit btn,
  const [btnData, setBtnData] = useState("Add Guest Details");
  const [error, setError] = useState("");
  const [disablebtn, setDisableBtn] = useState(false);

  //profile photo of guest ref
  const photoref = useRef();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setError("");
      var format = /[1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (format.test(name))
        return setError("Special Characters are not allowed in names");

      setDisableBtn(true);
      setBtnData("Loading...");
      const formdata = new FormData();
      formdata.set("name", name);
      formdata.set("phoneNumber", phoneNumber);
      formdata.set("Gender", Gender);
      formdata.append("photo", photo);
      formdata.set("accompanies", accompanies);
      formdata.set("purpose", purpose);
      formdata.set("remarks", remarks);

      const data = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/reception/addReceptionGuest`,
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
      console.log(data);
      if (data.data.error) {
        throw new Error(data.data.error);
      }
      photoref.current.value = "";
      setName("");
      setPhoneNumber("");
      setgender("");
      setaccompanies("");
      setpurpose("");
      setremarks("");
      setTimeout(() => {
        setBtnData("Add Guest Details");
      }, 2000);
      setDisableBtn(false);
      setBtnData("Details Added ✔");
      setError("");
    } catch (error) {
      setDisableBtn(false);
      setBtnData("Add Employee");
      setError(error.message);
    }
  };
  return (
    <div className={styles.reception__main}>
      <div className={styles.reception__shadow}>
        <div className={styles.reception__head}>
          <img
            src="/RWFLOGO.png"
            alt="logo"
            width={90}
            className={styles.reception__logo}
          />
          <div className={styles.reception__form__heading}>
            Reception Management System
          </div>
        </div>
        <Form className={styles.reception__form} onSubmit={handleSubmitForm}>
          <div className={styles.reception__form2}>
            <div>
              <h4 className={styles.reception__heading}>Personal Details</h4>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="phonenumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={Gender}
                    onChange={(e) => setgender(e.target.value)}
                    required
                  >
                    <option value="">Choose the gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="firstVaccinationDate"
                    ref={photoref}
                    onChange={(e) => setPhoto(e.target.files[0])}
                    required
                  />
                </Form.Group>
              </Row>
            </div>
            <div>
              <h4 className={styles.reception__heading}>Personal Details</h4>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Accompanies</Form.Label>
                  <Form.Control
                    type="Number"
                    name="accompanies"
                    value={accompanies}
                    onChange={(e) => setaccompanies(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={purpose}
                    onChange={(e) => setpurpose(e.target.value)}
                    required
                  >
                    <option value="">What is the purpose?</option>
                    <option value="Official">Official</option>
                    <option value="Personal">Personal</option>
                    <option value="Casual">Casual</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </div>
            <div className={styles.reception__categories}>
              <h4 className={styles.reception__heading}>Remarks</h4>
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
  );
};
export default Reception;
