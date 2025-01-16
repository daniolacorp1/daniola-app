import { FC } from "react";

interface DealsHeaderProps {
  title: string;
  description?: string;
}

export const DealsHeader: FC<DealsHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  );
};