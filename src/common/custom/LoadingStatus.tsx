import TableLoading from "./TableLoading";

type ListStatusProps = {
  isLoading: boolean;
  items?: any[];
  itemName?: string;
};

const LoadingStatus: React.FC<ListStatusProps> = ({
  isLoading,
  items = [],
  itemName = "items",
}) => {
  if (isLoading) return <>{<TableLoading />}</>;
  if (!items.length)
    return <div className="py-5 text-center">{`No ${itemName} found.`}</div>;
  return null;
};

export default LoadingStatus;
