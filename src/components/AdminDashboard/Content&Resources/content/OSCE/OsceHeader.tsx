interface OsceHeaderProps {
  imgUrl: string;
  onClick: () => void;
  className?: string;
}

const OsceHeader: React.FC<OsceHeaderProps> = ({
  imgUrl,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer flex items-center justify-center rounded border border-transparent hover:bg-gray-100 transition ${className}`}
    >
      <img src={imgUrl} alt="icon" className="w-4 h-4" />
    </button>
  );
};

export default OsceHeader;
