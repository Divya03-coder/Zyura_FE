import { Check } from "lucide-react";

const PricingCard = ({
  title,
  price,
  period,
  description,
  features = [],
  buttonText = "Upgrade Your plan",
  onUpgrade,
  disabled = false,
}: {
  title?: string;
  price?: string;
  period?: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  onUpgrade?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 rounded-2xl shadow-sm bg-white p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex flex-col justify-between">
        <div>
          <div>
            <h3 className="text-gray-600 font-semibold text-lg mb-1">
              {title}
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {price}
              <span className="text-base font-normal text-gray-500 ml-1">
                {period}
              </span>
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-2 h-14">{description}</p>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-black font-medium"
            >
              <Check className="w-6 h-6 text-green-600 mt-[2px]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <button
        onClick={onUpgrade}
        disabled={disabled}
        className={`mt-6 py-2.5 rounded-md font-medium transition-all duration-200 cursor-pointer ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
