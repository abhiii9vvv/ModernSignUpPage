import express from 'express'; // Express server framework ke liye
import cors from 'cors'; // Cross-origin requests allow karne ke liye
import dotenv from 'dotenv'; // Environment variables load karne ke liye
import bodyParser from 'body-parser'; // Request body parse karne ke liye
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app=express();

app.use(helemt());

// Initialize express app and configure middleware
// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse incoming JSON request bodies
app.use(bodyParser.json());

// Parse incoming URL-encoded request bodies
app.use(bodyParser.urlencoded({extended:true}));

const authLimiter = rateLimit({
    windowMs:15*60*1000,
    max:10,
    standardHeaders:true,
    legacyHeaders:false,
    message:{message:'Too many auth request. Please try again later'}
});

app.use('/api/auth',authRoutes,authRoutes);

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/loginsignup';

mongoose.connect(mongoURI)
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

