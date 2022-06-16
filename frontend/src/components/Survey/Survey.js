import React, { useState } from "react";
import { useHistory } from "react-router";

import "./Survey.css";

function Survey() {
  const Submitrec = () => {
    if (
      form.inputName === "" ||
      form.inputAge === "" ||
      form.inputeabrand === "Select" ||
      form.inputteaProduct === "Select"
    ) {
      alert("Please fill the required feilds!");
    } else {
      alert("Your response has been submitted successfully!");
    }
  };

  const [form, setForm] = useState({
    inputName: "",
    inputAge: "",
    inputGender: "",
    inputprofession: "",
    inputeabrand: "",
    inputteaProduct: "",
    inputteaprice: "",
    inputQty: "",
    inputTaste: "",
    inlineRadio1: "",
    inlineRadio2: "",
    inputSiddhiquality: "",
    inputSiddhiPrice: "",
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

    await fetch("http://localhost:5000/record/add", {
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
      inputName: "",
      inputAge: "",
      inputGender: "",
      inputprofession: "",
      inputeabrand: "",
      inputteaProduct: "",
      inputteaprice: "",
      inputQty: "",
      inputTaste: "",
      inlineRadio1: "",
      inlineRadio2: "",
      inputSiddhiquality: "",
      inputSiddhiPrice: "",
    });
    navigate.push("/");
  }

  const [Tea1style, setTea1style] = useState({ display: "inline" });
  const [Tea2style, setTea2style] = useState({ display: "none" });
  const [Tea3style, setTea3style] = useState({ display: "none" });
  const [Tea4style, setTea4style] = useState({ display: "none" });
  const [Tea5style, setTea5style] = useState({ display: "none" });
  const [Tea6style, setTea6style] = useState({ display: "none" });
  const [Tea7style, setTea7style] = useState({ display: "none" });
  const [Tea8style, setTea8style] = useState({ display: "none" });

  const handlesurveytea = () => {
    if (form.inputeabrand === "TATA") {
      setTea1style({
        display: "inline",
      });
      setTea2style({
        display: "none",
      });
      setTea3style({
        display: "none",
      });
      setTea4style({
        display: "none",
      });
      setTea5style({
        display: "none",
      });
      setTea6style({
        display: "none",
      });
      setTea7style({
        display: "none",
      });
      setTea8style({
        display: "none",
      });
    } else if (form.inputeabrand === "Wagh Bakri") {
      setTea1style({
        display: "none",
      });

      setTea2style({
        display: "inline",
      });
      setTea3style({
        display: "none",
      });
      setTea4style({
        display: "none",
      });
      setTea5style({
        display: "none",
      });
      setTea6style({
        display: "none",
      });
      setTea7style({
        display: "none",
      });
      setTea8style({
        display: "none",
      });
    } else if (form.inputeabrand === "Lipton") {
      setTea1style({
        display: "none",
      });

      setTea2style({
        display: "none",
      });
      setTea3style({
        display: "inline",
      });
      setTea4style({
        display: "none",
      });
      setTea5style({
        display: "none",
      });
      setTea6style({
        display: "none",
      });
      setTea7style({
        display: "none",
      });
      setTea8style({
        display: "none",
      });
    } else if (form.inputeabrand === "Brooke Bond") {
      setTea1style({
        display: "none",
      });

      setTea2style({
        display: "none",
      });
      setTea3style({
        display: "none",
      });
      setTea4style({
        display: "inline",
      });
      setTea5style({
        display: "none",
      });
      setTea6style({
        display: "none",
      });
      setTea7style({
        display: "none",
      });
      setTea8style({
        display: "none",
      });
    } else if (form.inputeabrand === "Society") {
      setTea1style({
        display: "none",
      });

      setTea2style({
        display: "none",
      });
      setTea3style({
        display: "none",
      });
      setTea4style({
        display: "none",
      });
      setTea5style({
        display: "inline",
      });
      setTea6style({
        display: "none",
      });
      setTea7style({
        display: "none",
      });
      setTea8style({
        display: "none",
      });
    } else if (form.inputeabrand === "Pataka") {
      setTea1style({
        display: "none",
      });

      setTea2style({
        display: "none",
      });
      setTea3style({
        display: "none",
      });
      setTea4style({
        display: "none",
      });
      setTea5style({
        display: "none",
      });
      setTea6style({
        display: "inline",
      });
      setTea7style({
        display: "none",
      });
      setTea8style({
        display: "none",
      });
    } else if (form.inputeabrand === "Kake-di-hatti") {
      setTea1style({
        display: "none",
      });

      setTea2style({
        display: "none",
      });
      setTea3style({
        display: "none",
      });
      setTea4style({
        display: "none",
      });
      setTea5style({
        display: "none",
      });
      setTea6style({
        display: "none",
      });
      setTea7style({
        display: "inline",
      });
      setTea8style({
        display: "none",
      });
    } else if (form.inputeabrand === "Any other local Brand") {
      setTea1style({
        display: "none",
      });

      setTea2style({
        display: "none",
      });
      setTea3style({
        display: "none",
      });
      setTea4style({
        display: "none",
      });
      setTea5style({
        display: "none",
      });
      setTea6style({
        display: "none",
      });
      setTea7style({
        display: "none",
      });
      setTea8style({
        display: "inline",
      });
    }
  };

  return (
    <div className="SurveyMain">
      <div className="SurveyHeader">
        <img src={require("../../Images/survey1.jpg")} />
      </div>

      <div className="SurveyMainBody container">
        <div className="SurveyBody">
          <div className="SurveyFormHeading">
            <img src={require("../../Images/RWFLOGO.png")} />
            <h2>
              <span>TEA</span>
              <span>SURVEY</span>
              <span>FORM</span>
            </h2>
          </div>

          <div className="SurveyForm">
            <form action="/record/add" onSubmit={onSubmit} method="POST">
              <div className="SurveyFormdiv1">
                <div className="FromDivHead1">
                  <h4>1.General Information</h4>
                  <hr className="hr1" />
                </div>

                <div className="surveyformdivs">
                  <label for="inputName">Name</label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    id="inputName"
                    value={form.inputName}
                    placeholder="Enter Your Name"
                    onChange={(e) => updateForm({ inputName: e.target.value })}
                  />
                </div>
                <div className="surveyformdivs">
                  <label for="inputAge">Age</label>
                  <input
                    type="number"
                    required
                    class="form-control"
                    id="inputAge"
                    value={form.inputAge}
                    placeholder="Enter Your Age"
                    onChange={(e) => updateForm({ inputAge: e.target.value })}
                  />
                </div>
                <div className="surveyformdivs">
                  <label for="inputGender">Gender</label>
                  <select
                    id="inputGender"
                    value={form.inputGender}
                    class="form-control"
                    onChange={(e) =>
                      updateForm({ inputGender: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="SurveyFormdiv2">
                <div className="FromDivHead1">
                  <h4>2. Please Select The Appropriate Options</h4>
                  <hr className="hr2" />
                </div>

                <div className="surveyformdivs">
                  <label for="inputprofession">Profession</label>
                  <select
                    id="inputprofession"
                    class="form-control"
                    value={form.inputprofession}
                    onChange={(e) =>
                      updateForm({ inputprofession: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Student</option>
                    <option>CA</option>
                    <option>Doctor</option>
                    <option>Defence</option>
                    <option>Police</option>
                    <option>Accountant</option>
                    <option>Sales Force</option>
                    <option>Banker</option>
                    <option>Business Man</option>
                    <option>Teacher</option>
                    <option>Sports</option>
                    <option>Govt. Service</option>
                    <option>Pvt Service</option>
                    <option>Engineer</option>
                    <option>IT Professional</option>
                    <option>Professor</option>
                    <option>CS</option>
                    <option>Advocate</option>
                    <option>House Wife</option>
                    <option>Retired</option>
                  </select>
                </div>

                <div className="surveyformdivs">
                  <label for="inputeabrand">Tea Brand</label>
                  <select
                    id="inputeabrand"
                    required
                    class="form-control"
                    value={form.inputeabrand}
                    onClick={() => handlesurveytea()}
                    onChange={(e) =>
                      updateForm({ inputeabrand: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>TATA</option>

                    <option>Wagh Bakri</option>
                    <option>Lipton</option>
                    <option>Brooke Bond</option>
                    <option>Society</option>
                    <option>Pataka</option>
                    <option>Kake-di-hatti</option>
                    <option>Any other local Brand</option>
                  </select>
                </div>

                <div className="surveyformdivs">
                  <label for="inputteaProduct">Product</label>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea1style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Gold</option>
                    <option>Premium</option>
                    <option>Veda</option>
                    <option>Agni</option>
                    <option>Chakra Gold</option>
                    <option>Elaichi</option>
                  </select>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea2style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>CTC Leaf Tea</option>
                    <option>Dust Tea</option>
                    <option>Fanning Tea</option>
                    <option>Organic Tea</option>
                    <option>Green Tea</option>
                    <option>Mili Tea</option>
                  </select>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea3style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Green Tea</option>
                    <option>Yellow Tea</option>
                    <option>Darjelling Tea</option>
                  </select>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea4style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Taj Mahal</option>
                    <option>Red Label</option>
                    <option>Taja</option>
                  </select>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea5style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>1</option>
                  </select>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea6style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Premium Tea</option>
                    <option>Mukta Tea</option>
                    <option>Leaf Tea</option>

                    <option>Green Tea</option>
                    <option>TwinningTea</option>
                  </select>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea7style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Kaake di hatti</option>
                  </select>
                  <select
                    id="inputteaProduct"
                    required
                    class="form-control"
                    style={Tea8style}
                    value={form.inputteaProduct}
                    onChange={(e) =>
                      updateForm({ inputteaProduct: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option>Any Other Local Brand</option>
                  </select>
                </div>
                <div className="surveyformdivs">
                  <label for="inputteaprice">Price Per Kg</label>
                  <select
                    id="inputteaprice"
                    class="form-control"
                    value={form.inputteaprice}
                    onChange={(e) =>
                      updateForm({ inputteaprice: e.target.value })
                    }
                  >
                    <option selected></option>
                    <option>250</option>
                    <option>280</option>
                    <option>300</option>
                    <option>550</option>
                    <option>575</option>
                  </select>
                </div>
                <div className="surveyformdivs">
                  <label for="inputQty">Quantity Per Month</label>
                  <select
                    id="inputQty"
                    class="form-control"
                    value={form.inputQty}
                    onChange={(e) => updateForm({ inputQty: e.target.value })}
                  >
                    <option selected></option>
                    <option>250g</option>
                    <option>500g</option>
                    <option>750g</option>
                    <option>1000g</option>
                  </select>
                </div>
                <div className="surveyformdivs">
                  <label for="inputTaste">Taste</label>
                  <select
                    id="inputTaste"
                    class="form-control"
                    value={form.inputTaste}
                    onChange={(e) => updateForm({ inputTaste: e.target.value })}
                  >
                    <option selected></option>
                    <option>Strong</option>
                    <option>Normal</option>
                    <option>Aroma</option>
                    <option>Elaichi</option>
                    <option>Masala</option>
                  </select>
                </div>
              </div>

              <div className="SurveyFormdiv3">
                <div className="FromDivHead1">
                  <h4>3. A Brief Feedback For Siddhi Tea</h4>
                  <hr className="hr3" />
                </div>

                <div className="surveyformdivsradio ">
                  <label>Have You Tried Siddhi Tea</label>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                      onChange={(e) =>
                        updateForm({ inlineRadio1: e.target.value })
                      }
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      Yes
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                      onChange={(e) =>
                        updateForm({ inlineRadio2: e.target.value })
                      }
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      No
                    </label>
                  </div>
                </div>

                <div className="surveyformdivs">
                  <label for="inputSiddhiquality">Siddhi Tea Quality</label>
                  <select
                    id="inputSiddhiquality"
                    class="form-control"
                    onChange={(e) =>
                      updateForm({ inputSiddhiquality: e.target.value })
                    }
                  >
                    <option selected></option>
                    <option>Strong</option>
                    <option>Normal</option>
                    <option>Aroma</option>
                    <option>Elaichi</option>
                    <option>Masala</option>
                  </select>
                </div>

                <div className="surveyformdivs spprice">
                  <label for="inputSiddhiPrice">Siddhi Price</label>
                  <select
                    id="inputSiddhiPrice"
                    class="form-control"
                    onChange={(e) =>
                      updateForm({ inputSiddhiPrice: e.target.value })
                    }
                  >
                    <option selected></option>
                    <option>Perfect</option>
                    <option>Slightly High</option>
                    <option>Expensive</option>
                  </select>
                </div>
              </div>

              <div className="submitbtnsf ">
                <button class="btn btn-outline-success" onClick={Submitrec}>
                  Submit Data
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;
