interface CircularProgressProps {
  correctPercentage: number;
  incorrectPercentage: number;
  label?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  correctPercentage,
  incorrectPercentage,
  label,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mx-auto">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              #22c55e ${correctPercentage * 3.6}deg, 
              #ef4444 ${correctPercentage * 3.6}deg ${
              (correctPercentage + incorrectPercentage) * 3.6
            }deg, 
              #e5e7eb 0deg
            )`,
          }}
        ></div>
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-800">
              {Math.round(correctPercentage)}%
            </span>
            <p className="text-[10px] text-gray-500 font-medium">Correct</p>
          </div>
        </div>
      </div>
      {label && (
        <p className="mt-3 text-sm font-medium text-gray-600">{label}</p>
      )}
    </div>
  );
};

export default CircularProgress;
