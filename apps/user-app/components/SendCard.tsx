"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<null | "success" | "error" | "warning">(null);
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        try {
            if (!number.trim() || !amount.trim()) {
                setStatus("warning");
                setMessage("⚠️ Please enter both Number and Amount");
                return;
            }

            if (isNaN(Number(amount)) || Number(amount) <= 0) {
                setStatus("warning");
                setMessage("⚠️ Please enter a valid amount greater than 0");
                return;
            }
            await p2pTransfer(number, Number(amount) * 100);
            setStatus("success");
            setMessage("Transaction successful ✅");
        } catch (error) {
            setStatus("error");
            setMessage("Transaction failed ❌");
        }

        // Clear message after 5s
        setTimeout(() => {
            setStatus(null);
            setMessage("");
        }, 5000);
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2 ">
                        <TextInput
                            placeholder="Number"
                            label="Number"
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder="Amount"
                            label="Amount"
                            onChange={(value) => setAmount(value)}
                        />

                        {status && (
                            <div
                                className={`mt-3 p-2 rounded-md text-center text-sm font-medium ${
                                    status === "success"
                                        ? "bg-green-100 text-green-700"
                                        : status === "error"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {message}
                            </div>
                        )}

                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}
