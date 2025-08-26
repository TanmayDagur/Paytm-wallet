import { Card } from "@repo/ui/card";

type OnRampTransaction = {
    time: Date;
    amount: number;
    status: string;
    provider: string;
};

type P2PTransaction = {
    time: Date;
    amount: number;
    phoneNumber:string;
};

export const AllTransactionCard = ({
        onRamp,
        p2p,
    }: {
        onRamp: OnRampTransaction[];
        p2p: P2PTransaction[];
    }) => {


    const allTransactions: any[] = [];

    onRamp.forEach(tx => {
        allTransactions.push({ ...tx, type: "onramp" });
    });

    p2p.forEach(tx => {
        allTransactions.push({ ...tx, type: "p2p" });
    });

    allTransactions.sort((a, b) => b.time.getTime() - a.time.getTime());

    return <div className="flex justify-center w-full">
        <div className="w-full max-w-3xl px-4">
            <Card title="ALL TRANSACTIONS">
                <div className="p-4  w-full">
                    
                    {allTransactions.map(tx => (
                    
                        <div
                            key={tx.time.toString()}
                            className="mb-4 p-4 border rounded-md bg-gray-50 "
                            >
                            <p><strong>Time:</strong> {tx.time.toDateString()}</p>
                            <p><strong>Amount:</strong> ₹{tx.amount/100}</p>

                            {tx.type === "onramp" && (
                                <>
                                <p><strong>Status:</strong> {tx.status}</p>
                                <p><strong>Provider:</strong> {tx.provider}</p>
                                </>
                            )}

                            {tx.type === "p2p" && (
                                <p><strong>Phone:</strong> {tx.phoneNumber}</p>
                            )}
                        </div>

                    ))}
                
                </div>
            </Card>
        </div>
    </div>
}
 
