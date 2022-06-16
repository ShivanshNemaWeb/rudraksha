import React from "react";
import "./Joining.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function Joining() {
  const Submitrec = () => {
    if (
      form.JoiningUserName === "" ||
      form.JoiningUserEmail === "" ||
      form.JoiningUserContact === "" ||
      form.JoiningUserFather === "" ||
      form.JoiningUserAdd === "" ||
      form.JoiningUserPlace === "" ||
      form.JoiningUserDate === "" ||
      form.JoiningUserBankName === "" ||
      form.JoiningUserAcno === "" ||
      form.JoiningUserIFSC === "" ||
      form.JoiningUserBranch === "" ||
      form.JoiningUserAcType === "" ||
      form.JoiningUserWallet === ""
    ) {
      alert("Please fill the required feilds!");
    } else {
      alert("Your response has been submitted successfully!");
    }
  };

  const [form, setForm] = useState({
    JoiningUserName: "",
    JoiningUserAge: "",
    JoiningUserGender: "",
    JoiningUserEmail: "",
    JoiningUserContact: "",
    JoiningUserFather: "",
    JoiningUserMother: "",
    JoiningUserBlood: "",
    JoiningUserAdd: "",
    JoiningUserUniversity: "",
    JoiningUserDeg: "",
    JoiningUserExp: "",
    JoiningUserDesg: "",
    JoiningUserDesg: "",
    JoiningUserDesg: "",
    JoiningUserDesg: "",
    JoiningUserDesg: "",
    JoiningUserDesg: "",
    JoiningUserPlace: "",
    JoiningUserDate: "",
    JoiningUserBankName: "",
    JoiningUserAcno: "",
    JoiningUserIFSC: "",
    JoiningUserBranch: "",
    JoiningUserAcType: "",
    JoiningUserWallet: "",
  });
  const navigate = useHistory();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    const newPerson = { ...form };

    await fetch("http://localhost:5000/joining/add", {
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
      JoiningUserName: "",
      JoiningUserAge: "",
      JoiningUserGender: "",
      JoiningUserEmail: "",
      JoiningUserContact: "",
      JoiningUserFather: "",
      JoiningUserMother: "",
      JoiningUserBlood: "",
      JoiningUserAdd: "",
      JoiningUserUniversity: "",
      JoiningUserDeg: "",
      JoiningUserExp: "",
      JoiningUserDesg: "",
      JoiningUserDesg: "",
      JoiningUserDesg: "",
      JoiningUserDesg: "",
      JoiningUserDesg: "",
      JoiningUserDesg: "",
      JoiningUserPlace: "",
      JoiningUserDate: "",
      JoiningUserBankName: "",
      JoiningUserAcno: "",
      JoiningUserIFSC: "",
      JoiningUserBranch: "",
      JoiningUserAcType: "",
      JoiningUserWallet: "",
    });
    navigate.push("/");
  }

  return (
    <div>
      <div className="JoiningHeader">
        <img src={require("../../Images/joining.jpg")} />
      </div>
      <form action="/joining/add" onSubmit={onSubmit} method="POST">
        <div className="JoiningMain container">
          <div className="Joiningdiv1heading">
            <h4>Personal Information</h4>
            <hr></hr>
          </div>
          <div className="Joiningdiv1">
            <div>
              <label for="JoiningUserName">UserName</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserName"
                aria-describedby="emailHelp"
                placeholder="Enter Your Name"
                onChange={(e) =>
                  updateForm({ JoiningUserName: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserAge">Age</label>
              <input
                type="text"
                class="form-control"
                id="JoiningUserAge"
                aria-describedby="emailHelp"
                placeholder="Enter Your Age"
                onChange={(e) => updateForm({ JoiningUserAge: e.target.value })}
              />
            </div>

            <div>
              <label for="JoiningUserGender">Gender</label>
              <select
                id="JoiningUserGender"
                class="form-control"
                onChange={(e) =>
                  updateForm({ JoiningUserGender: e.target.value })
                }
              >
                <option selected>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <div className="Joiningdiv1heading">
            <h4>Contact</h4>
            <hr></hr>
          </div>

          <div className="Joiningdiv2">
            <div>
              <label for="JoiningUserEmail">Email</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserEmail"
                aria-describedby="emailHelp"
                placeholder="Enter Your Email"
                onChange={(e) =>
                  updateForm({ JoiningUserEmail: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserContact">Contact No.</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserContact"
                aria-describedby="emailHelp"
                placeholder="Enter Your Contact No."
                onChange={(e) =>
                  updateForm({ JoiningUserContact: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserFather">Father's Name</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserFather"
                aria-describedby="emailHelp"
                placeholder="Enter Your Father's Name"
                onChange={(e) =>
                  updateForm({ JoiningUserFather: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserMother">Mother's Name</label>
              <input
                type="text"
                class="form-control"
                id="JoiningUserMother"
                aria-describedby="emailHelp"
                placeholder="Enter Your Mother's Name"
                onChange={(e) =>
                  updateForm({ JoiningUserMother: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserBlood">Blood Group</label>
              <select
                id="JoiningUserBlood"
                class="form-control"
                onChange={(e) =>
                  updateForm({ JoiningUserBlood: e.target.value })
                }
              >
                <option selected>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div>
              <label for="JoiningUserAdd">Address</label>
              <textarea
                class="form-control"
                required
                id="JoiningUserAdd"
                rows="1"
                onChange={(e) => updateForm({ JoiningUserAdd: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="Joiningdiv1heading">
            <h4>Qualifications</h4>
            <hr></hr>
          </div>

          <div className="Joiningdiv3">
            <div>
              <label for="JoiningUserUniversity">University</label>
              <input
                type="text"
                class="form-control"
                id="JoiningUserUniversity"
                aria-describedby="emailHelp"
                placeholder="Enter Your University Name"
                onChange={(e) =>
                  updateForm({ JoiningUserUniversity: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserDeg">Degree</label>
              <select
                id="JoiningUserDeg"
                class="form-control"
                onChange={(e) => updateForm({ JoiningUserDeg: e.target.value })}
              >
                <option selected>BE</option>
                <option>BTech</option>
              </select>
            </div>

            <div>
              <label for="JoiningUserExp">Experience</label>
              <select
                id="JoiningUserExp"
                required
                class="form-control"
                onChange={(e) => updateForm({ JoiningUserExp: e.target.value })}
              >
                <option selected>No Experience</option>
                <option>1 Year</option>
                <option>2 Year</option>
                <option>3 Year</option>
                <option>5 Year +</option>
                <option>10 Year +</option>
              </select>
            </div>
          </div>
          <div className="Joiningdiv1heading">
            <h4>Joining Details</h4>
            <hr></hr>
          </div>

          <div className="JoiningdivTable">
            <table class="table table-responsive">
              <thead className="JoinTableHead">
                <tr>
                  <th scope="col">Serial</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Date Of Joining</th>
                  <th scope="col">Date Of Releasing</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Place</th>
                </tr>
              </thead>
              <tbody className="JoinTable">
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <select
                      id="JoiningUserDesg"
                      class="form-control"
                      onChange={(e) =>
                        updateForm({ JoiningUserDesg: e.target.value })
                      }
                    >
                      <option selected>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      id="JoiningUserDesg"
                      class="form-control"
                      onChange={(e) =>
                        updateForm({ JoiningUserDesg: e.target.value })
                      }
                    >
                      <option selected>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <select
                      id="JoiningUserDesg"
                      class="form-control"
                      onChange={(e) =>
                        updateForm({ IJoiningUserDesg: e.target.value })
                      }
                    >
                      <option selected>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      id="JoiningUserDesg"
                      class="form-control"
                      onChange={(e) =>
                        updateForm({ JoiningUserDesg: e.target.value })
                      }
                    >
                      <option selected>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <select
                      id="JoiningUserDesg"
                      class="form-control"
                      onChange={(e) =>
                        updateForm({ JoiningUserDesg: e.target.value })
                      }
                    >
                      <option selected>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <select
                      id="JoiningUserDesg"
                      class="form-control"
                      onChange={(e) =>
                        updateForm({ JoiningUserDesg: e.target.value })
                      }
                    >
                      <option selected>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="Joiningdiv1heading">
            <h4>Joining Details</h4>
            <hr></hr>
          </div>

          <div className="Joiningdiv4">
            <div>
              <label for="JoiningUserPlace">Joining Place</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserPlace"
                aria-describedby="emailHelp"
                placeholder="Enter Your Joining Place"
                onChange={(e) =>
                  updateForm({ JoiningUserPlace: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserDate">Joining Date</label>
              <input
                type="date"
                required
                class="form-control"
                id="JoiningUserDate"
                aria-describedby="emailHelp"
                placeholder="Enter Your Joining Date"
                onChange={(e) =>
                  updateForm({ JoiningUserDate: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserDesg">Designation</label>
              <select
                id="JoiningUserDesg"
                required
                class="form-control"
                onChange={(e) =>
                  updateForm({ JoiningUserDesg: e.target.value })
                }
              >
                <option selected>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="Joiningdiv1heading">
            <h4>Bank Details</h4>
            <hr></hr>
          </div>

          <div className="Joiningdiv4">
            <div>
              <label for="JoiningUserBankName">Bank Name</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserBankName"
                aria-describedby="emailHelp"
                placeholder="Enter Your Bank Account Number"
                onChange={(e) =>
                  updateForm({ JoiningUserBankName: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserAcno">Account No.</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserAcno"
                aria-describedby="emailHelp"
                placeholder="Enter Your Account Number"
                onChange={(e) =>
                  updateForm({ JoiningUserAcno: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserIFSC">IFSC Code</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserIFSC"
                aria-describedby="emailHelp"
                placeholder="Enter Your IFSC Code"
                onChange={(e) =>
                  updateForm({ JoiningUserIFSC: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserBranch">Branch Name</label>
              <input
                type="text"
                required
                class="form-control"
                id="JoiningUserBranch"
                aria-describedby="emailHelp"
                placeholder="Enter Your Branch Name"
                onChange={(e) =>
                  updateForm({ JoiningUserBranch: e.target.value })
                }
              />
            </div>

            <div>
              <label for="JoiningUserAcType">Account Type</label>
              <select
                id="JoiningUserAcType"
                required
                class="form-control"
                onChange={(e) =>
                  updateForm({ JoiningUserAcType: e.target.value })
                }
              >
                <option selected>Saving</option>
                <option>Current</option>
              </select>
            </div>

            <div>
              <label for="JoiningUserWallet">Wallet Type</label>
              <select
                id="JoiningUserWallet"
                required
                class="form-control"
                onChange={(e) =>
                  updateForm({ JoiningUserWallet: e.target.value })
                }
              >
                <option selected>Paytm</option>
                <option>Google Pay</option>
                <option>PhonePe</option>
                <option>Bhim UPI</option>
              </select>
            </div>
          </div>

          <div className="JoinBtn">
            <button
              type="submit"
              onClick={Submitrec}
              class="btn btn-outline-info"
            >
              Submit
            </button>
            <Link to="/Joiningreport">
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

export default Joining;
