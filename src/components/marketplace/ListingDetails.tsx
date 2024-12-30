import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Commodity } from "@/types/marketplace";
import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ListingDetailsProps {
  listing: Commodity | null;
  onClose: () => void;
  onSave: (id: number) => void;
  onCreateDeal: (id: number) => void;
  onContactSupplier: (supplier: { name: string; company: string }) => void;
}

export const ListingDetails = ({
  listing,
  onClose,
  onSave,
  onCreateDeal,
  onContactSupplier,
}: ListingDetailsProps) => {
  if (!listing) return null;
  console.log(listing);

  return (
    <Dialog open={!!listing} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-full overflow-y-auto p-0 bg-white">
        <div className="px-4 pt-3">
          <div className="flex justify-between">
            <button onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-[18px] leading-[23px] font-bold mr-6">{listing.name}</h1>
            <span></span>
          </div>
        </div>
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-[320px] object-cover"
          />
        </div>
        <div className="px-4">
          <h2 className="text-[22px] leading-[28px] font-bold">{listing.name}</h2>
        </div>

        <div className="px-4 grid grid-cols-2 gap-4 ">
          <div className="p-5 rounded-lg border border-[#EBCCCC]">
            <div className="flex flex-col gap-2">
              <span className="text-[16px] leading-[24px] text-gray-500">{listing.price}</span>
              <span className="text-[24px] leading-[30px] font-bold">${listing.price}</span>
              <span className="text-[16px] leading-[24px] text-green-600">
                +{listing.priceChange}%
              </span>
            </div>
          </div>
          <div className="p-5 rounded-lg border border-[#EBCCCC]">
            <div className="flex flex-col gap-2">
              <span className="text-[16px] leading-[24px] text-gray-500">{listing.quantity}</span>
              <span className="text-[24px] leading-[30px] font-bold">
                {listing.quantityChange}
              </span>
              <span className="text-[16px] leading-[24px] text-green-600">
                +{listing.quantityChange}%
              </span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="p-5 space-y-1 mx-4 rounded-xl  border border-[#EBCCCC]">
          <p className="text-[16px] leading-[24px] text-gray-500">{listing.location}</p>
          <p className="text-[24px] leading-[30px] font-semibold">{listing.location}</p>
          <p className="text-[16px] leading-[24px] text-[#A14545] font-semibold">0</p>
        </div>

        {/* Accordion and Content */}
        <div className="px-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="commodity-details">
              <AccordionTrigger className="py-3 text-base hover:no-underline">
                Commodity Details
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#A14545] pb-3">
                Copper Cathodes is a chemical element with the symbol Cu. It is
                a ductile metal with very high thermal and electrical
                conductivity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certifications">
              <AccordionTrigger className="py-3 text-base hover:no-underline">
                Certifications
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#A14545] pb-3">
                {listing.certification}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-terms">
              <AccordionTrigger className="py-3 text-base hover:no-underline">
                Payment Terms
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#A14545] pb-3">
                Standard payment terms apply
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping-terms">
              <AccordionTrigger className="py-3 text-base hover:no-underline">
                Shipping Terms
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#A14545] pb-3">
                Standard shipping terms apply
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Supplier Section */}
          <div className="py-4">
            <div className="flex flex-col gap-2">
              <img
                src={listing.supplier.avatar}
                alt={listing.supplier.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-xl">James Lee</p>
                <p className="text-sm text-[#A14545]">JL Trading Group</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pb-4">
            <Button
              className="w-full rounded-xl bg-[#FF4042] text-white h-10"
              onClick={() => onContactSupplier(listing.supplier)}
            >
              Contact Supplier
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 rounded-xl h-10 bg-[#F5E5E5] font-bold border-none"
                onClick={() => onSave(listing.id)}
              >
                Save
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-xl h-10 bg-[#6166B6] text-white font-bold"
                onClick={() => onCreateDeal(listing.id)}
              >
                Request More Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetails;
