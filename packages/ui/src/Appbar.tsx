import { Button } from "./button";
import Link from "next/link";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: () => void,
    onSignout: () => void
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return (
        <div className="flex justify-between items-center border-b px-10 py-3 bg-white shadow-md">
            <Link 
                href="/dashboard" 
                className="text-2xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent tracking-wide select-none cursor-pointer hover:scale-105 transition-transform"
            >
                PayTM
            </Link>

            <div className="pt-1">
                <Button onClick={user ? onSignout : onSignin}>
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
}
