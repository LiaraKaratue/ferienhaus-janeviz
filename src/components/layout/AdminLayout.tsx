import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard, CalendarDays, Users, MessageSquare,
  Gift, LogOut, Menu, X, ChevronRight } from
'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const navItems = [
{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
{ href: '/admin/buchungen', label: 'Buchungen', icon: CalendarDays },
{ href: '/admin/kunden', label: 'Kunden', icon: Users },
{ href: '/admin/nachrichten', label: 'Nachrichten', icon: MessageSquare },
{ href: '/admin/angebote', label: 'Angebote', icon: Gift }];


export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div data-ev-id="ev_be09d7a59d" className="min-h-screen bg-[#0f172a]">
      {/* Top Header Bar */}
      <header data-ev-id="ev_a5aa8f1f3f" className="bg-[#1e293b] border-b border-[#334155] sticky top-0 z-50">
        <div data-ev-id="ev_d4d7333ac3" className="flex items-center justify-between px-4 h-16">
          <div data-ev-id="ev_5ac298c19e" className="flex items-center gap-4">
            <button data-ev-id="ev_9b51d07163"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#334155] transition-colors">

              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div data-ev-id="ev_228ae12860" className="flex items-center gap-3">
              <div data-ev-id="ev_6374cee7e8" className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span data-ev-id="ev_7406a28257" className="text-white font-bold text-sm">J</span>
              </div>
              <div data-ev-id="ev_4591d8a108">
                <h1 data-ev-id="ev_f5520897c1" className="text-white font-semibold text-sm">Janeviz Verwaltung</h1>
                <p data-ev-id="ev_08ec4ba5f9" className="text-gray-500 text-xs">Admin-Bereich</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-gray-400 hover:text-white hover:bg-[#334155]">

            <LogOut className="w-4 h-4 mr-2" />
            Abmelden
          </Button>
        </div>
      </header>

      <div data-ev-id="ev_c7bbc74b65" className="flex">
        {/* Sidebar */}
        <aside data-ev-id="ev_65c5be106c" className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1e293b] border-r border-[#334155] transform transition-transform duration-200 lg:translate-x-0 pt-16 lg:pt-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <nav data-ev-id="ev_ab1ee60a0b" className="p-4 flex flex-col gap-1">
            {navItems.map((item) =>
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#334155] transition-colors group">

                <item.icon className="w-5 h-5" />
                <span data-ev-id="ev_7e8584c0b4" className="font-medium text-sm">{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </nav>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen &&
        <div data-ev-id="ev_a3b747d99d"
        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        onClick={() => setSidebarOpen(false)} />

        }

        {/* Main Content */}
        <main data-ev-id="ev_d9d3daaeb6" className="flex-1 min-h-[calc(100vh-4rem)]">
          {/* Page Header */}
          <div data-ev-id="ev_a604a3db7d" className="bg-[#1e293b]/50 border-b border-[#334155] px-6 py-6">
            <h2 data-ev-id="ev_83aa049ae2" className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p data-ev-id="ev_2549c48bae" className="text-gray-400 mt-1">{subtitle}</p>}
          </div>
          
          {/* Page Content */}
          <div data-ev-id="ev_e9ea0a7afa" className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>);

}