const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Employee",
        required: [true, "Please Enter your EMP ID !!"]
    },
    currentDate: {
        type: Date
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    targetSales: {
        type: Number,
        default: 15000
    },
    saleOn: {
        type: Date,
        default: null
    },
    saleAmount: {
        type: Number,
        default: 0
    },
    saleStatus:  [{for: Date, amount: Number, remarks: String}],
    totalSaleAmount: {
        type: Number,
        default: 0
    },
    remarks: {
        type: String,
        default: null
    }
}, {timestamps: true});

const saleModel = mongoose.model("digital sales master table", saleSchema);

module.exports = saleModel;