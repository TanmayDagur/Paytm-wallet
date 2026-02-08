"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Send, 
  History, 
  Users, 
  ChevronLeft, 
  ChevronRight,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', icon: Home, href: '/dashboard' },
    { name: 'Transfer', icon: Send, href: '/transfer' },
    { name: 'Transactions', icon: History, href: '/transactions' },
    { name: 'P2P Transfer', icon: Users, href: '/p2p-transfer' },
  ];

  return (
    
    <div className="flex h-screen overflow-hidden bg-slate-50">
      
    
      <aside 
        className={`relative hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out shadow-sm flex-shrink-0
          ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
    
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-white border border-slate-200 rounded-full p-1 text-slate-500 hover:text-blue-500 hover:border-blue-500 transition-all z-50 shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

    
        <nav className="flex-1 px-3 space-y-2 mt-24">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <SidebarWrapper 
                key={item.href} 
                href={item.href}
                isActive={isActive} 
                isCollapsed={isCollapsed} 
                label={item.name}
              >
                <Icon size={22} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </SidebarWrapper>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 h-full overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}


interface WrapperProps {
  children: React.ReactNode;
  isActive: boolean;
  isCollapsed: boolean;
  label: string;
  href: string;
}

function SidebarWrapper({ children, isActive, isCollapsed, label, href }: WrapperProps) {
  return (
    <Link href={href} className={`
      relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group
      ${isActive 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-blue-500'}
      ${isCollapsed ? 'justify-center' : ''}
    `}>
      {children}

      {isCollapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
}
