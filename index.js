const express=require("express");
const {open}=require("sqlite");
const sqlite3=require("sqlite3");
const path=require("path")
const cors=require("cors");
const dbPath=path.join(__dirname,"PRODUCT.db")


let db=null;
const app=express()

app.use(cors())
app.use(express.json())
const initializeDbAndServer=async()=>{
    try{
    db=await open({
        filename:dbPath,
        driver:sqlite3.Database
    })

    app.listen(3000,()=>{
        console.log("Port is running 3000");
    })
    }catch(e){
        console.log(`Error is ${e.message}`);
        process.exit(1);
    }
}



app.get("/",async(request,response)=>{
    const query="SELECT * FROM product;";
    const product=await db.all(query);
    response.send(product);
    console.log(product.json());

})

initializeDbAndServer();