module.exports = (array, time, logo) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      />
      <title>Employee</title>
      <style>
        .head {
          display: flex !important;
          width: 100%;
          justify-content: center;
          align-items: center !important;
        }
        .title {
          color: black !important;
          text-align: center !important;
          font-weight: 600;
          margin-bottom: 10px;
          text-decoration: underline;
        }
        .date {
          float: right;
          display: block;
          margin-left: 70%;
        }
        .main {
          background: linear-gradient(90deg, #5384a5 10%, #45a3b8 100%) !important;
          color: #fff !important;
          font-size: x-large !important;
          border-top-left-radius: 13px;
          border-top-right-radius: 13px;
          // margin: 1rem;
          padding: 10px 10px;
        }
        .card {
          display: -webkit-flex !important;
          page-break-inside: avoid !important;
          margin-bottom: 10px;
        }
        .card-img {
          width: 220px;
          height: 220px;
          border-radius: 100%;
        }
        .dp {
          width: 220px;
          height: 220px;
          border-radius: 100%;
          display: -webkit-flex !important;
          justify-content: center;
          align-items: center;
          padding: 5px;
        }
        .data {
          width: 50%;
          margin-left: 5px;
        }
        .shadow  {
          box-shadow: 0px 1px 10px !important;
          border-top-left-radius: 13px;
          border-top-right-radius: 13px;
          margin-top: 10px;
        }
        .card-body {
          align-items: center;
        }
      </style>
    </head>
    <body>
      <div class="date">
          ${time}
      </div>
      
      <div class="head" style="text-align: center">
        <img
          src=${logo}
          alt="logo"
          width="90"
        />
        <h2 style="display: inline-block">EMPLOYEE REPORT</h2>
        
      </div>
      <h3 class="title">RUDRAKSHA WELFARE FOUNDATION</h3>
      <div class="shadow">
      <h4 class="main">Employee Status Report</h4>
      ${array
        .map(
          (emp, val) => `
        <div class="card mb-3">
          <div class="dp">
            <img
              src=${emp.profilepic}
              class="card-img"
              alt="profilepic"
            />
          </div>
          <div class="data">
            <div class="card-body">
              <h3 class="card-title">${emp.name}</h3>
              <h4 class="card-text">${emp.designation}</h4>
              <p class="card-text">
                <small class="text-muted">Joined on ${emp.datofJoining}</small>
              </p>
              <h5 class="card-text">
                <strong>Email:</strong>${emp.email}
              </h5>
              <h5 class="card-text"><strong>Phone Number:</strong>${emp.phoneNumber}</h5>
              <h5 class="card-text"><strong>Location:</strong>${emp.location}</h5>
            </div>
          </div>
      </div>
        `
        )
        .join("")}
      
      
      </div>
    </body>
  </html>
  
      `;
};
