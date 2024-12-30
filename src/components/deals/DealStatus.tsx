interface DealStatusProps {
  status: string;
}

export const DealStatus = ({ status }: DealStatusProps) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready for review':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'accepted':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(status)}`}>
      Status: {status}
    </span>
  );
};