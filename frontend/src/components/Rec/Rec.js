import React from "react";
import "./Rec.css";
import { useState } from "react";
import { useHistory } from "react-router";

function Rec() {
  const [vacstyle, setvacstyle] = useState({ display: "none" });
  const Submitrec = () => {
    if (
      form.RecUserName === "" ||
      form.RecUserEmail === "" ||
      form.RecUserContact === "" ||
      form.RecUserDeg === "Select" ||
      form.RecUserDesg === "Select" ||
      form.RecUserVac === "Select" ||
      form.RecUserResume === "" ||
      form.RecUserGrad === ""
    ) {
      alert("Please fill the required feilds!");
    } else {
      alert("Your response has been submitted successfully!");
    }
  };
  const handlevac = () => {
    if (form.RecUserVaccination === "Yes") {
      setvacstyle({
        display: "inline",
      });
    } else if (form.RecUserVaccination === "No") {
      setvacstyle({
        display: "none",
      });
    }
  };

  const [form, setForm] = useState({
    RecUserName: "",
    RecUserAge: "",
    RecUserGender: "",
    RecUserEmail: "",
    RecUserContact: "",
    RecUserFather: "",
    RecUserGrad: "",
    RecUserDeg: "",
    RecUserExp: "",
    RecUserDesg: "",
    RecUserVaccination: "",
    RecUserVac: "",
    RecUserResume: "",
  });
  const navigate = useHistory();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/recruit/add", {
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
      inputUName: "",
      RecUserName: "",
      RecUserAge: "",
      RecUserGender: "",
      RecUserEmail: "",
      RecUserContact: "",
      RecUserFather: "",
      RecUserGrad: "",
      RecUserDeg: "",
      RecUserExp: "",
      RecUserDesg: "",
      RecUserVaccination: "",
      RecUserVac: "",
      RecUserResume: "",
    });
    navigate.push("/");
  }

  //   Mapping

  const [E1style, setE1style] = useState({ display: "inline" });
  const [E2style, setE2style] = useState({ display: "none" });
  const [E3style, setE3style] = useState({ display: "none" });
  const [E4style, setE4style] = useState({ display: "none" });
  const [E5style, setE5style] = useState({ display: "none" });

  const handleEd = () => {
    if (form.RecUserGrad === "Metric") {
      setE1style({
        display: "inline",
      });
      setE2style({
        display: "none",
      });
      setE3style({
        display: "none",
      });
      setE4style({
        display: "none",
      });
      setE5style({
        display: "none",
      });
    } else if (form.RecUserGrad === "Higher Secondary(10+2)") {
      setE1style({
        display: "none",
      });

      setE2style({
        display: "inline",
      });
      setE3style({
        display: "none",
      });
      setE4style({
        display: "none",
      });
      setE5style({
        display: "none",
      });
    } else if (form.RecUserGrad === "Under-Graduate") {
      setE1style({
        display: "none",
      });

      setE2style({
        display: "none",
      });
      setE3style({
        display: "inline",
      });
      setE4style({
        display: "none",
      });
      setE5style({
        display: "none",
      });
    } else if (form.RecUserGrad === "Graduate") {
      setE1style({
        display: "none",
      });

      setE2style({
        display: "none",
      });
      setE3style({
        display: "none",
      });
      setE4style({
        display: "inline",
      });
      setE5style({
        display: "none",
      });
    } else if (form.RecUserGrad === "Post-Graduate") {
      setE1style({
        display: "none",
      });

      setE2style({
        display: "none",
      });
      setE3style({
        display: "none",
      });
      setE4style({
        display: "none",
      });
      setE5style({
        display: "inline",
      });
    }
  };

  return (
    <div>
      <div className="RecHeader">
        <img src={require("../../Images/Rec.jpg")} />
      </div>

      <div className="RecMain container">
        <div className="Recdiv1heading">
          <h4>Personal Information</h4>
          <hr></hr>
        </div>
        <form action="/recruit/add" onSubmit={onSubmit} method="POST">
          <div className="Recdiv1">
            <div>
              <label for="RecUserName">User Name</label>
              <input
                type="text"
                required
                class="form-control"
                id="RecUserName"
                value={form.RecUserName}
                aria-describedby="emailHelp"
                placeholder="Enter Your Name"
                onChange={(e) => updateForm({ RecUserName: e.target.value })}
              />
            </div>

            <div>
              <label for="RecUserAge">Age</label>
              <input
                type="text"
                class="form-control"
                id="RecUserAge"
                value={form.RecUserAge}
                aria-describedby="emailHelp"
                placeholder="Enter Your Age"
                onChange={(e) => updateForm({ RecUserAge: e.target.value })}
              />
            </div>

            <div>
              <label for="RecUserGender">Gender</label>
              <select
                id="RecUserGender"
                class="form-control"
                value={form.RecUserGender}
                onChange={(e) => updateForm({ RecUserGender: e.target.value })}
              >
                <option selected>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <div className="Recdiv1heading">
            <h4>Contact</h4>
            <hr></hr>
          </div>

          <div className="Recdiv2">
            <div>
              <label for="RecUserEmail">Email</label>
              <input
                type="text"
                required
                class="form-control"
                id="RecUserEmail"
                value={form.RecUserEmail}
                aria-describedby="emailHelp"
                placeholder="Enter Your Email"
                onChange={(e) => updateForm({ RecUserEmail: e.target.value })}
              />
            </div>

            <div>
              <label for="RecUserContact">Contact No.</label>
              <input
                type="text"
                required
                class="form-control"
                id="RecUserContact"
                value={form.RecUserContact}
                aria-describedby="emailHelp"
                placeholder="Enter Your Contact No."
                onChange={(e) => updateForm({ RecUserContact: e.target.value })}
              />
            </div>

            <div>
              <label for="RecUserFather">Father's Name</label>
              <input
                type="text"
                class="form-control"
                id="RecUserFather"
                value={form.RecUserFather}
                aria-describedby="emailHelp"
                placeholder="Enter Your Father's Name"
                onChange={(e) => updateForm({ RecUserFather: e.target.value })}
              />
            </div>
          </div>

          <div className="Recdiv1heading">
            <h4>Qualifications</h4>
            <hr></hr>
          </div>

          <div className="Recdiv3">
            <div>
              <label for="RecUserGrad">Education</label>
              <select
                id="RecUserGrad"
                required
                value={form.RecUserGrad}
                onClick={() => handleEd()}
                class="form-control"
                onChange={(e) => updateForm({ RecUserGrad: e.target.value })}
              >
                <option>Select</option>
                <option>Metric</option>
                <option>Higher Secondary(10+2)</option>
                <option>Under-Graduate</option>
                <option>Graduate</option>
                <option>Post-Graduate</option>
              </select>
            </div>

            <div>
              <label for="RecUserDeg">Degree</label>
              <select
                id="RecUserDeg"
                required
                value={form.RecUserDeg}
                style={E1style}
                class="form-control"
                onChange={(e) => updateForm({ RecUserDeg: e.target.value })}
              >
                <option selected>Select</option>

                <option>Science</option>
              </select>

              <select
                id="RecUserDeg"
                required
                value={form.RecUserDeg}
                style={E2style}
                class="form-control"
                onChange={(e) => updateForm({ RecUserDeg: e.target.value })}
              >
                <option selected>Select</option>

                <option>PCM</option>
                <option>PCB</option>
                <option>Commerce</option>
                <option>Arts</option>
              </select>

              <select
                id="RecUserDeg"
                required
                value={form.RecUserDeg}
                style={E3style}
                class="form-control"
                onChange={(e) => updateForm({ RecUserDeg: e.target.value })}
              >
                <option selected>Select</option>

                <option>NA</option>
                <option>BE/BTech</option>
                <option>BCom</option>
                <option>Bsc</option>
                <option>BA</option>
                <option>LAW</option>
                <option>BBA</option>
                <option>BCA</option>
              </select>

              <select
                id="RecUserDeg"
                required
                value={form.RecUserDeg}
                style={E4style}
                class="form-control"
                onChange={(e) => updateForm({ RecUserDeg: e.target.value })}
              >
                <option selected>Select</option>

                <option>NA</option>
                <option>BE/BTech</option>
                <option>BCom</option>
                <option>Bsc</option>
                <option>BA</option>
                <option>LAW</option>
                <option>BBA</option>
                <option>BCA</option>
              </select>

              <select
                id="RecUserDeg"
                required
                value={form.RecUserDeg}
                style={E5style}
                class="form-control"
                onChange={(e) => updateForm({ RecUserDeg: e.target.value })}
              >
                <option selected>Select</option>

                <option>NA</option>
                <option>MTech</option>
                <option>MCom</option>
                <option>Msc</option>
                <option>MBA</option>
                <option>LAW</option>
                <option>MA</option>
                <option>MCA</option>
              </select>
            </div>

            <div>
              <label for="RecUserExp">Experience</label>
              <select
                id="RecUserExp"
                value={form.RecUserExp}
                class="form-control"
                onChange={(e) => updateForm({ RecUserExp: e.target.value })}
              >
                <option selected>Select</option>
                <option>No Experience</option>
                <option>0-2 Years</option>
                <option>2-4 Years</option>
                <option>4-6 Years</option>
                <option>6-8 Years</option>
                <option>8-10 Years</option>
                <option>10 Years+</option>
              </select>
            </div>

            <div>
              <label for="RecUserDesg">Designation</label>
              <select
                id="RecUserDesg"
                required
                value={form.RecUserDesg}
                class="form-control"
                onChange={(e) => updateForm({ RecUserDesg: e.target.value })}
              >
                <option selected>Select</option>

                <option>Branch Manager</option>
                <option>Custom Manager</option>
                <option>Operation Manager</option>
                <option>Admin Manager</option>
                <option>Sales Manager</option>
                <option>Relationship Manager</option>
                <option>HR Manager</option>
                <option>Receptionist</option>
                <option>Guard</option>
                <option>Support Staff</option>
              </select>
            </div>

            <div>
              <label for="RecUserVaccination">Vaccinated</label>
              <select
                id="RecUserVaccination"
                required
                value={form.RecUserVaccination}
                class="form-control"
                onClick={() => handlevac()}
                onChange={(e) =>
                  updateForm({ RecUserVaccination: e.target.value })
                }
              >
                <option selected>Select</option>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div style={vacstyle}>
              <label for="RecUserVac">Vaccination Certificate 1</label>
              <input
                type="file"
                value={form.RecUserVac}
                onChange={(e) => updateForm({ RecUserVac: e.target.value })}
              />
            </div>

            <div style={vacstyle}>
              <label for="RecUserVac">Vaccination Certificate 2</label>
              <input
                type="file"
                value={form.RecUserVac}
                onChange={(e) => updateForm({ RecUserVac: e.target.value })}
              />
            </div>

            <div className="ResumeFile">
              <label for="RecUserResume">Resume</label>
              <input
                type="file"
                required
                value={form.RecUserResume}
                onChange={(e) => updateForm({ RecUserResume: e.target.value })}
              />
            </div>
          </div>
          <div className="Recdiv4">
            <button
              type="submit"
              onClick={Submitrec}
              class="btn btn-outline-info"
            >
              Submit Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Rec;
