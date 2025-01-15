import DefaultIcon from './DefaultIcon';
import { DealCard } from './DealCard';

export const DealsList = () => {
  const handleViewDeal = (id: number) => {
    console.log(`Viewing deal with id: ${id}`);
    // Your view deal logic
  };

  return (
    <div>
      <DealCard
        id={1}
        title="Example Deal"
        status="Active"
        description="Deal description"
        image="/path/to/image.jpg"
        icon={DefaultIcon}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        category="Technology"
        price={100}       // Now TypeScript knows about this prop
        discount={10}     // And this one
        gradientColors="bg-gradient-to-r from-blue-500 to-blue-700"
        onViewDeal={handleViewDeal}
      />
    </div>
  );
};