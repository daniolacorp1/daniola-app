import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

interface DemoAccessProps {
  onDemoLogin: (role: string) => void;
}

export const DemoAccess = ({ onDemoLogin }: DemoAccessProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">Quick Demo Access</Label>
      <div className="relative">
        <Select onValueChange={onDemoLogin}>
          <SelectTrigger className="w-full h-11 border-gray-200">
            <SelectValue placeholder="Select demo account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buyer">Demo Buyer</SelectItem>
            <SelectItem value="supplier">Demo Supplier</SelectItem>
          </SelectContent>
        </Select>
        <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};