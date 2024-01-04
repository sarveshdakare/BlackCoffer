const express=require('express')
const cors=require('cors')
require('./DB/Config')
const app=express();

app.use(express.json());
app.use(cors());

const Data=require('./DB/Sample');


app.get('/info',async(req,res)=>{
    let data=await Data.find();

    if(data.length>0){
        res.send(data);
    }else{
        res.send({result:"NOT FOUND DATA"});
    }
})
app.get('/search/:key',async(req,resp)=>{
    let result=await Data.find({
        "$or":[
            {country:{$regex:req.params.key}},
            {topic:{$regex:req.params.key}},
            {region:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})
app.listen(5000)