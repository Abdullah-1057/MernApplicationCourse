const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const CourseCartSchema = new mongoose.Schema({
    course: {
        type: ObjectId,
        ref: "Course",
    },
    name: String,
    price: Number
});
const SingleCourse = mongoose.model("CourseCart",CourseCartSchema);
const orderSchema = new mongoose.Schema({
    courses: [CourseCartSchema],
    transaction_id: {},
    amount: {type:Number},
    address: {type: String},
    status: {
        type: String,
        default: "Notpurchased",
        enum: ["Cancelled","Purchased","Notpurchased"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User",
    }
},{timestamps:true});
const CourseOrder = mongoose.model("Order",orderSchema);
module.exports = {SingleCourse,CourseOrder};