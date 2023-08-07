const express = require("express");
const cors = require("cors")

const {connection} = require("./config/db")
const {ProductRouter} = require("./routes/route.products")

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;



app.get("/",(req,res)=>{
    res.send({msg:"root working .."})
})

app.use("/classifieds",ProductRouter);


app.listen(PORT,async()=>{

    try {

        await connection
        console.log("database connected !")
        
    } catch (error) {
        console.log("error while connecting database !",error);
        
    }
    console.log("server runninig on http://localhost:8080");
})