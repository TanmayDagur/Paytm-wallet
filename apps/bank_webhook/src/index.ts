import express from "express"
import db from "@repo/db/client"
import cors from "cors"
import serverless from "serverless-http"

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://paytm-nine-cyan.vercel.app/",
  credentials: true,
}));

app.post("/", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: { userId: paymentInformation.userId },
        data: { amount: { increment: paymentInformation.amount } },
      }),

      db.onRampTransaction.update({
        where: { token: paymentInformation.token },
        data: { status: "Success" },
      }),
    ]);

    res.json({ message: "captured" });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "error while processing webhook",
    });
  }
});

// ❌ remove app.listen
// ✅ export handler for Vercel
export const handler = serverless(app);
