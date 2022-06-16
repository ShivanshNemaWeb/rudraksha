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
          margin: 10px;
          border: solid gray 2px;
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
          padding-left: 20px;
        }
        .data {
          width: 50%;
          margin-left: 10px;
          padding: 15px;
          
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
        h3 {
          font-weight: bolder;
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
        <h2 style="display: inline-block">VENDORS REPORT</h2>
      </div>
      <h3 class="title">RUDRAKSHA WELFARE FOUNDATION</h3>
      <div class="shadow">
      <h4 class="main">Vendor Status Report</h4>
      ${array
        .map(
          (vendor, val) => `
        <div class="card mb-3">
        <div class="data">
          <div class="card-body">
              <h3>Vendor Personal Details</h3>
            <h4 class="card-title"><strong>Name:</strong>${vendor.vendorName}</h4>
            <h4 class="card-title"><strong>Email:</strong>${vendor.vendorEmail}</h4>
            <h4 class="card-title"><strong>Phone Number:</strong>${vendor.vendorPhoneNumber}</h4>
          </div>
        </div>
          <div class="data">
            <div class="card-body">
            <h3>Vendor Shop Details</h3>
            <h4 class="card-title"><strong>Shop Name:</strong>${vendor.vendorShopName}</h4>
            <h4 class="card-title"><strong>Shop Address:</strong>${vendor.vendorShopAddress}</h4>
            <h4 class="card-title"><strong>Shop Type:</strong>${vendor.vendorType}</h4>
            </div>
          </div>
          <hr></hr>
      </div>
  
        `
        )
        .join("")}
      </div>
    </body>
  </html>
  
      `;
};
