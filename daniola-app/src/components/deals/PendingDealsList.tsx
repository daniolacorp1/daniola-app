import { Package, Briefcase, Shield, Warehouse, Building, Factory, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { DealCard } from "./DealCard";

export const PendingDealsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <>
      <DealCard
        icon={Package}
        iconBgColor="bg-yellow-50"
        iconColor="text-yellow-600"
        status="Pending Approval"
        title="New Equipment Order"
        category="Manufacturing Equipment"
        value="$65,000"
        timeline="Pending"
        onClick={() => {
          navigate("/deals/5");
          toast({
            title: "Opening Pending Deal",
            description: "Loading deal details...",
          });
<<<<<<< HEAD
        } } id={0} description={""} image={""} onViewDeal={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
=======
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
      <DealCard
        icon={Briefcase}
        iconBgColor="bg-orange-50"
        iconColor="text-orange-600"
        status="Pending Review"
        title="Consulting Contract"
        category="Professional Services"
        value="$35,000"
        timeline="Pending"
        onClick={() => {
          navigate("/deals/10");
          toast({
            title: "Opening Consulting Contract",
            description: "Loading contract details...",
          });
<<<<<<< HEAD
        } } id={0} description={""} image={""} onViewDeal={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
=======
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
      <DealCard
        icon={Shield}
        iconBgColor="bg-cyan-50"
        iconColor="text-cyan-600"
        status="Pending Verification"
        title="Security System"
        category="Safety Equipment"
        value="$42,000"
        timeline="Pending"
        onClick={() => {
          navigate("/deals/11");
          toast({
            title: "Opening Security System Deal",
            description: "Loading system details...",
          });
<<<<<<< HEAD
        } } id={0} description={""} image={""} onViewDeal={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
=======
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
      <DealCard
        icon={Warehouse}
        iconBgColor="bg-rose-50"
        iconColor="text-rose-600"
        status="Pending Inspection"
        title="Storage Facility"
        category="Infrastructure"
        value="$180,000"
        timeline="Pending"
        onClick={() => {
          navigate("/deals/12");
          toast({
            title: "Opening Storage Facility Deal",
            description: "Loading facility details...",
          });
<<<<<<< HEAD
        } } id={0} description={""} image={""} onViewDeal={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
=======
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
      <DealCard
        icon={Building}
        iconBgColor="bg-violet-50"
        iconColor="text-violet-600"
        status="Pending Approval"
        title="Distribution Center"
        category="Real Estate"
        value="$425,000"
        timeline="Pending"
        onClick={() => {
          navigate("/deals/19");
          toast({
            title: "Opening Distribution Center Deal",
            description: "Loading center details...",
          });
<<<<<<< HEAD
        } } id={0} description={""} image={""} onViewDeal={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
=======
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
      <DealCard
        icon={Factory}
        iconBgColor="bg-emerald-50"
        iconColor="text-emerald-600"
        status="Pending Review"
        title="Production Line Setup"
        category="Manufacturing"
        value="$280,000"
        timeline="Pending"
        onClick={() => {
          navigate("/deals/20");
          toast({
            title: "Opening Production Line Deal",
            description: "Loading setup details...",
          });
<<<<<<< HEAD
        } } id={0} description={""} image={""} onViewDeal={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
=======
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
      <DealCard
        icon={Wrench}
        iconBgColor="bg-indigo-50"
        iconColor="text-indigo-600"
        status="Pending Verification"
        title="Machinery Upgrade"
        category="Equipment"
        value="$156,000"
        timeline="Pending"
        onClick={() => {
          navigate("/deals/21");
          toast({
            title: "Opening Machinery Upgrade Deal",
            description: "Loading upgrade details...",
          });
<<<<<<< HEAD
        } } id={0} description={""} image={""} onViewDeal={function (id: number): void {
          throw new Error("Function not implemented.");
        } }      />
=======
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
    </>
  );
};
