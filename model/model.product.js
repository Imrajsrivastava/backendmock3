const mongoose = require("mongoose");

// - Name
// - Description
// - Category (Clothing, Electronics, Furniture, Other)
// - Image URL
// - Location
// - Date
// - Price

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    Description:{type:String,required:true},
    Category:{type:String,required:true},
    ImageURL:{type:String,required:true},
    Location:{type:String,required:true},
    Date:{type:Date,default: new Date },
    Price:{type:Number,required:true},
})

const ProductModel = mongoose.model("product",productSchema);

module.exports = {ProductModel};