import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState([
    "Follow up with Buyer A regarding lithium carbonate deal",
    "Review copper wire pricing - market showing upward trend",
    "New opportunity: Rare earth processing plant seeking suppliers",
  ]);

  useEffect(() => {
    const negotiationContext = sessionStorage.getItem('negotiationContext');
    if (negotiationContext) {
      setSuggestions([
        "Request detailed specification documentation",
        "Discuss delivery timeline flexibility",
        "Explore bulk order discounts",
        "Propose milestone-based payment terms",
      ]);
    }
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-secondary" />
        <h2 className="text-lg font-semibold">AI Suggestions</h2>
      </div>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="p-4">
            <p className="text-sm">{suggestion}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};