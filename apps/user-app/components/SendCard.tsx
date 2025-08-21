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
    const [status, setStatus] = useState<null | "success" | "error">(null);
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        try {
            const res = await p2pTransfer(number, Number(amount) * 100);
            
            setStatus("success");
            setMessage("Transaction successful ✅");
        } catch (error) {
            setStatus("error");
            setMessage("Transaction failed ❌");
        }

        setTimeout(() => {
            setStatus(null);
            setMessage("");
        }, 5000);
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
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
                                        : "bg-red-100 text-red-700"
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
