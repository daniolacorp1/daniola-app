import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Store, FileText, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
    },
    {
      label: 'Marketplace',
      icon: Store,
      href: '/marketplace',
    },
    {
      label: 'Deals',
      icon: FileText,
      href: '/deals',
    },
    {
      label: 'Chat',
      icon: MessageCircle,
      href: '/chat',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t md:hidden">
      <div className="grid h-full grid-cols-4 mx-auto">
        {routes.map((route) => {
          const isActive = location.pathname === route.href;
          return (
            <button
              key={route.href}
              onClick={() => navigate(route.href)}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50',
                isActive && 'text-primary'
              )}
            >
              <route.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{route.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
} 