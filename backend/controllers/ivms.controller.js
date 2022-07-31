const ivmsModel = require("../models/ivms.model");
const _ = require("lodash");

async function addToIVMS(req, res, next){
    const {middlename, fathername, mothername, dob, educationalStatus, gender, professionalSector, degree, emailId, phoneNo, address, role, startDate, endDate, stipend, panCard, aadharCard} = req.body;

    const firstname = _.startCase(req.body.firstname);
    let mName = _.startCase(middlename);
    const lastname = _.startCase(req.body.lastname);
    const dad = _.startCase(fathername);
    const mom = _.startCase(mothername);

    if(!middlename || !fathername || !mothername || !gender || !dob || !educationalStatus || !degree || !professionalSector || !emailId || !phoneNo || !address || !role || !startDate || !endDate || !stipend ){
        throw new Error("Please Provide all the necessary fields !!");
    }

    try{
        const ivms = await ivmsModel.findOne({emailId: req.body.emailId});

        if(ivms){
            throw new Error(`Email ID: ${req.body.email} already exists, Please provide another email !!`)
        }

        const newIVMS = new ivmsModel({
            ...req.body,
            firstname,
            middlename: mName,
            lastname,
            fathername: dad,
            mothername: mom,
        });

        const saveIVMS = await newIVMS.save();
        // console.log(saveIVMS);
        res.status(201).json({
            success: true,
            data: saveIVMS,
            message: `Added ${req.body.role} to the DB`
        });
    }catch(e){
        // console.log(e);
        res.status(500).json({
            success: false,
            data: "Something went wrong !!",
            message: "Something went wrong !!"
        })
    }
};

module.exports = {
    addToIVMS
}