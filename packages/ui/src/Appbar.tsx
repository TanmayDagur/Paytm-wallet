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
        <nav className="sticky top-0 z-50 flex justify-between items-center border-b border-slate-200 px-6 md:px-10 py-3 bg-white/80 backdrop-blur-md">
            
            <Link 
                href="/dashboard" 
                className="flex items-center gap-2 group"
            >
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
                    P
                </div>
                <span className="text-2xl font-extrabold text-slate-900 tracking-tighter">
                    PayTM
                </span>
            </Link>

            
            <div className="flex items-center gap-4 md:gap-6">
                {user && (
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span className="text-sm font-bold text-slate-700">
                            {user.name?.split(' ')[0]}
                        </span>
                    </div>
                )}
                
                <div className="transition-transform active:scale-95">
                    <Button onClick={user ? onSignout : onSignin}>
                        <span className="px-2 font-bold uppercase tracking-tight text-sm">
                            {user ? "Logout" : "Login"}
                        </span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
