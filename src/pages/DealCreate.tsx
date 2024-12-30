import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MainHeader } from "@/components/MainHeader";
import { BottomNav } from "@/components/BottomNav";

const DealCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Form submission logic
      // Add your form submission logic here

      toast({
        title: "Success",
        description: "Deal created successfully",
      });
      navigate("/deals");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create deal",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Create New Deal</h1>
          <p className="text-gray-600">Fill in the details below to create a new deal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 rounded-lg border p-6 bg-white shadow-sm">
            {/* Deal Type */}
            <div className="space-y-2">
              <label htmlFor="dealType" className="block text-sm font-medium text-gray-700">
                Deal Type
              </label>
              <select
                id="dealType"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary"
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>

            {/* Commodity */}
            <div className="space-y-2">
              <label htmlFor="commodity" className="block text-sm font-medium text-gray-700">
                Commodity
              </label>
              <select
                id="commodity"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary"
              >
                <option value="copper">Copper</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary"
                placeholder="Enter quantity"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price per unit
              </label>
              <input
                type="number"
                id="price"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary"
                placeholder="Enter price per unit"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/deals")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-primary-light text-black hover:bg-primary-light/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Deal"}
            </Button>
          </div>
        </form>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default DealCreate;
