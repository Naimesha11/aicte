const express=require("express");
const mongoose =require("mangoose");
const app=express();
app.use(express.json());

const NewsModel=require("./models/news.js");
//naime 1234
app.listen(3000,()=>{});

app.get("/",(req,res)=>{
    res.json({name:"naime"});
});

app.post("/api/addnews",async(req,res)=>{
    try{
        const news=await NewsModel.create(req.body);
        res.status(200).json(news);
        console.log(req.body);
    } catch(error){
        res.send(500);
    }
});
app.get("/api/news",async(req,res)=>{
    try{
        const news=await NewsModel.find({});
        res.status(200).json(news);
        console.log(req.body);
    } catch(error){
        res.send(500);
    }
});
app.get("/api/news",async(req,res)=>{
    try{
        const {id} =req.params;
        const news = await NewsModel.findById(id);
        res.status(200).json(news);
        //console.log(express.json(news));
    }catch(error){
        res.send(500);
    }
});

app.put("/api/news/:id",async (req,res)=>{
    try{
        const {id}=req.params;
        const news =await NewsModel.findByIdAndUpdate(id,req.body);
        if(!news){
            return res.status(404).json({Message: "News not found"});
        }
        const updatenews = await NewsModel.findById(id);
        res.status(200).json(updatenews);

        //console.log(express.json(news));
    }catch(error){
        res.send(500);
    }
});
 
app.delete("/api/news/:id", async(req,res)=>{
    try{
        const {id} =req.params;
        const news=await NewsModel.findByAndDelete(id,req.body);
        if(!news){
            return res.status(404).json({Message: "News not found" });
        }
        const updatenews=await NewsModel.findById(id);
        res.status(200).json("Deleted");

        //console.log(express.json(news));
    }catch(error){
        res.send(500);
    }
});

mongoose
 .connect(
    "mongodb+srv://naime:1234@cluste0.o2xyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 )
 .then(()=>{
    console.log("connected to DB");
 });
 
