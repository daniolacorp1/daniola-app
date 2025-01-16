// src/pages/DealDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Building, Package, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { AcceptDealDialog } from "@/components/deals/AcceptDealDialog";
import { useToast } from "@/components/ui/use-toast";
import { useDealStore } from '../stores/use-deals-store' 
import { supabase } from '@/lib/supabase';
import type * as types from '..//types';

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const { toast } = useToast();
  const dealStore = useDealStore();

  // Mock data typed as Deal
  const deal = {
    id: Number(id),
    title: "Copper Futures Contract",
    status: "Ready for Review",
    quantity: "5,000 lbs",
    price: "$25,000",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6962245ea9-5d23bb22911b6d19d39d.png",
    supplier: "Global Metals Corp",
    deliveryDate: "2024-04-15",
    description: "High-grade copper wire futures contract with delivery scheduled for Q2 2024. Price includes transportation and handling fees.",
    terms: "Net 30 payment terms, FOB shipping point",
    location: "Shanghai, China"
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready for review':
        return 'text-yellow-600 bg-yellow-50';
      case 'in progress':
        return 'text-blue-600 bg-blue-50';
      case 'accepted':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleNegotiate = () => {
    // Store deal info in sessionStorage for chat context
    sessionStorage.setItem('negotiationContext', JSON.stringify({
      dealId: id,
      title: deal.title,
      price: deal.price,
      supplier: deal.supplier,
      quantity: deal.quantity
    }));

    toast({
      title: "Starting Negotiation",
      description: "Opening chat with suggested negotiation points...",
    });

    navigate('/chat');
  };

  const handleAcceptDeal = async () => {
    try {
      const { error } = await supabase
        .from('deals')
        .update({ status: 'accepted' })
        .eq('id', id);

      if (error) throw error;

      // Decrement both counters after accepting
      decrementActiveDeals();
      decrementDealCount();
      
      toast({
        title: "Success",
        description: "Deal accepted successfully",
      });

      // Navigate back to deals page after short delay
      setTimeout(() => {
        navigate('/deals');
      }, 1500);
    } catch (error) {
      console.error('Error accepting deal:', error);
      toast({
        title: "Error",
        description: "Failed to accept deal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowAcceptDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-4 py-3 bg-white border-b flex items-center gap-3 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/deals')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Deal Details</h1>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Image and Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2"
          >
            <Card className="overflow-hidden">
              <div className="relative h-48 md:h-64">
                <img 
                  className="w-full h-full object-cover" 
                  src={deal.image} 
                  alt={deal.title} 
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deal.status)}`}>
                  {deal.status}
                </span>
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{deal.title}</h2>
                <p className="text-gray-600">{deal.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Key Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-[#FF4B4B]" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">{deal.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-[#FF4B4B]" />
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium">{deal.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#FF4B4B]" />
                    <div>
                      <p className="text-sm text-gray-500">Delivery Date</p>
                      <p className="font-medium">{deal.deliveryDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Supplier and Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Supplier Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-[#FF4B4B]" />
                    <div>
                      <p className="text-sm text-gray-500">Supplier</p>
                      <p className="font-medium">{deal.supplier}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#FF4B4B]" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{deal.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#FF4B4B]" />
                    <div>
                      <p className="text-sm text-gray-500">Terms</p>
                      <p className="font-medium">{deal.terms}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <div className="container mx-auto flex gap-3 max-w-lg">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={handleNegotiate}
            >
              Negotiate
            </Button>
            <Button 
              className="flex-1 bg-[#FF4B4B] hover:bg-[#FF3333] text-white"
              onClick={() => setShowAcceptDialog(true)}
            >
              Accept Deal
            </Button>
          </div>
        </div>

        <AcceptDealDialog
          open={showAcceptDialog}
          onClose={() => setShowAcceptDialog(false)}
          onConfirm={handleAcceptDeal}
          dealTitle={deal.title}
          dealAmount={parseFloat(deal.price.replace(/[^0-9.-]+/g,""))} onOpenChange={function (open: boolean): void {
            throw new Error("Function not implemented.");
          } }        />
      </main>
    </div>
  );
};

export default DealDetail;

function decrementActiveDeals() {
  throw new Error("Function not implemented.");
}


function decrementDealCount() {
  throw new Error("Function not implemented.");
}
