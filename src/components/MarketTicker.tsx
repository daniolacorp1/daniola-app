import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const updates = [
  { commodity: "Lithium", change: 2.3, up: true },
  { commodity: "Copper", change: -1.2, up: false },
  { commodity: "Nickel", change: 0.5, up: true },
  { commodity: "Gold", change: 1.2, up: true },
  { commodity: "Silver", change: -0.8, up: false },
  { commodity: "Platinum", change: 1.5, up: true },
  { commodity: "Palladium", change: -2.1, up: false },
  { commodity: "Zinc", change: 0.7, up: true },
  { commodity: "Iron Ore", change: -1.4, up: false },
  { commodity: "Aluminum", change: 1.1, up: true },
  { commodity: "Rare Earths", change: 3.2, up: true },
  { commodity: "Uranium", change: 2.8, up: true },
];

export const MarketTicker = () => {
  return (
    <div className="py-4 overflow-hidden">
      <div className="relative flex whitespace-nowrap">
        <motion.div
          className="flex gap-4 px-4"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...updates, ...updates].map((item, index) => (
            <div
              key={`${item.commodity}-${index}`}
              className="flex items-center gap-3 px-6 py-3"
            >
              <div>
                <span className="font-medium text-gray-900">{item.commodity}</span>
                <div className={`flex items-center gap-1 ${
                  item.up ? "text-emerald-500" : "text-red-500"
                }`}>
                  {item.up ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="font-medium text-sm">
                    {item.up ? "+" : ""}
                    {item.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};