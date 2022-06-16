import React from "react";
import "./Interview.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Interview() {
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [vacstyle, setvacstyle] = useState({ display: "none" });

  const Submitrec = () => {
    if (
      form.InterviewUserName === "" ||
      form.InterviewUserEmail === "" ||
      form.InterviewUserContact === "" ||
      form.InterviewUserAdd === "" ||
      form.InterviewIName === "" ||
      form.InterviewIdepartment === "" ||
      form.InterviewType === "Select" ||
      form.InterviewIdate === "" ||
      form.InterviewIplace === "" ||
      form.InterviewIsalary === "Select" ||
      form.InterviewEdu === "" ||
      form.InterviewUserAdhaar === "" ||
      form.InterviewUserPan === ""
    ) {
      alert("Please fill the required feilds!");
    } else {
      alert("Your response has been submitted successfully!");
    }
  };

  const handlevac = () => {
    setvacstyle({
      display: "inline",
    });
  };

  // Add code here to upload file to server
  const [form, setForm] = useState({
    InterviewUserName: "",
    InterviewUserEmail: "",
    InterviewUserContact: "",
    InterviewUserGender: "",
    InterviewUserMS: "",
    InterviewUserAdd: "",
    InterviewIName: "",
    InterviewIdepartment: "",
    InterviewType: "",
    InterviewIdate: "",
    InterviewIplace: "",
    InterviewIsalary: "",
    InterviewEdu: "",
    InterviewWorkE: "",
    InterviewExpertise: "",
    InterviewQ1R1: "",
    InterviewQ1R2: "",
    InterviewQ1R3: "",
    InterviewQ1R4: "",
    InterviewQ1R5: "",
    InterviewQ2R1: "",
    InterviewQ2R2: "",
    InterviewQ2R3: "",
    InterviewQ2R4: "",
    InterviewQ2R5: "",
    InterviewQ3R1: "",
    Interview32R2: "",
    InterviewQ3R3: "",
    InterviewQ3R4: "",
    InterviewQ3R5: "",
    InterviewQ4R1: "",
    InterviewQ4R2: "",
    InterviewQ4R3: "",
    InterviewQ4R4: "",
    InterviewQ4R5: "",
    InterviewQ5R1: "",
    InterviewQ5R2: "",
    InterviewQ5R3: "",
    InterviewQ5R4: "",
    InterviewQ5R5: "",
    InterviewQ6R1: "",
    InterviewQ6R2: "",
    InterviewQ6R3: "",
    InterviewQ6R4: "",
    InterviewQ6R5: "",
    InterviewUserAdhaar: "",
    InterviewUserPan: "",
    InterviewRemarks: "",
  });
  const navigate = useHistory();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();

    const ImageThumb = ({ image }) => {
      return <img src={URL.createObjectURL(image)} alt={image.name} />;
    };
    const newPerson = { ...form };

    await fetch("http://localhost:5000/interview/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({
      InterviewUserName: "",
      InterviewUserEmail: "",
      InterviewUserContact: "",
      InterviewUserGender: "",
      InterviewUserMS: "",
      InterviewUserAdd: "",
      InterviewIName: "",
      InterviewIdepartment: "",
      InterviewType: "",
      InterviewIdate: "",
      InterviewIplace: "",
      InterviewIsalary: "",
      InterviewEdu: "",
      InterviewWorkE: "",
      InterviewExpertise: "",
      InterviewQ1R1: "",
      InterviewQ1R2: "",
      InterviewQ1R3: "",
      InterviewQ1R4: "",
      InterviewQ1R5: "",
      InterviewQ2R1: "",
      InterviewQ2R2: "",
      InterviewQ2R3: "",
      InterviewQ2R4: "",
      InterviewQ2R5: "",
      InterviewQ3R1: "",
      Interview32R2: "",
      InterviewQ3R3: "",
      InterviewQ3R4: "",
      InterviewQ3R5: "",
      InterviewQ4R1: "",
      InterviewQ4R2: "",
      InterviewQ4R3: "",
      InterviewQ4R4: "",
      InterviewQ4R5: "",
      InterviewQ5R1: "",
      InterviewQ5R2: "",
      InterviewQ5R3: "",
      InterviewQ5R4: "",
      InterviewQ5R5: "",
      InterviewQ6R1: "",
      InterviewQ6R2: "",
      InterviewQ6R3: "",
      InterviewQ6R4: "",
      InterviewQ6R5: "",
      InterviewUserAdhaar: "",
      InterviewUserPan: "",
      InterviewRemarks: "",
    });

    // navigate.push("/");
  }

  return (
    <div>
      <div className="InterviewHeader">
        <img src={require("../../Images/interview.jpg")} />
      </div>

      <form action="/interview/add" onSubmit={onSubmit} method="POST">
        <div className="InterviewMain container">
          <div className="Joiningdiv1heading">
            <h4>Candidate Details</h4>
            <hr></hr>
          </div>

          <div className="Interviewdiv">
            <div id="Interviewdiv1subdiv1">
              <div>
                <label for="InterviewUserName">Name</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="InterviewUserName"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Name"
                  onChange={(e) =>
                    updateForm({ InterviewUserName: e.target.value })
                  }
                />
              </div>
              <div>
                <label for="InterviewUserEmail">Email</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="InterviewUserEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Email"
                  onChange={(e) =>
                    updateForm({ InterviewUserEmail: e.target.value })
                  }
                />
              </div>
              <div>
                <label for="InterviewUserContact">Contact No.</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  id="InterviewUserContact"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Contact No."
                  onChange={(e) =>
                    updateForm({ InterviewUserContact: e.target.value })
                  }
                />
              </div>
              <div>
                <label for="InterviewUserGender">Gender</label>
                <select
                  id="InterviewUserGender"
                  class="form-control"
                  onChange={(e) =>
                    updateForm({ InterviewUserGender: e.target.value })
                  }
                >
                  <option selected>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label for="InterviewUserGender">Married Status</label>
                <select
                  id="InterviewUserGender"
                  class="form-control"
                  onChange={(e) =>
                    updateForm({ InterviewUserGender: e.target.value })
                  }
                >
                  <option selected>Single</option>
                  <option>Married</option>
                  <option>Seprated</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>
              <div>
                <label for="InerviewAdd">Address</label>
                <textarea
                  class="form-control"
                  required
                  id="JoiningUserAdd"
                  onChange={(e) =>
                    updateForm({ InterviewUserAdd: e.target.value })
                  }
                  rows="1"
                ></textarea>
              </div>
            </div>
            <div id="Interviewdiv1subdiv2">
              <div id="upload-box">
                <input
                  type="file"
                  onChange={onImageChange}
                  className="filetype"
                />
                <img src={image} alt="preview image" />
                {/* {file && <ImageThumb image={file} />} */}
                {/* <input type="file" onChange={handleUpload} /> */}
                {/* <p>Filename: {file.name}</p>
                            // <p>File type: {file.type}</p> */}
                {/* <p>File size: {file.size} bytes</p> */}
              </div>
            </div>
          </div>

          <div className="Joiningdiv1heading">
            <h4>Interview Details</h4>
            <hr></hr>
          </div>

          <div className="Interviewdiv2">
            <div>
              <label for="InterviewIName">Interviewed By</label>
              <input
                type="text"
                required
                class="form-control"
                id="InterviewIName"
                aria-describedby="emailHelp"
                onChange={(e) => updateForm({ InterviewIName: e.target.value })}
              />
            </div>
            <div>
              <label for="InterviewIdepartment">Department</label>
              <input
                type="text"
                required
                class="form-control"
                id="InterviewIdepartment"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  updateForm({ InterviewIdepartment: e.target.value })
                }
              />
            </div>
            <div>
              <label for="InterviewType">Interview Mode</label>
              <select
                id="InterviewType"
                required
                class="form-control"
                onChange={(e) => updateForm({ InterviewType: e.target.value })}
              >
                <option selected>Online</option>
                <option>Offline</option>
              </select>
            </div>
            <div>
              <label for="InterviewIdate">Interview Date</label>
              <input
                type="date"
                required
                class="form-control"
                id="InterviewIdate"
                aria-describedby="emailHelp"
                placeholder="Enter Your Interview Date"
                onChange={(e) => updateForm({ InterviewIdate: e.target.value })}
              />
            </div>
            <div>
              <label for="InterviewIplace">Place</label>
              <input
                type="text"
                required
                class="form-control"
                id="InterviewIplace"
                aria-describedby="emailHelp"
                onChange={(e) =>
                  updateForm({ InterviewIplace: e.target.value })
                }
              />
            </div>
            <div>
              <label for="InterviewIsalary">Salary Offered</label>
              <select
                id="InterviewIsalary"
                required
                class="form-control"
                onChange={(e) =>
                  updateForm({ InterviewIsalary: e.target.value })
                }
              >
                <option selected>5000 Rupees/Month</option>
                <option>10000 Rupees/Month</option>
                <option>15000 Rupees/Month</option>
                <option>20000 Rupees/Month</option>
                <option>25000 Rupees/Month</option>
                <option>30000 Rupees/Month</option>
                <option>35000 Rupees/Month</option>
                <option>40000 Rupees/Month</option>
              </select>
            </div>
          </div>

          <div className="Joiningdiv1heading">
            <h4>Educational Qualifications And Expertise</h4>
            <hr></hr>
          </div>

          <div className="Interviewdiv3">
            <div>
              <label for="InterviewEdu">Educational Background</label>
              <textarea
                class="form-control"
                required
                id="InterviewEdu"
                rows="4"
                onChange={(e) => updateForm({ InterviewEdu: e.target.value })}
              ></textarea>
            </div>
            <div>
              <label for="InterviewWorkE">Prior Work Experience</label>
              <textarea
                class="form-control"
                id="InterviewWorkE"
                rows="4"
                onChange={(e) => updateForm({ InterviewWorkE: e.target.value })}
              ></textarea>
            </div>
            <div>
              <label for="InterviewExpertise">Technical Expertise</label>
              <textarea
                class="form-control"
                id="InterviewExpertise"
                rows="4"
                onChange={(e) =>
                  updateForm({ InterviewExpertise: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <div className="Joiningdiv1heading">
            <h4>Scores</h4>
            <hr></hr>
          </div>

          <div className="Interviewdiv4">
            <div className="Interviewdiv4subdiv">
              <div>
                <h5>Administrative and budgetary experience:</h5>
                <p>
                  Does the candidate demonstrate the knowledge of these areas
                  necessary for this position?
                </p>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ1R1"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ1R1">
                  1
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ1R2"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ1R2">
                  2
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ1R3"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ1R3">
                  3
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ1R4"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ1R4">
                  4
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ1R5"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ1R5">
                  5
                </label>
              </div>
              <div>
                <h5>Leadership Ability</h5>
                <p>
                  Did the candidate demonstrate leadership qualities necessary
                  for this position?
                </p>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ2R1"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ2R1">
                  1
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ2R2"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ2R2">
                  2
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ2R3"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ2R3">
                  3
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ2R4"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ2R4">
                  4
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ2R5"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ2R5">
                  5
                </label>
              </div>
              <div>
                <h5>Customer Service Skills</h5>
                <p>
                  Did the candidate demonstrate the knowledge and skills to
                  create a positive customer experience /interaction necessary
                  for this position?
                </p>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ3R1"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ3R1">
                  1
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ3R2"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ3R2">
                  2
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ3R3"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ3R3">
                  3
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ3R4"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ3R4">
                  4
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ3R5"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ3R5">
                  5
                </label>
              </div>
            </div>
            <div className="Interviewdiv4subdiv">
              <div>
                <h5>Communication Skills</h5>
                <p>
                  How were the candidate's communication skills during this
                  interview?
                </p>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ4R1"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ4R1">
                  1
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ4R2"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ4R2">
                  2
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ4R3"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ4R3">
                  3
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ4R4"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ4R4">
                  4
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ4R5"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ4R5">
                  5
                </label>
              </div>
              <div>
                <h5>Candidate Enthusiasm</h5>
                <p>How much interest did the candidate show in the position?</p>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ5R1"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ5R1">
                  1
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ5R2"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ5R2">
                  2
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ5R3"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ5R3">
                  3
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ5R4"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ5R4">
                  4
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ5R5"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ5R5">
                  5
                </label>
              </div>
              <div>
                <h5>Overall Impression and Recommendation</h5>
                <p>
                  Final comments and recommendations proceeding with this
                  candidate?
                </p>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ6R1"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ6R1">
                  1
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ6R2"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ6R2">
                  2
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ6R3"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ6R3">
                  3
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ6R4"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ6R4">
                  4
                </label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="InterviewQ6R5"
                  value="option1"
                />
                <label class="form-check-label" for="InterviewQ6R5">
                  5
                </label>
              </div>
            </div>
          </div>
          <div className="Joiningdiv1heading">
            <h4>Adhaar And Pan Details</h4>
            <hr></hr>
          </div>
          <div className="Interviewdiv5">
            <div>
              <label for="InterviewUserAdhaar">Adhaar Number</label>
              <input
                type="number"
                required
                class="form-control"
                id="InterviewUserAdhaar"
                aria-describedby="emailHelp"
                placeholder="Enter Your Adhaar Number"
              />
            </div>
            <div>
              <label for="InterviewUserPan">Pan Number</label>
              <input
                type="number"
                required
                class="form-control"
                id="InterviewUserPan"
                aria-describedby="emailHelp"
                placeholder="Enter Your Pan Number"
              />
            </div>
            <div>
              <label for="InterviewRemarks">Remarks</label>
              <textarea
                class="form-control"
                id="InterviewRemarks"
                rows="1"
              ></textarea>
            </div>
          </div>

          <div className="Interviewdiv6">
            <button
              type="submit"
              onClick={Submitrec}
              class="btn btn-outline-info"
            >
              Submit
            </button>

            <Link to="/Listint">
              <button type="button" class="btn btn-outline-success">
                Report
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Interview;
