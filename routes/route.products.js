const express = require("express");
const ProductRouter = express.Router();

const { ProductModel } = require("../model/model.product");

ProductRouter.get("/", async (req, res) => {
  const { page, limit, Category, search, sortBy, order } = req.query;
  const query = {};

  if (Category) {
    query.Category = Category;
  }
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const sortObj = {};

  sortObj[sortBy] = order == "desc" ? -1 : 1;

  const skip = (page - 1) * (limit || 1);

  const todaldocs = await ProductModel.countDocuments(query);

  const totalpage = Math.ceil(todaldocs/limit);

  try {
    const products = await ProductModel.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).send({ msg: true, products,todaldocs,totalpage });
  } catch (error) {
    res.status(500).send({ error });
  }
});

ProductRouter.post("/add", async (req, res) => {
  try {
    const product = new ProductModel(req.body);

    const createProduct = await product.save();

    res.status(200).send({ msg: true, createProduct });
  } catch (error) {
    res.status(500).send({ msg: false, error });
  }
});

ProductRouter.delete("/:id",async(req,res)=>{

    try {
        const deleted = await ProductModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).send({ msg: "delted successfully!" });
        
    } catch (error) {

        res.status(500).send({ msg: false, error });
        
    }

})




module.exports = { ProductRouter };
