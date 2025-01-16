interface DealDetailsProps {
  title: string;
  category: string;
  value: string;
  timeline: string;
}

export const DealDetails = ({ title, category, value, timeline }: DealDetailsProps) => {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h3 className="font-medium text-lg text-gray-900 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Value:</span>
          <span className="text-primary font-semibold">{value}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Timeline:</span>
          <span className="text-sm text-gray-700">{timeline}</span>
        </div>
      </div>
    </div>
  );
};