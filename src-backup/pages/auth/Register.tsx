import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const Register = () => {
  const [userType, setUserType] = useState<'supplier' | 'buyer' | ''>('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img src="/logo/daniola.svg" alt="Daniola Logo" className="w-32 mb-8" />
      
      <Card className="w-full max-w-md p-6">
        <div className="flex space-x-2 mb-6">
          <Link 
            to="/login" 
            className="flex-1 py-2 text-center text-gray-500 hover:text-gray-700"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="flex-1 py-2 text-center border-b-2 border-primary text-primary font-medium"
          >
            Register
          </Link>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email" 
              placeholder="you@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <Input 
              type="password" 
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              type="text" 
              placeholder="John Doe"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">I am a</label>
            <Select onValueChange={(value) => setUserType(value as 'supplier' | 'buyer')}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Location</label>
            <Input 
              type="text" 
              placeholder="City, Country"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Commodities of Interest</label>
            <Input 
              type="text" 
              placeholder="e.g., Fresh produce, nuts, dairy"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea 
              placeholder="Tell us about yourself..."
              className="mt-1"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#FF4D4D] hover:bg-[#FF3333]"
            onClick={() => console.log(userType)}
          >
            Create Account
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register; 