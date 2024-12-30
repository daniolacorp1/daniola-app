import { Bookmark, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CommodityImageCarousel } from "@/components/marketplace/CommodityImageCarousel";
import { CopperHeader } from "@/components/copper/CopperHeader";
import { CopperStats } from "@/components/copper/CopperStats";
import { CopperLocation } from "@/components/copper/CopperLocation";
import { CopperSupplier } from "@/components/copper/CopperSupplier";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CopperDetail = () => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Added to saved",
      description: isSaved ? "Item removed from your saved listings" : "Item added to your saved listings",
    });
  };

  // Pass undefined to show the placeholder
  const images = undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <CopperHeader isSaved={isSaved} onSave={handleSave} />

      <main className="pb-32">
        <CommodityImageCarousel images={images} />

        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Copper Cathodes</h2>

          <CopperStats />
          <CopperLocation />

          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="details" className="bg-white rounded-xl shadow-sm border-none">
              <AccordionTrigger className="px-4">
                <span className="font-semibold text-gray-900">Commodity Details</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2 text-gray-600">
                  <p>Grade: A</p>
                  <p>Purity: 99.99%</p>
                  <p>Form: Cathodes</p>
                  <p>Packaging: Standard export packaging</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certifications" className="bg-white rounded-xl shadow-sm border-none">
              <AccordionTrigger className="px-4">
                <span className="font-semibold text-gray-900">Certifications</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2 text-gray-600">
                  <p>ISO 9001:2015</p>
                  <p>LME Grade A Listed</p>
                  <p>Responsible Minerals Initiative (RMI)</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="bg-white rounded-xl shadow-sm border-none">
              <AccordionTrigger className="px-4">
                <span className="font-semibold text-gray-900">Payment Terms</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2 text-gray-600">
                  <p>Letter of Credit (L/C)</p>
                  <p>30% advance payment</p>
                  <p>70% against shipping documents</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="bg-white rounded-xl shadow-sm border-none">
              <AccordionTrigger className="px-4">
                <span className="font-semibold text-gray-900">Shipping Terms</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2 text-gray-600">
                  <p>FOB Los Angeles Port</p>
                  <p>Delivery Time: 15-20 days</p>
                  <p>Minimum Order: 20 MT</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <CopperSupplier />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleSave}
          >
            <Bookmark className="mr-2" />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={() => navigate('/chat')}
          >
            <MessageSquare className="mr-2" />
            Request Details
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CopperDetail;