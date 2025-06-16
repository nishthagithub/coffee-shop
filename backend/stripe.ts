import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import Stripe from 'stripe';
dotenv.config();
const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());


const stripe = new Stripe(
   
    process.env.STRIPE_SECRET_KEY as string, 
    {
    apiVersion: '2025-05-28.basil',
});

app.get("/",async (req: Request, res: Response)=>{
    console.log("server running")
  })
app.post("/create-paymnet",async (req: Request, res: Response)=>{
    try {
        const {amount} = req.body;
        console.log("Received amount:", amount);
        
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            payment_method_types: ['card'],
        });
        
        console.log("Payment intent created:", payment);
        res.json({
            clientSecret: payment.client_secret,
            
        });
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ error: error });
    }
});

app.listen(3000, () => console.log('Stripe server running on port 3000'));