import { useNavigate } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/use-auth-store';

export function MainHeader() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Button 
            variant="ghost" 
            className="font-bold"
            onClick={() => navigate('/')}
          >
            DANIOLA
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/profile')}
              >
                {user.full_name}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 