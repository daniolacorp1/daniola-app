import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Download,
  MessageCircle,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DealDetailView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const filterButtons = ["All", "Open", "Closed"];
  const [activeFilter, setActiveFilter] = useState("All");

  const handleDownload = () => {
    // Create a blob and trigger download
    const content = "Sample agreement content";
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Palm-Oil-Agreement.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your document is being downloaded",
    });
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center">
        <div className="flex gap-20 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/deals")}
            className="p-2"
          >
            <ArrowLeft className="w-8 h-8" />
          </Button>
          <h1 className="text-xl font-bold">Active Deals</h1>
          <Search className="w-6 h-6" />
        </div>
      </header>
      <div className="mt-4 flex gap-3 overflow-x-auto">
        {filterButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`
               rounded-xl gap-0 flex items-center justify-center h-8 flex-shrink-0 self-start border-none  px-5 py-1 mb-4 text-sm font-medium ${
                 button === activeFilter
                   ? "bg-primary text-white"
                   : "bg-[#F2E2E2]"
               }`}
            onClick={() => handleFilterChange(button)}
          >
            {button} <ChevronDown className="h-4 w-4" />
          </Button>
        ))}
      </div>
      {/* Deal Content */}
      <div className="mt-4 ">
        <div className="flex  justify-between items-center h-full rounded-xl p-4 shadow-md card-showod-deal-views">
          <div className="flex justify-between items-center  w-full h-full ">
            <div className=" h-full text-left flex justify-between gap-[16px]  flex-col">
              <div>
                <h2 className="text-[16px] leading-[20px] font-bold">
                  Palm Oil
                </h2>
                <span className="text-[#A14545] text-[14px] leading-[21px]">
                  Open
                </span>
              </div>

              <Button
                className=" text-black rounded-xl p-0 m-0 flex items-center justify-center h-8 flex-shrink-0  px-5
            bg-[#F2E2E2] hover:bg-[#F5E5E5]  "
                onClick={() => navigate(`/deals/${id}/details`)}
              >
                View Deal
              </Button>
            </div>
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6962245ea9-5d23bb22911b6d19d39d.png"
              alt="Palm Oil"
              className="w-[119px] h-[93px] rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-[20px] mb-[16px]">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-[16px] leading-[24px]">Progress</span>
            <span>20%</span>
          </div>
          <Progress value={20} className="h-2" />
        </div>

        {/* Terms Section */}
        <div className="pt-[20px] pb-[24px] "> 
          <h3 className="text-[22px] leading-[28px] text-left font-bold mb-6">Terms</h3>
          <div className=" w-full flex text-left gap-2">
            <div className="w-1/4 border-t pt-4">
              <p className="text-[#A14545] text-sm">Commodity</p>
              <p className="font-medium text-sm">Palm Oil</p>
            </div>
            <div className="w-3/4 border-t pt-4">
              <p className="text-[#A14545] text-sm">Payment</p>
              <p className="font-medium text-sm">5M</p>
            </div>
          </div>
        </div>

        {/* Attached Documents */}
        <div className="mt-6">
          <h3 className="text-[22px] text-left font-bold mb-4">
            Attached Documents
          </h3>
          <div
            className="flex justify-between items-center"
            onClick={handleDownload}
          >
            <div className="flex gap-3 items-center">
              <div className="bg-[#F2E2E2] rounded-md p-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-full h-full"
                  height={"1.5rem"}
                  width={"1.5rem"}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <span className="font-medium ">Palm Oil Agreement</span>
            </div>
            <Download className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="mt-auto py-4">
        <Button
          className="w-full rounded-xl bg-primary hover:bg-secondary text-white flex items-center justify-center gap-2"
          onClick={() => navigate("/commodities-chat")}
        >
          <MessageCircle className="w-5 h-5" />
          Chat
        </Button>
      </div>
    </div>
  );
};

export default DealDetailView;
