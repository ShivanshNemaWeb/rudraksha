import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import styles from "./Home.module.css";
const Home = () => {
  const navigate = useHistory();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("rudraksha"))) {
      return navigate.push("/crmlogin");
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate.push("/crmlogin");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/crm">CRM PAGE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/rms" className={styles.crm__nav}>
              RMS
            </Nav.Link>
            <Nav.Link href="#features" className={styles.crm__nav}>
              PMS
            </Nav.Link>
            <Nav.Link href="/LMS" className={styles.crm__nav}>
              LMS
            </Nav.Link>
            <Nav.Link href="/AMS" className={styles.crm__nav}>
              AMS
            </Nav.Link>

            <Nav.Link href="/addEmployee" className={styles.crm__nav}>
              EMS
            </Nav.Link>
            <Nav.Link href="/addVendor" className={styles.crm__nav}>
              VMS
            </Nav.Link>
            <Nav.Link href="/VIMS" className={styles.crm__nav}>
              VIMS
            </Nav.Link>
            <Nav.Link href="/addEvent" className={styles.crm__nav}>
              Add Event
            </Nav.Link>
            <Nav.Link href="/costsheet" className={styles.crm__nav}>
              Cost Sheet
            </Nav.Link>
            <Nav.Link className={styles.crm__nav} onClick={logout}>
              Log Out
            </Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
      <div className={styles.crm__img}></div>
    </>
  );
};
export default Home;
