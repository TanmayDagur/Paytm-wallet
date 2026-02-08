"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

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
          <img 
            key={isCollapsed ? 'r' : 'l'}
            src={`https://lucide.dev/api/icons/${isCollapsed ? 'chevron-right' : 'chevron-left'}?stroke=%2364748b`} 
            alt="toggle" 
            className="w-4 h-4" 
          />
        </button>

        <nav className="flex-1 px-3 space-y-2 mt-12">
          
        
          <SidebarItem 
            href="/dashboard" 
            label="Home" 
            icon="house" 
            isActive={pathname === '/dashboard'} 
            isCollapsed={isCollapsed} 
          />

        
          <SidebarItem 
            href="/transfer" 
            label="Transfer" 
            icon="send" 
            isActive={pathname === '/transfer'} 
            isCollapsed={isCollapsed} 
          />

        
          <SidebarItem 
            href="/transactions" 
            label="Transactions" 
            icon="history" 
            isActive={pathname === '/transactions'} 
            isCollapsed={isCollapsed} 
          />

        
          <SidebarItem 
            href="/p2p-transfer" 
            label="P2P Transfer" 
            icon="users" 
            isActive={pathname === '/p2p-transfer'} 
            isCollapsed={isCollapsed} 
          />

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


function SidebarItem({ 
  href, 
  label, 
  icon, 
  isActive, 
  isCollapsed 
}: { 
  href: string, 
  label: string, 
  icon: string, 
  isActive: boolean, 
  isCollapsed: boolean 
}) {

  const activeColor = "#2563eb";   
  const inactiveColor = "#94a3b8"; 
  
  const selectedColor = isActive ? activeColor : inactiveColor;

  return (
    <Link href={href} className={`
      relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group
      ${isActive 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-blue-500'}
      ${isCollapsed ? 'justify-center' : ''}
    `}>
      <img 
        key={`${icon}-${isActive}`}
        
        src={`https://lucide.dev/api/icons/${icon}?stroke=${encodeURIComponent(selectedColor)}`} 
        alt={label}
        className="w-[22px] h-[22px]"
      />
      
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}

      {isCollapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
}
