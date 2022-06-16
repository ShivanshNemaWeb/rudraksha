import { useState } from "react";
import VendorTypeChart from "../Reports/VendorReport/VendorTypeChart";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./Vendor.module.css";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import logo from "../Reports/logo";

const Vendor = () => {
  const [vendorName, setvendorName] = useState("");
  const [vendorEmail, setvendorEmail] = useState("");
  const [vendorPhoneNumber, setvendorPhoneNumber] = useState("");
  const [vendorShopName, setvendorShopName] = useState("");
  const [vendorShopAddress, setvendorShopAddress] = useState("");
  const [vendorType, setvendorType] = useState("");
  const [vendorRepName, setvendorRepName] = useState("");
  const [vendorRepEmail, setvendorRepEmail] = useState("");
  const [vendorRepPhone, setvendorRepPhone] = useState("");
  const [vendorBankName, setvendorBankName] = useState("");
  const [vendorACNumber, setvendorACNumber] = useState("");
  const [vendorGST, setvendorGST] = useState("");
  const [vendorUpi, setvendorUpi] = useState("");
  const [UPIType, setUPIType] = useState("");
  const [vendorIFSC, setvendorIFSC] = useState("");
  const [remarks, setremarks] = useState("");

  const [btnData, setBtnData] = useState("Add Vendor");
  const [error, setError] = useState("");
  const [disablebtn, setDisableBtn] = useState(false);

  const [reportDisability, setreportDisability] = useState(false);
  const [reportbtnData, setReportBtnData] = useState("Get Report");

  const [barChartVisibility, setbarChartVisibility] = useState(false);
  const [barChartbtnData, setbarChartBtnData] = useState(
    "Get Bar Chart Report"
  );
  //getting all vendors report
  const getVendorReport = async () => {
    setReportBtnData("Downloading Report...");
    setreportDisability(true);
    console.log(JSON.parse(localStorage.getItem("rudraksha")));
    const res = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/vendor/createVendorReport`
      )
      .then(async (res) => {
        const report = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/vendor/getVendorReport`,
            {
              responseType: "blob",
            }
          )
          .then((result) => {
            const pdfBlob = new Blob([result.data], {
              type: "application/pdf",
            });

            saveAs(pdfBlob, "vendorReport.pdf");
            setReportBtnData("Get Report");
            setreportDisability(false);
          })
          .catch((error) => {
            setError(error.message);
            setReportBtnData("Get Report");
            setreportDisability(false);
            console.log(error);
          });
      });
  };

  const getVendorChartReport = async () => {
    setbarChartBtnData("Downloading report...");
    setbarChartVisibility(true);
    const doc = new jsPDF();
    const pdfTable = document.getElementById("barchart");
    if (pdfTable) {
      var html = htmlToPdfmake(pdfTable.innerHTML);
      const documentDefinition = {
        content: [
          {
            columns: [
              {
                width: "*",
                stack: [
                  {
                    image: logo,
                    width: 70,
                    alignment: "center",
                    margin: [40, 0, 0, 0],
                    padding: [0, 0, 0, 0],
                  },
                ],
              },
              {
                width: "auto",
                stack: [
                  {
                    style: "h1",
                    text: "RUDRAKSHA WELFARE FOUNDATION",
                    alignment: "center",
                    decoration: "underline",
                  },
                ],
              },
            ],
          },
          ...html,
        ],
        styles: {
          h1: {
            fontSize: 20,
            bold: true,
            margin: [0, 20, 50, 0],
            padding: [0, 0, 0, 0],
          },
        },
      };
      setbarChartBtnData("Get Bar Chart Report");
      setbarChartVisibility(false);
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).download("vendorbarchart.pdf");
    } else {
      setError("Unable to Create Report, Please Try Again!");
      setbarChartBtnData("Get Bar Chart Report");
      setbarChartVisibility(false);
    }
  };

  const handleSubmitVendorForm = async (e) => {
    e.preventDefault();
    setError("");
    var format = /[1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var ifscregex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (format.test(vendorName) || format.test(vendorRepName))
      return setError("Special Characters are not allowed in vendor names");
    else if (!ifscregex.test(vendorIFSC)) {
      return setError("Invalid IFSC Code");
    }
    setDisableBtn(true);
    setBtnData("Loading...");
    try {
      const vendorDetails = {
        vendorName,
        vendorShopName,
        vendorShopAddress,
        vendorGST,
        vendorACNumber,
        vendorIFSC,
        vendorBankName,
        vendorPhoneNumber,
        vendorUpi,
        UPIType,
        vendorType,
        vendorRepName,
        vendorRepPhone,
        vendorEmail,
        vendorRepEmail,
        remarks,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/vendor/addVendor`,
        vendorDetails,
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

      setvendorName("");
      setvendorEmail("");
      setvendorPhoneNumber("");
      setvendorShopName("");
      setvendorShopAddress("");
      setvendorType("");
      setvendorRepName("");
      setvendorRepEmail("");
      setvendorRepPhone("");
      setvendorBankName("");
      setvendorACNumber("");
      setvendorGST("");
      setvendorUpi("");
      setUPIType("");
      setvendorIFSC("");
      setremarks("");

      setTimeout(() => {
        setBtnData("Add Vendor");
      }, 2000);

      setDisableBtn(false);
      setBtnData("Vendor Added ✔");
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setDisableBtn(false);
      setBtnData("Add Vendor");
    }
  };
  return (
    <div className={styles.vendor__main}>
      <div className={styles.vendor__shadow}>
        <div className={styles.vendor__head}>
          <img
            src="/RWFLOGO.png"
            alt="logo"
            width={90}
            className={styles.vendor__logo}
          />
          <div className={styles.vendor__form__heading}>Vendor Details</div>
        </div>
        <Form className={styles.vendor__form} onSubmit={handleSubmitVendorForm}>
          <div className={styles.vendor__form2}>
            <div>
              <h4 className={styles.vendor__heading}>
                Vendor Personal Details
              </h4>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorname"
                    value={vendorName}
                    onChange={(e) => setvendorName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Vendor Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="vendoremail"
                    value={vendorEmail}
                    onChange={(e) => setvendorEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Vendor Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="phonenumber"
                    value={vendorPhoneNumber}
                    onChange={(e) => setvendorPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor Shop Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorShopName"
                    value={vendorShopName}
                    onChange={(e) => setvendorShopName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Vendor Shop Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorShopAddress"
                    value={vendorShopAddress}
                    onChange={(e) => setvendorShopAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                  <Form.Label>Vendor Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={vendorType}
                    onChange={(e) => setvendorType(e.target.value)}
                    required
                  >
                    <option value="">Choose the Vendor Type</option>
                    <option>Admin Support</option>
                    <option>Boutique</option>
                    <option>Carpenter</option>
                    <option>Car Service</option>
                    <option>Car Appliances</option>
                    <option>Chemical</option>
                    <option>Cosmetics</option>
                    <option>Electrical</option>
                    <option>Food</option>
                    <option>Gardener</option>
                    <option>Hardware</option>
                    <option>IT Equipments</option>
                    <option>Labour</option>
                    <option>Literature</option>
                    <option>Medicine</option>
                    <option>Mechanic</option>
                    <option>Paint</option>
                    <option>Plumber</option>
                    <option>Repair</option>
                    <option>Software</option>
                    <option>Stationary</option>
                    <option>Sweepers</option>
                    <option>Steel</option>
                    <option>Security</option>
                    <option>Taxi</option>
                    <option>Tutor</option>
                    <option>Technical Expert</option>
                    <option>Tailor</option>
                    <option>Vegetables</option>
                    <option>Work</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </div>
            <div className={styles.employee__categories}>
              <h4 className={styles.vendor__heading}>Vendor Rep Details</h4>
              <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor Rep Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorRepName"
                    value={vendorRepName}
                    onChange={(e) => setvendorRepName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor Rep Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorRepEmail"
                    value={vendorRepEmail}
                    onChange={(e) => setvendorRepEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor Rep Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="vendorRepPhone"
                    value={vendorRepPhone}
                    onChange={(e) => setvendorRepPhone(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
            </div>
            <div className={styles.employee__categories}>
              <h4 className={styles.vendor__heading}>Vendor Bank Details</h4>
              <Row className="mb-2">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor Bank Name</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={vendorBankName}
                    onChange={(e) => setvendorBankName(e.target.value)}
                    required
                  >
                    <option value="">Choose the Bank Name</option>
                    <option>State Bank of India</option>
                    <option>Punjab National Bank</option>
                    <option>Bank of Baroda</option>
                    <option>Canara Bank</option>
                    <option>Union Bank of India</option>
                    <option>Bank of India</option>
                    <option>Indian Bank</option>
                    <option>Central Bank of India</option>
                    <option>Indian Overseas Bank</option>
                    <option>UCO Bank</option>
                    <option>Bank of Maharashtra</option>
                    <option>Punjab & Sind Bank</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorACNumber"
                    value={vendorACNumber}
                    onChange={(e) => setvendorACNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor GST</Form.Label>
                  <Form.Control
                    type="Number"
                    name="vendorGST"
                    value={vendorGST}
                    onChange={(e) => setvendorGST(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor UPI</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorUpi"
                    value={vendorUpi}
                    onChange={(e) => setvendorUpi(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>UPI Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setUPIType(e.target.value)}
                    required
                  >
                    <option>Select the UPI Payment Type</option>
                    <option>Gpay</option>
                    <option>Phone Pay</option>
                    <option>Paytm</option>
                    <option>Bheem</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                  <Form.Label>Vendor IFSC</Form.Label>
                  <Form.Control
                    type="text"
                    name="vendorIFSC"
                    value={vendorIFSC}
                    onChange={(e) => setvendorIFSC(e.target.value)}
                    required
                  />
                </Form.Group>
              </Row>
            </div>
            <div className={styles.employee__categories}>
              <h4 className={styles.vendor__heading}>Remarks</h4>
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
        <div
          id="barchart"
          style={{ visibility: "hidden", position: "absolute", top: 0 }}
        >
          <VendorTypeChart />
        </div>
        <Button
          variant="outline-primary"
          onClick={getVendorReport}
          disabled={reportDisability}
        >
          {reportbtnData}
        </Button>
        <Button
          variant="outline-primary"
          onClick={getVendorChartReport}
          disabled={barChartVisibility}
        >
          {barChartbtnData}
        </Button>
      </div>
    </div>
  );
};
export default Vendor;
