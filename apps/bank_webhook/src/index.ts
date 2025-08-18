import express from "express"
import db from "@repo/db/client"

const app = express();

app.use(express.json()); 

app.post("/", async (req,res)=>{
    const paymentInformation = {
        token:req.body.token,
        userId:req.body.user_identifier,
        amount:req.body.amount,
    }

    try{
        await db.$transaction([

            db.balance.update({
                where:{
                    userId: paymentInformation.userId
                },
                data:{
                    amount:{
                        increment: paymentInformation.amount
                    }
                }

            }),

            db.onRampTransaction.update({
                where:{
                    token: paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            }),

        ])

        res.json({
            message: "captured"
        })

        }catch(e){
        res.status(411).json({
            error: console.log(e),
            message: "error while processing webhook"
        })
    }

})

app.listen(3003)