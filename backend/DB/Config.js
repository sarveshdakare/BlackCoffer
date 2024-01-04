const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0.0zadouh.mongodb.net/').then(()=>console.log("db connected"))