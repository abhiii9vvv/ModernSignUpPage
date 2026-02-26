import express from 'express'; // Express server framework ke liye
import cors from 'cors'; // Cross-origin requests allow karne ke liye
import dotenv from 'dotenv'; // Environment variables load karne ke liye
import bodyParser from 'body-parser'; // Request body parse karne ke liye
import mongoose from 'mongoose';
import { error } from 'node:console';

dotenv.config();

const app=express();

// Initialize express app and configure middleware
// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse incoming JSON request bodies
app.use(bodyParser.json());

// Parse incoming URL-encoded request bodies
app.use(bodyParser.urlencoded({extended:true}));

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/loginsignup';

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> console.log('MongoDB connected'))
.catch(err=>console.log('MongoDB connection error:',err));

app.get('/',(req,res)=>{
    res.json({message:'Welcome to Auth API'});
});

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({error:'something went wrong!'})
});

const port=process.env.PORT || 5000;

// Start server and log listening port
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})

export default app;

