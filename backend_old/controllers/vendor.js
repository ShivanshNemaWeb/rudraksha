const Vendor = require("../models/vendor");
const vendorTemplate = require("../reports/vendor");
const moment = require("moment");
const pdf = require("html-pdf");
const path = require("path");
const fs = require("fs");
const AddVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json({
      success: true,
      data: vendor,
      message: "Vendor Details Succesfully Added!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};
const getAllVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find(
      {},
      {
        vendorBankName: 0,
        vendorIFSC: 0,
        vendorACNumber: 0,
        vendorGST: 0,
        vendorType: 0,
        UPIType: 0,
        vendorUpi: 0,
        vendorPhoneNumber: 0,
        vendorShopAddress: 0,
        vendorShopName: 0,
        vendorRepEmail: 0,
        vendorEmail: 0,
        vendorRepPhone: 0,
        vendorRepName: 0,
        remarks: 0,
      }
    );
    res.status(201).json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const createVendorReport = async (req, res, next) => {
  try {
    //getting vendor details
    let getData;
    getData = await Vendor.find(
      {},
      {
        vendorGST: 0,
        vendorACNumber: 0,
        vendorIFSC: 0,
        vendorBankName: 0,
        vendorUpi: 0,
        UPIType: 0,
        vendorRepName: 0,
        vendorRepPhone: 0,
        vendorRepEmail: 0,
        remarks: 0,
      }
    );

    //reading rudraksha logo and converting it to base64 url
    const logopath = path.join(__dirname, "../RWFLOGO.png");
    const data = fs.readFileSync(logopath);
    const logo = "data:image/png;base64," + data.toString("base64");

    //creating pdf
    pdf
      .create(
        vendorTemplate(
          getData,
          moment().format("MMMM Do YYYY, h:mm:ss a"),
          logo
        ),

        {
          format: "Letter",
          orientation: "portrait",
          type: "pdf",
          timeout: 100000,
          border: 10,
          header: {
            height: "10mm",
          },
          footer: {
            height: "7mm",
          },
        }
      )
      .toFile("vendor.pdf", (err) => {
        if (err) {
          throw new Error(err);
        }
        res.json({
          success: true,
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const getVendorReport = async (req, res, next) => {
  try {
    const filepath = path.join(__dirname, "../vendor.pdf");
    res.sendFile(filepath);
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

const getVendorTypeDetails = async (req, res, next) => {
  try {
    //get numbers of vendors of vendortype

    const vendorTypeDetails = [
      {
        label: "Admin Support",
        value: await Vendor.find({ vendorType: "Admin Support" }).count(),
      },
      {
        label: "Boutique",
        value: await Vendor.find({ vendorType: "Boutique" }).count(),
      },
      {
        label: "Carpenter",
        value: await Vendor.find({ vendorType: "Carpenter" }).count(),
      },
      {
        label: "Car Service",
        value: await Vendor.find({ vendorType: "Car Service" }).count(),
      },
      {
        label: "Car Appliances",
        value: await Vendor.find({ vendorType: "Car Appliances" }).count(),
      },
      {
        label: "Chemical",
        value: await Vendor.find({ vendorType: "Chemical" }).count(),
      },
      {
        label: "Cosmetics",
        value: await Vendor.find({ vendorType: "Cosmetics" }).count(),
      },
      {
        label: "Electrical",
        value: await Vendor.find({ vendorType: "Electrical" }).count(),
      },
      {
        label: "Food",
        value: await Vendor.find({ vendorType: "Food" }).count(),
      },
      {
        label: "Gardener",
        value: await Vendor.find({ vendorType: "Gardener" }).count(),
      },
      {
        label: "Hardware",
        value: await Vendor.find({ vendorType: "Hardware" }).count(),
      },
      {
        label: "IT Equipments",
        value: await Vendor.find({ vendorType: "IT Equipments" }).count(),
      },
      {
        label: "Labour",
        value: await Vendor.find({ vendorType: "Labour" }).count(),
      },
      {
        label: "Literature",
        value: await Vendor.find({ vendorType: "Literature" }).count(),
      },
      {
        label: "Medicine",
        value: await Vendor.find({ vendorType: "Medicine" }).count(),
      },
      {
        label: "Mechanic",
        value: await Vendor.find({ vendorType: "Mechanic" }).count(),
      },
      {
        label: "Paint",
        value: await Vendor.find({ vendorType: "Paint" }).count(),
      },
      {
        label: "Plumber",
        value: await Vendor.find({ vendorType: "Plumber" }).count(),
      },
      {
        label: "Repair",
        value: await Vendor.find({ vendorType: "Repair" }).count(),
      },
      {
        label: "Software",
        value: await Vendor.find({ vendorType: "Software" }).count(),
      },
      {
        label: "Stationary",
        value: await Vendor.find({ vendorType: "Stationary" }).count(),
      },
      {
        label: "Sweepers",
        value: await Vendor.find({ vendorType: "Sweepers" }).count(),
      },
      {
        label: "Steel",
        value: await Vendor.find({ vendorType: "Steel" }).count(),
      },
      {
        label: "Security",
        value: await Vendor.find({ vendorType: "Security" }).count(),
      },
      {
        label: "Taxi",
        value: await Vendor.find({ vendorType: "Taxi" }).count(),
      },
      {
        label: "Tutor",
        value: await Vendor.find({ vendorType: "Tutor" }).count(),
      },
      {
        label: "Technical Expert",
        value: await Vendor.find({ vendorType: "Technical Expert" }).count(),
      },
      {
        label: "Tailor",
        value: await Vendor.find({ vendorType: "Tailor" }).count(),
      },
      {
        label: "Vegetables",
        value: await Vendor.find({ vendorType: "Vegetables" }).count(),
      },
      {
        label: "Work",
        value: await Vendor.find({ vendorType: "Work" }).count(),
      },
      {
        label: "Other",
        value: await Vendor.find({ vendorType: "Other" }).count(),
      },
    ];

    res.json({
      success: true,
      data: vendorTypeDetails,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

module.exports = {
  AddVendor,
  getAllVendors,
  createVendorReport,
  getVendorReport,
  getVendorTypeDetails,
};
